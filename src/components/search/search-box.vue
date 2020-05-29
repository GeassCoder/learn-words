<template>
  <div class="search-box">
    <input v-model.trim="searchText" @keyup.enter="search"
      placeholder="Enter a word or phrase">
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
  padding: 7px 30px 7px 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-color: $disabled-bg;
}

.clear {
  position: relative;
  top: 3px;
  background-color: transparent;
  padding: 0;
  right: 30px;
  border: transparent;
  font-size: 30px;
  box-shadow: none;
  font-weight: normal;
}

p.error {
  margin-top: 10px;
}
</style>
