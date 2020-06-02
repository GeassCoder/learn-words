export default {
  validateSliderAttrs (attrs) {
    return attrs.value >= attrs.min && attrs.value <= attrs.max
  },

  validateTimeRangeModel (value) {
    return this.validateTimeOption(value.from) &&
      this.validateTimeOption(value.to)
  },

  validateTimeOptions (options) {
    return options.length && options.every(this.validateTimeOption)
  },

  validateTimeOption (option) {
    return option === '' || (
      typeof option.text === 'string' &&
      typeof option.index === 'number' &&
      typeof option.ms === 'number'
    )
  },

  validateFiltersModel (filters) {
    const {
      failedInLastTest,
      creationTime,
      lastShownTime,
      familiarity
    } = filters

    return (typeof failedInLastTest === 'boolean') &&
      this.validateTimeRangeModel(creationTime) &&
      this.validateTimeRangeModel(lastShownTime) &&
      (typeof familiarity === 'number')
  },

  validateSortModel (value) {
    return value === '' || (
      typeof value.text === 'string' &&
      typeof value.sortBy === 'string' &&
      typeof value.order === 'string'
    )
  },

  validateWord (word) {
    return typeof word.text === 'string' && word.text
  },

  validateWords (words) {
    return words.length && words.every(this.validateWord)
  }
}
