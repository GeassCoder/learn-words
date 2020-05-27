export default {
  getTestWords (list, selectedLanguages) {
    const MS_PER_DAY = 86400000 // 24 * 60 * 60 * 1000
    const familiarityMap = [0, 0, 1, 2, 4, 7, 15, 30, 90, 180].map(
      days => days * MS_PER_DAY
    )
    const now = Date.now()

    return list.filter(word => {
      const meta = word.meta

      const isInSelectedLanguages = (
        selectedLanguages.includes('All') ||
        selectedLanguages.includes(meta.language)
      )

      const shouldTestNow = (
        meta.lastShownTime + familiarityMap[meta.familiarity] <= now
      )

      return isInSelectedLanguages && shouldTestNow
    }).slice(0, 50)
  }
}
