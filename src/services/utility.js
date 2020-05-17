export default {
  sameArrayValues (arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  },
  deepCopy (obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  isNonEmptyArray (arr) {
    return Array.isArray(arr) && arr.length
  },
  deleteByIndex (arr, index) {
    arr.splice(index, 1)
  }
}
