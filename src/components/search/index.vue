<template>
  <div class="search">
    <search-box @search-updated="onSearchUpdate"></search-box>
    <template v-if="searchedText && !searchError">
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
      searchResults: [],
      searchError: false
    }
  },
  methods: {
    onSearchUpdate ({ searchedText, searchResults, searchError }) {
      this.searchError = searchError
      this.searchedText = searchedText
      this.searchResults = searchResults
    }
  }
}
</script>
