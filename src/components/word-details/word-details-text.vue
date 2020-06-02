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
    <info-button class="small show-meta" v-if="!showMeta" @click="showMeta = true">
      Show Meta Data
    </info-button>
    <p v-if="showMeta">
      <strong>Meta: </strong>
      <ul>
        <li v-for="(value, key) in word.meta" :key="key">
          {{key}}: {{ format(key, value) }}
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'word-details-text',
  components: {
    InfoButton
  },
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
  },
  methods: {
    format (key, value) {
      return key.match(/time/i) ? (new Date(value)).toLocaleDateString() : value
    }
  }
}
</script>

<style scoped lang="scss">
button.show-meta {
  margin-bottom: 15px;
}

strong {
  font-family: arial;
}
</style>
