<template>
  <form class="word-details-edit" @submit.prevent="onSave">
    <!-- text -->
    <label :class="{error: showError}">
      <strong>Text: *</strong>
      <span v-if="showError"> this field is required!</span>
      <input ref="textField" v-model.trim="wordModel.text" @blur="onBlur">
    </label>
    <!-- meaning -->
    <label>
      <strong>Meaning: </strong>
      <input v-model.trim="wordModel.meaning">
    </label>
    <!-- notes -->
    <fieldset>
      <legend><strong> Notes: </strong></legend>
      <ul>
        <li v-for="(note, index) in wordModel.notes" :key="index">
          <!-- Note: can't use v-model directly as assigning to local variables won't update data models -->
          <input :value="note" 
            @input="wordModel.notes[index] = $event.target.value.trim()">
          <info-button @click="deleteNote(index)">Delete</info-button>
        </li>
      </ul>
      <info-button class="small" @click="addNote">Add</info-button>
    </fieldset>
    <!-- examples -->
    <fieldset>
      <legend><strong>Examples: </strong></legend>
      <ul>
        <li v-for="(example, index) in wordModel.examples" :key="index">
          <input :value="example"
            @input="wordModel.examples[index] = $event.target.value.trim()">
          <info-button @click="deleteExample(index)">Delete</info-button>
        </li>
      </ul>
      <info-button class="small" @click="addExample">Add</info-button>
    </fieldset>
    <info-button type="submit" :disabled="showError">Save</info-button>
    <info-button @click="onCancel">Cancel</info-button>
  </form>
</template>

<script>
import utility from '@/services/utility'
import wordDetailsService from './word-details-service.js'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'word-details-edit',
  components: {
    InfoButton
  },
  data () {
    return {
      wordModel: wordDetailsService.createWordModel(this.wordInfo),
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
  mounted () {
    this.$nextTick(() => this.$refs.textField.focus())
  },
  methods: {
    onSave () {
      this.$emit('word-edit-saved', wordDetailsService.cleanUp(this.wordModel))
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
      utility.deleteByIndex(this.wordModel.notes, index)
    },
    deleteExample (index) {
      utility.deleteByIndex(this.wordModel.examples, index)
    },
    onBlur ($event) {
      this.showError = !$event.target.value
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
  width: 100%;
}

button[type="submit"] {
  margin-right: 20px;
}

.error {
  input {
    border: 1px solid $error;
  }
}
</style>
