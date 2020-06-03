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
  clamp (value, min, max) {
    if (value < min) {
      return min
    }

    if (value > max) {
      return max
    }

    return value
  },
  // intentionally making these impure as we can take advantage of vue's array reactivity
  deleteByIndex (arr, index) {
    arr.splice(index, 1)
  },
  replaceByIndex (arr, index, item) {
    arr.splice(index, 1, item)
  },
  replaceById (arr, obj) {
    const index = arr.findIndex(item => item.id === obj.id)
    if (index > -1) {
      this.replaceByIndex(arr, index, obj)
    }
  },
  shuffle (array) {
    for (let i = array.length - 1; i > 0; --i) {
      // random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1))

      // swap elements array[i] and array[j]
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
}
