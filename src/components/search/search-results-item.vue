<template>
  <div class="search-results-item">
    <p class="title">
      <span>{{ word.text }}</span>
      <button @click="toggleDetails">{{ detailsShown ? 'Hide' : 'Show' }} Details</button>
    </p>
    <word-details v-if="detailsShown" :word="word"></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details.vue'

export default {
  name: 'search-results-item',
  components: {
    WordDetails
  },
  data () {
    return {
      detailsShown: false
    }
  },
  props: {
    word: Object
  },
  computed: {
    resultsLength () {
      return this.results.length
    }
  },
  methods: {
    toggleDetails () {
      this.detailsShown = !this.detailsShown
    }
  }
}
</script>

<style scoped lang="scss">
.search-results-item {
  .title {
    // TODO
  }
}
</style>
