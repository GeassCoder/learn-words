<template>
  <div class="word-test-card card">
    {{ word.text }}
  </div>
</template>

<script>
import validateService from '@/services/validate-service.js'

export default {
  name: 'word-test-card',
  props: {
    word: {
      type: Object,
      required: true,
      validator (word) {
        return validateService.validateWord(word)
      }
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
