<template>
  <div class="search-results-item">
    <p class="title">
      <span>{{ word.text }}</span>
      <button @click="toggleDetails">{{ detailsShown ? 'Hide' : 'Show' }} Details</button>
      <google-link :toSearch="word.text">google '{{word.text}}'</google-link>
    </p>
    <word-details v-show="detailsShown" :word="word"></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details/index.vue'
import GoogleLink from '@/components/google-link.vue'

export default {
  name: 'search-results-item',
  components: {
    WordDetails,
    GoogleLink
  },
  data () {
    return {
      detailsShown: false
    }
  },
  props: {
    word: {
      type: Object,
      required: true
    }
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
