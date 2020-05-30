import familiarityService from '@/services/familiarity-service.js'
import utility from '@/services/utility.js'

export default {
  getTestWords (list, selectedLanguages, now) {
    return list.filter(word => {
      const meta = word.meta

      const isInSelectedLanguages = (
        selectedLanguages.includes('All') ||
        selectedLanguages.includes(meta.language)
      )

      const span = familiarityService.familiarityMap[meta.familiarity]
      const shouldTestNow = (
        meta.lastShownTime + span <= now
      )

      return isInSelectedLanguages && shouldTestNow
    }).slice(0, 50)
  },
  formatIndex (index, length) {
    return utility.clamp(index, 1, length)
  },
  getUpdatedWord (word, hasPassed, now) {
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
