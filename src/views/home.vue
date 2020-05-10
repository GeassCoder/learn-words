<template>
  <div id="home-view">
    <div class="search-box">
      <input type="text" v-model="searchText" placeholder="Search a word or phrase">
      <button role="button" class="clear" @click="searchText=''"> &#215; </button>
      <button role="button" class="search" @click="search">search</button>
    </div>
    <div v-if="searchResult" class="search-results">
      <!-- TODO: fuzzy search -->
      <p>Do you mean ... ?</p>
      <word-details word=""></word-details>
    </div>
    <div v-else>
      {{ searchText }} can't find it
    </div>
    <!--  -->
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
      searchResult: null
    }
  },
  methods: {
    search () {
      // TODO: do fuzzy search

      const list = [
        {
          title: 'Old Man\'s War',
          author: {
            firstName: 'John',
            lastName: 'Scalzi'
          }
        },
        {
          title: 'The Lock Artist',
          author: {
            firstName: 'Steve',
            lastName: 'Hamilton'
          }
        }]

      const options = {
        // isCaseSensitive: false,
        includeScore: true,
        // shouldSort: true,
        includeMatches: true,
        findAllMatches: true,
        // minMatchCharLength: 1,
        // location: 0,
        threshold: 0.4,
        distance: 30,
        // useExtendedSearch: false,
        keys: [
          'title',
          'author.firstName'
        ]
      }

      const fuse = new Fuse(list, options)

      // Change the pattern
      const pattern = 'lock'

      console.log(1111, fuse.search(pattern))
      // return {
      //   text: 'composite'
      // }
    }
  }
}
</script>

<style scoped lang="scss">
#home-view {
  padding: 0 2% 2%;
}

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
