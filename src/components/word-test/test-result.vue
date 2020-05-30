<template>
  <div class="test-result">
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
import Word from '@/components/word.vue'

export default {
  name: 'test-result',
  components: {
    Word
  },
  props: {
    failedWords: {
      type: Array,
      required: true
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
