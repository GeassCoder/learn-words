<template>
  <div class="search-box">
    <input v-model.trim="searchText" @keyup.enter="search"
      placeholder="Search a word or phrase">
    <button class="clear" @click="searchText=''"> &#215; </button>
    <info-button @click="search">Search</info-button>
    <p v-if="showError" class="error">Must type 3 chars at least!</p>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'search-box',
  components: {
    InfoButton
  },
  data () {
    return {
      searchText: '',
      showError: false
    }
  },
  methods: {
    search () {
      // save some typings
      const searchText = this.searchText

      // must type 3 chars at least
      if (searchText.length < 3) {
        this.showError = true
        this.$emit('search-updated', {
          searchError: true
        })
        return
      }

      this.showError = false

      const fuse = new Fuse(this.$store.state.words, {
        threshold: 0.4,
        distance: 30,
        keys: ['text']
      })

      const results = fuse.search(searchText)

      this.$emit('search-updated', {
        searchedText: searchText,
        searchResults: results.map(result => result.item)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.search-box {
  position: relative;
}

input {
  width: 75%;
  padding: 7px 30px 7px 7px;
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

.error {
  color: $error;
}
</style>
