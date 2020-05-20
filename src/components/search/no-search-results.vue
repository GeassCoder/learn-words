<template>
  <div class="no-search-results">
    <p class="results-stats">
      Can't find results... You can either <google-link :to-search="searchedText"></google-link>
      or add it to the list.
    </p>
    <word-details-edit v-if="isEditing" :word-info="wordInfo"
      @word-edit-saved="addToList"
      @word-edit-canceled="addToListCanceled">
    </word-details-edit>
    <info-button v-else @click="showEditForm">Add To List</info-button>
  </div>
</template>

<script>
import GoogleLink from '@/components/google-link.vue'
import WordDetailsEdit from '@/components/word-details/word-details-edit.vue'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'no-search-results',
  components: {
    GoogleLink,
    WordDetailsEdit,
    InfoButton
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
    showEditForm () {
      this.isEditing = true
      this.wordInfo.text = this.searchedText
    },
    addToList (newWord) {
      // TODO: make ajax call
      // TODO: show error toaster message on error
      // this.$store.dispatch('updateToasterMessage', {
      //   message: 'Error: new Word cannot be added.',
      //   type: 'error'
      // })

      // TODO:
      // Note: returnedNewWord must have a server-generated id
      // this.$store.dispatch('addWord', returnedNewWord)

      this.$store.dispatch('updateToasterMessage', {
        message: 'New word added successfully.',
        type: 'success'
      })

      this.isEditing = false
    },
    addToListCanceled () {
      this.isEditing = false
    }
  }
}
</script>

<style scoped lang="scss">
.results-stats {
  color: $error;

  .search-text {
    color: $info;
    font-style: italic;
  }
}
</style>
