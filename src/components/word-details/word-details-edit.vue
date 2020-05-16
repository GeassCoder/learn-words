<template>
<form class="word-details-edit">
  <label>
    <strong>Text: </strong>
    <input v-model="wordModel.text">
  </label>
  <label>
    <strong>Meaning: </strong>
    <input v-model="wordModel.meaning">
  </label>
  <label>
    <strong>Notes: </strong>
    <ul>
      <li v-for="(note, index) in wordModel.notes" :key="index">
        <!-- Note: can't use v-model directly as assigning to local variables won't update data models -->
        <!-- TODO: check if there is a better way to do this -->
        <input :value="note" @input="wordModel.notes[index] = $event.target.value">
      </li>
    </ul>
  </label>
  <label>
    <strong>Examples: </strong>
    <ul>
      <li v-for="(example, index) in wordModel.examples" :key="index">
        <input :value="example" @input="wordModel.examples[index] = $event.target.value">
      </li>
    </ul>
  </label>
  <button type="submit" @submit.prevent="onSave">Save</button>
  <button type="button" @click="onCancel">Cancel</button>
</form>
</template>

<script>
import utility from '@/services/utility'

export default {
  name: 'word-details-edit',
  data () {
    return {
      // separate copy of data model for editting
      wordModel: utility.deepCopy(this.wordInfo)
    }
  },
  props: {
    wordInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSave () {
      this.$emit('word-edit-saved', this.wordModel)
    },
    onCancel () {
      this.$emit('word-edit-canceled')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
