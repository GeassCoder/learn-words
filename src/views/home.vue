<template>
  <div id="home-view">
    <div class="search-box">
      <input type="text" v-model="searchValue" placeholder="Search a word or phrase">
      <button role="button" class="clear" @click="clear"> &#215; </button>
      <button role="button" class="search" @click="search">search</button>
      <!-- <span role="button" class="search-icon" @click="search"> &#128269; </span> -->
    </div>
    <!-- TODO?? -->
    <word-details></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details.vue'

export default {
  name: 'home',
  components: {
    WordDetails
  },
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    search () {
      // TODO
    },
    clear () {
      // TODO
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
