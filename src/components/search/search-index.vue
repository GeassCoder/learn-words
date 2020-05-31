<template>
  <div class="search">
    <search-box class="search-box" @search-updated="onSearchUpdate"></search-box>
    <template v-if="searchedText && !searchError">
      <search-results v-if="searchResults.length"
        :searched-text="searchedText"
        :results="searchResults">
      </search-results>
      <search-no-results v-else
        :searched-text="searchedText">
      </search-no-results>
    </template>
  </div>
</template>

<script>
import SearchBox from './search-box.vue'
import SearchResults from './search-results.vue'
import SearchNoResults from './search-no-results.vue'
import Fuse from 'fuse.js'
import utility from '@/services/utility'

export default {
  name: 'search',
  components: {
    SearchBox,
    SearchResults,
    SearchNoResults
  },
  data () {
    return {
      searchedText: '',
      searchResults: [],
      searchError: false
    }
  },
  // TODO: check if there is a better way to do this
  computed: {
    updatedWord () {
      return this.$store.state.updatedWord
    }
  },
  watch: {
    updatedWord (newValue, oldValue) {
      if (newValue !== oldValue) {
        utility.replaceById(this.searchResults, newValue)
      }
    }
  },
  methods: {
    onSearchUpdate ({ searchedText, searchError }) {
      this.searchedText = searchedText
      this.searchError = searchError

      if (!searchError) {
        const fuse = new Fuse(this.$store.state.words, {
          threshold: 0.4,
          distance: 30,
          keys: ['text']
        })

        this.searchResults = fuse.search(searchedText).map(
          result => result.item
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-box {
  margin-bottom: 10px;
}
</style>
