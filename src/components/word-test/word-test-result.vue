<template>
  <div class="word-test-result">
    <div v-if="!failedWords.length" class="none-failed card">
      Great! No test word failed.
    </div>
    <div v-else class="some-failed">
      <p class="title">Failed words: </p>
      <ul class="word-list">
        <li v-for="word in failedWords" :key="word.id">
          <word :word="word" theme="fail"></word>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import validateService from '@/services/validate-service.js'
import Word from '@/components/word.vue'

export default {
  name: 'word-test-result',
  components: {
    Word
  },
  props: {
    failedWords: {
      type: Array,
      required: true,
      validator (words) {
        return validateService.validateWords(words)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.none-failed {
  color: $success;
  font-weight: bold;
}

.some-failed {
  .title {
    font-weight: bold;
  }

  .word-list {
    li {
      margin-bottom: 20px;
    }
  }
}
</style>
