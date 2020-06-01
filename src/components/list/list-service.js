import familiarityService from '@/services/familiarity-service.js'

export default {
  getTimeOptions () {
    const arr = ['1 day ago', '7 days ago', '30 days ago', '90 days ago', '180 days ago']

    const result = [
      {
        text: 'now',
        ms: 0
      },
      ...arr.map(item => ({
        text: item,
        ms: Number(item.match(/\d+/)[0]) * 86400000 // 24 * 60 * 60 * 1000
      })),
      {
        text: '180+ days ago',
        ms: Infinity
      }
    ]

    result.forEach((item, index) => {
      item.index = index
    })

    return result
  },

  getEmptyTimeModel () {
    return {
      from: '',
      to: '',
      hasError: false
    }
  },

  getFiltersInit () {
    return {
      failedInLastTest: false,
      familiarity: familiarityService.familiarityMax,
      creationTime: this.getEmptyTimeModel(),
      lastShownTime: this.getEmptyTimeModel()
    }
  },

  isTimeRuleEmpty (data) {
    return !data.from || !data.to
  },

  isTimeRuleViolated (timeRule, wordTime, now) {
    if (this.isTimeRuleEmpty(timeRule)) {
      return false
    }

    const from = now - timeRule.from.ms
    const to = now - timeRule.to.ms
    return (wordTime < from || wordTime > to)
  },

  applyFilters (list, filters, now) {
    if (!filters) {
      return list
    }

    // save some typings
    const {
      failedInLastTest,
      familiarity,
      creationTime,
      lastShownTime
    } = filters

    return list.filter(word => {
      const meta = word.meta

      // failed in last test rule
      if (failedInLastTest && (meta.lastTestResult !== 'fail')) {
        // if want to show failed but current is not failed, then
        // don't include it
        return false
      }

      // familiarity rule
      if (meta.familiarity > familiarity) {
        // already familiar enough, then don't include it
        return false
      }

      // creation time rule
      const isCreationTimeRuleViolated = this.isTimeRuleViolated(
        creationTime, meta.creationTime, now
      )

      if (isCreationTimeRuleViolated) {
        return false
      }

      // last shown time rule
      const isLastShownTimeRuleViolated = this.isTimeRuleViolated(
        lastShownTime, meta.lastShownTime, now
      )

      if (isLastShownTimeRuleViolated) {
        return false
      }

      return true
    })
  },

  getSortOptions () {
    return [
      {
        text: 'creation time ascent',
        sortBy: 'creationTime',
        order: 'ascent'
      },
      {
        text: 'creation time descent',
        sortBy: 'creationTime',
        order: 'descent'
      },
      {
        text: 'last shown time ascent',
        sortBy: 'lastShownTime',
        order: 'ascent'
      },
      {
        text: 'last shown time descent',
        sortBy: 'lastShownTime',
        order: 'descent'
      },
      {
        text: 'familiarity ascent',
        sortBy: 'familiarity',
        order: 'ascent'
      },
      {
        text: 'familiarity descent',
        sortBy: 'familiarity',
        order: 'descent'
      }
    ]
  },

  applySort (list, sort) {
    if (!sort) {
      return list
    }

    return list.sort((w1, w2) => {
      // save some typing
      const sortBy = sort.sortBy

      if (sort.order === 'ascent') {
        return w1.meta[sortBy] > w2.meta[sortBy] ? 1 : -1
      } else {
        return w1.meta[sortBy] < w2.meta[sortBy] ? 1 : -1
      }
    })
  }
}
