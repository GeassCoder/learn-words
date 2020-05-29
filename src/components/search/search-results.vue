<template>
  <div class="search-results">
    <google-link class="google-link" :to-search="searchedText">Google "{{searchedText}}"</google-link>
    <p class="results-stats">
      Found <span class="results-length"> {{ resultsLength }} </span>
      {{ resultsLength === 1 ? "result" : "results" }}
    </p>
    <ul class="search-results">
      <li v-for="word in results" :key="word.id">
        <word :word="word"></word>
      </li>
    </ul>
  </div>
</template>

<script>
import Word from '@/components/word.vue'
import GoogleLink from '@/components/google-link.vue'

export default {
  name: 'search-results',
  components: {
    Word,
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
.google-link {
  display: inline-block;
  margin-bottom: 10px;
}

.results-stats {
  color: $success;

  .results-length {
    font-weight: bold;
  }
}

.search-results {
  li {
    margin-bottom: 20px;
  }
}
</style>
