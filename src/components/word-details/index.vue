<template>
  <div class="word-details">
    <!-- editing mode -->
    <template v-if="isEditing">
      <word-details-edit :wordInfo="word"
        @word-edit-saved="onEditSaved"
        @word-edit-canceled="onEditCanceled">
      </word-details-edit>
    </template>
    <!-- text mode -->
    <template v-else>
      <word-details-text :word="word"></word-details-text>
      <button class="info-button" @click="onEdit">Edit</button>
    </template>
  </div>
</template>

<script>
import WordDetailsText from './word-details-text.vue'
import WordDetailsEdit from './word-details-edit.vue'

export default {
  name: 'word-details',
  components: {
    WordDetailsText,
    WordDetailsEdit
  },
  data () {
    return {
      isEditing: false
    }
  },
  props: {
    word: {
      type: Object,
      required: true
    }
  },
  methods: {
    onEdit () {
      this.isEditing = true
    },
    onEditCanceled () {
      this.isEditing = false
    },
    onEditSaved (updatedWord) {
      // TODO: make ajax call
      // TODO: show error toaster message on error
      // this.$store.dispatch('updateToasterMessage', {
      //   message: 'Error: new Word cannot be added.',
      //   type: 'error'
      // })

      // TODO: update global data store
      this.$store.dispatch('updateWord', updatedWord)

      this.$store.dispatch('updateToasterMessage', {
        message: 'Word updated successfully.',
        type: 'success'
      })

      this.isEditing = false
    }
  }
}
</script>

<style scoped lang="scss">
button {
  height: 30px;
}
</style>
