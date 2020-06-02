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
import validateService from '@/services/validate-service.js'
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
      required: true,
      validator (word) {
        return validateService.validateWord(word)
      }
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
      this.isEditing = false
      this.$store.dispatch('updateWord', updatedWord)
    }
  }
}
</script>
