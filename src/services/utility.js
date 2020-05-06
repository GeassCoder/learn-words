export default {
  sameArrayValues (arr1, arr2) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
  }
}
