<template>
  <div class="word-test-card card">
    {{ word.text }}
  </div>
</template>

<script>
export default {
  name: 'word-test-card',
  props: {
    word: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.word-test-card {
  font-weight: bold;
  text-transform: capitalize;
  font-size: 40px;
  letter-spacing: 2px;
}
</style>
