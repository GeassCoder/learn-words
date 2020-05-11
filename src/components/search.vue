<template>
  <div class="search">
    <!-- TODO: create separate search-box component -->
    <div class="search-box">
      <input type="text" v-model="searchText" @keyup.enter="search"
        placeholder="Search a word or phrase">
      <button class="clear" @click="searchText=''"> &#215; </button>
      <button class="search" @click="search">Search</button>
    </div>
    <!-- TODO: create separate search-results component -->
    <div v-if="resultsLength" class="search-results">
      <p class="results-stats">
        Found <span class="results-length"> {{ resultsLength }} </span>
        {{ resultsLength === 1 ? "result" : "results" }}
      </p>
      <ul class="results-list">
        <li v-for="word in searchResults" :key="word.text">
          <word-details :word="word"></word-details>
        </li>
      </ul>
    </div>
    <div v-else-if="hasSearched" class="no-search-results">
      <p class="results-stats">Can't find results... Do you want to save it?</p>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details.vue'
import Fuse from 'fuse.js'

export default {
  name: 'home',
  components: {
    WordDetails
  },
  data () {
    return {
      searchText: '',
      hasSearched: false,
      searchResults: []
    }
  },
  computed: {
    resultsLength () {
      return this.searchResults.length
    }
  },
  methods: {
    search () {
      const searchText = this.searchText.trim()

      if (!searchText) {
        return
      }

      const fuse = new Fuse(this.$store.state.words, {
        threshold: 0.4,
        distance: 30,
        keys: ['text']
      })

      const results = fuse.search(searchText)

      this.searchResults = results.map(result => result.item)

      this.hasSearched = true
    },
    save () {
      // TODO:
    }
  }
}
</script>

<style scoped lang="scss">
.search-box {
  position: relative;

  input {
    width: 75%;
    padding: 7px 30px 7px 7px;
    font-size: 20px;
  }

  button.clear {
    position: relative;
    top: 3px;
    background-color: transparent;
    padding: 0;
    right: 30px;
    border: transparent;
    font-size: 30px;
  }

  button.search {
    height: 40px;
    background-color: transparent;
    color: $info;
    font-size: 20px;
    font-weight: bold;
  }
}

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

.no-search-results {
  .results-stats {
    color: $error;

    .search-text {
      color: $info;
      font-style: italic;
    }
  }

  button {
    color: $info;
    min-width: 100px;
    height: 30px;
    font-size: 20px;
    background-color: transparent;
  }
}
</style>
