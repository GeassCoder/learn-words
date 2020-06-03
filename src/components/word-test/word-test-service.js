import familiarityService from '@/services/familiarity-service.js'
import utility from '@/services/utility.js'

export default {
  getTestWords (list, selectedLanguages, now) {
    // get filtered word list
    let result = list.filter(word => {
      const meta = word.meta

      const isInSelectedLanguages = (
        selectedLanguages.includes('All') ||
        selectedLanguages.includes(meta.language)
      )

      const span = familiarityService.familiarityMap[meta.familiarity]
      const isTestDue = (
        meta.lastShownTime + span <= now
      )

      return isInSelectedLanguages && isTestDue
    })

    // at most 50 words in 1 batch
    result = result.slice(0, 50)

    // shuffle it to randomize the order
    utility.shuffle(result)

    return result
  },

  formatIndex (index, length) {
    return utility.clamp(index, 1, length)
  },

  getProcessedResult (result, now) {
    return {
      passed: result.passed.map(
        passedWord => this._getUpdatedWord(passedWord, true, now)
      ),
      failed: result.failed.map(
        failedWord => this._getUpdatedWord(failedWord, false, now)
      )
    }
  },

  _getUpdatedWord (word, hasPassed, now) {
    const wordCopy = utility.deepCopy(word)

    // save some typings
    const meta = wordCopy.meta
    const familiarity = meta.familiarity

    meta.lastShownTime = now

    if (hasPassed) {
      meta.lastTestResult = 'pass'
      meta.familiarity = familiarityService.incrementFamiliarity(familiarity)
    } else {
      meta.lastTestResult = 'fail'
      meta.familiarity = familiarityService.decrementFamiliarity(familiarity)
    }

    return wordCopy
  }
}
