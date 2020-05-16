export default {
  sameArrayValues (arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  },
  deepCopy (obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}
