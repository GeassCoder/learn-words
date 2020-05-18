<template>
  <div class="search-results">
    <google-link :to-search="searchedText">google '{{searchedText}}'</google-link>
    <p class="results-stats">
      Found <span class="results-length"> {{ resultsLength }} </span>
      {{ resultsLength === 1 ? "result" : "results" }}
    </p>
    <ul class="results-list">
      <li v-for="word in results" :key="word.id">
        <search-results-item :word="word"></search-results-item>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchResultsItem from './search-results-item.vue'
import GoogleLink from '@/components/google-link.vue'

export default {
  name: 'search-results',
  components: {
    SearchResultsItem,
    GoogleLink
  },
  props: {
    searchedText: {
      type: String,
      required: true
    },
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    resultsLength () {
      return this.results.length
    }
  }
}
</script>

<style scoped lang="scss">
.results-stats {
  color: $success;

  .results-length {
    font-weight: bold;
  }
}
</style>
