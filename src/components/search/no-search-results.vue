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
    <button v-else @click="onAddToList">Add To List</button>
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
      wordInfo: {}
    }
  },
  methods: {
    onAddToList () {
      this.isEditing = true
      this.wordInfo = {
        text: this.searchedText,
        meaning: '',
        notes: [],
        examples: []
      }
    },
    addToListSaved () {
      // TODO: make ajax call
      // TODO: set toaster message?
      this.isEditing = false
    },
    addToListCanceled () {
      // TODO
      // TODO: set toaster message?
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

  button {
    color: $info;
    min-width: 100px;
    height: 30px;
    font-size: 20px;
    background-color: transparent;
    margin-right: 50px;
  }
}
</style>
