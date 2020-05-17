<template>
  <div class="no-search-results">
    <p class="results-stats">
      Can't find results... You can either <google-link :toSearch="searchedText"></google-link>
      or add it to the list.
    </p>
    <word-details-edit v-if="isEditing" :wordInfo="wordInfo"
      @word-edit-saved="addToListSaved"
      @word-edit-canceled="addToListCanceled">
    </word-details-edit>
    <button class="info-button" v-else @click="onAddToList">Add To List</button>
  </div>
</template>

<script>
import GoogleLink from '@/components/google-link.vue'
import WordDetailsEdit from '@/components/word-details/word-details-edit.vue'

export default {
  name: 'no-search-results',
  components: {
    GoogleLink,
    WordDetailsEdit
  },
  props: {
    searchedText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isEditing: false,
      wordInfo: {
        text: ''
      }
    }
  },
  watch: {
    searchedText (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.isEditing = false
      }
    }
  },
  methods: {
    onAddToList () {
      this.isEditing = true
      this.wordInfo.text = this.searchedText
    },
    addToListSaved (newWord) {
      // TODO: make ajax call
      // TODO: set toaster message?
      // this.$store.dispatch('updateToasterMessage', 'New word added successfully.')
      // this.$store.dispatch('updateToasterMessage', 'Error: new Word cannot be added.')
      this.isEditing = false
    },
    addToListCanceled () {
      this.isEditing = false
    }
  }
}
</script>

<style scoped lang="scss">
.no-search-results {
  .results-stats {
    color: $error;

    .search-text {
      color: $info;
      font-style: italic;
    }
  }
}
</style>
