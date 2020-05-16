<template>
  <div class="search">
    <search-box @search-updated="onSearchUpdate"></search-box>
    <template v-if="searchedText">
      <search-results v-if="searchResults.length"
        :searchedText="searchedText"
        :results="searchResults">
      </search-results>
      <no-search-results v-else
        :searchedText="searchedText"
      ></no-search-results>
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
      searchedText: '',
      searchResults: []
    }
  },
  methods: {
    onSearchUpdate ({ searchedText, searchResults }) {
      this.searchedText = searchedText
      this.searchResults = searchResults
      this.hasSearched = true
    }
  }
}
</script>

<style scoped lang="scss">
// ???
</style>
