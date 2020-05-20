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
  },
  replaceById (arr, obj, isDebug) {
    if (isDebug && !arr.find(item => item.id === obj.id)) {
      console.error("Can't find array item with matching id!")
      return
    }

    // TODO: try different algorithm
    return arr.map(item => item.id === obj.id ? obj : item)
  }
}
