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
      _unwatch: null,
      searchedText: '',
      searchResults: [],
      searchError: false
    }
  },
  created () {
    this._unwatch = this.$store.watch(
      state => state.updatedWord,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          utility.replaceById(this.searchResults, newValue)
        }
      }
    )
  },
  beforeDestroy () {
    this._unwatch()
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
