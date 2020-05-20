<template>
  <div class="search-box">
    <input v-model.trim="searchText" @keyup.enter="search"
      placeholder="Search a word or phrase">
    <button class="clear" @click="searchText=''"> &#215; </button>
    <info-button @click="search">Search</info-button>
    <p v-if="searchError" class="error">Must type 3 chars at least!</p>
  </div>
</template>

<script>
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'search-box',
  components: {
    InfoButton
  },
  data () {
    return {
      searchText: '',
      searchError: false
    }
  },
  methods: {
    search () {
      // must type 3 chars at least
      this.searchError = this.searchText.length < 3

      this.$emit('search-updated', {
        searchedText: this.searchText,
        searchError: this.searchError
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
