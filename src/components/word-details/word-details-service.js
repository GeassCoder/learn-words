import utility from '@/services/utility'

export default {
  createWordModel (wordInfo) {
    const result = utility.deepCopy(wordInfo)

    // set defaults
    if (!result.meaning) {
      result.meaning = ''
    }

    if (!utility.isNonEmptyArray(result.notes)) {
      result.notes = ['']
    }

    if (!utility.isNonEmptyArray(result.examples)) {
      result.examples = ['']
    }

    return result
  },

  cleanUp (data) {
    // get rid of empty entries in notes and examples array
    data.notes = data.notes.filter(note => note)
    data.examples = data.examples.filter(example => example)

    return data
  }
}
