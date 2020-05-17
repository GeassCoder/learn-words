<template>
  <div class="search-results-item">
    <p class="title">
      <span>{{ wordModel.text }}</span>
      <button class="info-button" @click="toggleDetails">
        {{ detailsShown ? 'Hide' : 'Show' }} Details
      </button>
      <google-link :toSearch="wordModel.text">google '{{wordModel.text}}'</google-link>
    </p>
    <word-details v-show="detailsShown" :word="wordModel"
      @word-details-updated="onWordDetailsUpdated">
    </word-details>
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
      detailsShown: false,
      // need a separate var from prop because word details can be updated
      // the search results array and this.word are created from fuse.search() and so
      // they are not automatically synced up with the global data store
      wordModel: this.word
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
    },
    onWordDetailsUpdated (updatedWord) {
      this.wordModel = updatedWord
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  button {
    height: 30px;
    margin: 0 15px;
  }
}
</style>
