<template>
  <div class="word-details">
    <!-- editing mode -->
    <word-details-edit v-if="isEditing"
      :word-info="word"
      @word-edit-saved="onEditSaved"
      @word-edit-canceled="onEditCanceled">
    </word-details-edit>
    <!-- text mode -->
    <template v-else>
      <word-details-text :word="word"></word-details-text>
      <info-button class="small" @click="onEdit">Edit</info-button>
    </template>
  </div>
</template>

<script>
import WordDetailsText from './word-details-text.vue'
import WordDetailsEdit from './word-details-edit.vue'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'word-details',
  components: {
    WordDetailsText,
    WordDetailsEdit,
    InfoButton
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
