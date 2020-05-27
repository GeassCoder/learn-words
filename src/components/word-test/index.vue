<template>
  <div class="word-test">
    <!-- transition -->
    <!-- <test-card :word="word"></test-card> -->
  </div>
</template>

<script>
import wordTestService from './word-test-service.js'

export default {
  name: 'word-test',
  components: {
    // TODO:
  },
  data () {
    // save some typings
    const state = this.$store.state

    const testWords = wordTestService.getTestWords(
      state.words, state.selectedLanguages
    )

    return {
      testWords,
      currentWord: testWords[0],
      testResult: [] // TODO: really need?
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
