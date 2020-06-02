<template>
  <div class="search-no-results">
    <p class="results-stats">
      Can't find results... You can either
      <google-link :to-search="searchedText"></google-link>
      or add it to the list.
    </p>
    <word-details-edit v-if="isEditing" :word-info="wordInfo"
      @word-edit-saved="addToList"
      @word-edit-canceled="isEditing = false">
    </word-details-edit>
    <info-button v-else @click="isEditing = true">Add To List</info-button>
  </div>
</template>

<script>
import GoogleLink from '@/components/google-link.vue'
import WordDetailsEdit from '@/components/word-details/word-details-edit.vue'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'search-no-results',
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
      isEditing: false
    }
  },
  computed: {
    wordInfo () {
      return {
        text: this.searchedText
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
    addToList (newWord) {
      this.isEditing = false
      this.$store.dispatch('addWord', newWord)
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
