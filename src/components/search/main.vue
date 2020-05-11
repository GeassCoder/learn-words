<template>
  <div class="search">
    <search-box @search-results-updated="updateSearchResults"></search-box>
    <template v-if="hasSearched">
      <search-results :results="searchResults" v-if="searchResults.length"></search-results>
      <no-search-results v-else></no-search-results>
    </template>
  </div>
</template>

<script>
import SearchBox from './search-box.vue'
import SearchResults from './search-results.vue'
import NoSearchResults from './no-search-results.vue'

export default {
  name: 'search',
  components: {
    SearchBox,
    SearchResults,
    NoSearchResults
  },
  data () {
    return {
      hasSearched: false,
      searchResults: []
    }
  },
  methods: {
    updateSearchResults (searchResults) {
      this.searchResults = searchResults
      this.hasSearched = true
    }
  }
}
</script>

<style scoped lang="scss">
// ???
</style>
