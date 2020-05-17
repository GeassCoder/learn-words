<template>
  <div class="word-details-text">
    <p><strong>Meaning: </strong> {{ word.meaning }}</p>
    <p v-if="word.notes.length">
      <strong>Notes: </strong>
      <ul>
        <li v-for="note in word.notes" :key="note">{{ note }}</li>
      </ul>
    </p>
    <p v-if="word.examples.length">
      <strong>Examples: </strong>
      <ul>
        <li v-for="example in word.examples" :key="example">{{ example}}</li>
      </ul>
    </p>
    <button v-if="!showMeta" class="info-button" @click="showMeta = true">Show Meta Data</button>
    <p v-if="showMeta">
      <strong>Meta: </strong>
      <ul>
        <li v-for="(value, key) in word.meta" :key="key">{{key}}: {{value}}</li>
      </ul>
    </p>
  </div>
</template>

<script>
export default {
  name: 'word-details-text',
  data () {
    return {
      showMeta: false
    }
  },
  props: {
    word: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
button {
  height: 30px;
  margin-bottom: 15px;
}
</style>
