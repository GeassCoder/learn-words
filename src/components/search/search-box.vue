<template>
    <div class="search-box">
      <input type="text" v-model="searchText" @keyup.enter="search"
        placeholder="Search a word or phrase">
      <button class="clear" @click="searchText=''"> &#215; </button>
      <button class="search" @click="search">Search</button>
    </div>
</template>

<script>
import Fuse from 'fuse.js'

export default {
  name: 'search-box',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    search () {
      // bail out on blank search text
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

      this.$emit('search-results-updated', results.map(result => result.item))
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
</style>
