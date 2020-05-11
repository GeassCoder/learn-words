<template>
  <!-- TODO -->
  <div>
    <p>{{ word.text }}</p>
    <p>{{ word.meaning }}</p>
    <ul>
      <li v-for="note in word.notes" :key="note">{{ note }}</li>
    </ul>
    <ul>
      <li v-for="example in word.examples" :key="example">{{ example}}</li>
    </ul>
    <!-- can we use v-for to display meta data? -->
  </div>
</template>

<script>
export default {
  name: 'word-details',
  props: {
    word: Object
  }
}
</script>

<style scoped lang="scss">
// ??
</style>
