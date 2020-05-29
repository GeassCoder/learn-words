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
  }
}
