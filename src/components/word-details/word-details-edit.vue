<template>
<form class="word-details-edit" @submit.prevent="onSave">
  <label :class="{error: showError}">
    <strong>Text: *</strong>
    <span v-if="showError"> this field is required!</span>
    <input v-model="wordModel.text" @blur="onBlur">
  </label>
  <label>
    <strong>Meaning: </strong>
    <input v-model="wordModel.meaning">
  </label>

  <fieldset>
    <legend>
      <strong> Notes: </strong>
    </legend>
    <ul>
      <li v-for="(note, index) in wordModel.notes" :key="index">
        <!-- Note: can't use v-model directly as assigning to local variables won't update data models -->
        <!-- TODO: check if there is a better way to do this -->
        <input :value="note" @input="wordModel.notes[index] = $event.target.value">
        <button class="info-button" type="button" @click="deleteNote(index)">Delete</button>
      </li>
    </ul>
    <button class="info-button" type="button" @click="addNote">Add</button>
  </fieldset>
  <fieldset>
    <legend>
      <strong>Examples: </strong>
    </legend>
    <ul>
      <li v-for="(example, index) in wordModel.examples" :key="index">
        <input :value="example" @input="wordModel.examples[index] = $event.target.value">
        <button class="info-button" type="button" @click="deleteExample(index)">Delete</button>
      </li>
    </ul>
    <button class="info-button" type="button" @click="addExample">Add</button>
  </fieldset>
  <button class="info-button" type="submit" :disabled="showError">Save</button>
  <button class="info-button" type="button" @click="onCancel">Cancel</button>
</form>
</template>

<script>
import utility from '@/services/utility'

function createWordModel (wordInfo) {
  return {
    ...utility.deepCopy(wordInfo),
    meaning: wordInfo.meaning || '',
    notes: utility.isNonEmptyArray(wordInfo.notes) ? wordInfo.notes : [''],
    examples: utility.isNonEmptyArray(wordInfo.examples) ? wordInfo.examples : ['']
  }
}

function cleanUp (data) {
  // get rid of empty entries in notes and examples array
  data.notes = data.notes.filter(note => note)
  data.examples = data.examples.filter(example => example)

  return data
}

export default {
  name: 'word-details-edit',
  data () {
    return {
      wordModel: createWordModel(this.wordInfo),
      showError: false
    }
  },
  props: {
    wordInfo: {
      type: Object,
      required: true,
      validator (value) {
        // TODO: consider using json schema for validation
        return 'text' in value
      }
    }
  },
  methods: {
    onSave () {
      this.$emit('word-edit-saved', cleanUp(this.wordModel))
    },
    onCancel () {
      this.$emit('word-edit-canceled')
    },
    addNote () {
      this.wordModel.notes.push('')
    },
    addExample () {
      this.wordModel.examples.push('')
    },
    deleteNote (index) {
      this.wordModel.notes.splice(index, 1)
    },
    deleteExample (index) {
      this.wordModel.examples.splice(index, 1)
    },
    onBlur ($event) {
      this.showError = !$event.target.value.trim()
    }
  }
}
</script>

<style scoped lang="scss">
label {
  display: block;
  margin-bottom: 20px;
}

fieldset {
  margin-bottom: 20px;
  border: none;
  padding: 0;

  ul {
    margin: 0;

    li {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      input {
        margin-right: 10px;
      }
    }
  }
}

strong {
  display: inline-block;
  margin-bottom: 10px;
}

input {
  display: block;
  font-size: 20px;
  width: 100%;
}

button.info-button[type="submit"] {
  margin-right: 20px;
}

button {
  height: 30px;
}

.error {
  color: $error;

  input {
    border: 1px solid $error;
  }
}
</style>
