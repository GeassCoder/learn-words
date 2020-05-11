<template>
  <div class="search-results">
    <p class="results-stats">
      Found <span class="results-length"> {{ resultsLength }} </span>
      {{ resultsLength === 1 ? "result" : "results" }}
    </p>
    <ul class="results-list">
      <li v-for="word in results" :key="word.text">
        <search-results-item :word="word"></search-results-item>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchResultsItem from './search-results-item.vue'

export default {
  name: 'search-results',
  components: {
    SearchResultsItem
  },
  props: {
    results: Array
  },
  computed: {
    resultsLength () {
      return this.results.length
    }
  }
}
</script>

<style scoped lang="scss">
.search-results {
  .results-stats {
    color: $success;

    .results-length {
      font-weight: bold;
    }
  }

  .results-list {
    li {
      list-style: none;
    }
  }
}
</style>
