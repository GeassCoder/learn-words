import utility from '@/services/utility.js'

const MS_PER_DAY = 86400000 // 24 * 60 * 60 * 1000
const familiarityMap = [0, 0, 1, 2, 4, 7, 15, 30, 90, 180].map(
  days => days * MS_PER_DAY
)

export default {
  familiarityMap,
  familiarityMin: 0,
  familiarityMax: familiarityMap.length - 1,
  incrementFamiliarity (value) {
    return utility.clamp(
      value + 1, this.familiarityMin, this.familiarityMax
    )
  },
  decrementFamiliarity (value) {
    return utility.clamp(
      value - 1, this.familiarityMin, this.familiarityMax
    )
  }
}
