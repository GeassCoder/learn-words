<template>
  <div class="word-test-payload">
    <p class="test-header">
      <span class="current-index">
        <span> {{ formattedCurrent }} </span> /
        <strong>{{ testWordsLength }}</strong>
      </span>
      <button @click="endTest" class="warning-theme">Quit</button>
    </p>
    <transition name="slide" mode="out-in"
      @after-enter="testButtonDisabled = false"
      @after-leave="checkIfEnded">
      <word-test-card v-if="currentWord" :word="currentWord"
        class="word-test-card" :key="currentWord.id">
      </word-test-card>
    </transition>
    <div class="test-buttons">
      <button @click="next(true)" class="success-theme">Familiar</button>
      <button @click="next(false)" class="fail-theme">Unfamiliar</button>
    </div>
  </div>
</template>

<script>
import validateService from '@/services/validate-service.js'
import wordTestService from './word-test-service.js'
import WordTestCard from './word-test-card.vue'

export default {
  name: 'word-test-payload',
  components: {
    WordTestCard
  },
  props: {
    testWords: {
      type: Array,
      required: true,
      validator (words) {
        return validateService.validateWords(words) && words.length
      }
    }
  },
  data () {
    return {
      testButtonDisabled: false,
      current: 0,
      failed: [],
      passed: []
    }
  },
  computed: {
    testWordsLength () {
      return this.testWords.length
    },
    currentWord () {
      return this.testWords[this.current]
    },
    formattedCurrent () {
      return wordTestService.formatIndex(this.current + 1, this.testWordsLength)
    }
  },
  methods: {
    next (isPassed) {
      // prevent thrashing
      if (this.testButtonDisabled) {
        return
      }

      this.testButtonDisabled = true

      // record result
      this[isPassed ? 'passed' : 'failed'].push(this.currentWord)

      // next
      ++this.current
    },
    endTest () {
      this.$emit('test-ended', {
        passed: this.passed,
        failed: this.failed
      })
    },
    checkIfEnded () {
      // if we have got to the end of the list
      if (this.current === this.testWordsLength) {
        this.endTest()
      }
    }
  }
}
</script>

<style scoped lang="scss">
$width: 80%;

.test-header {
  width: $width;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.word-test-card {
  margin-bottom: 20px;
}

.test-buttons {
  width: $width;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-around;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
}

.slide-enter {
  transform: translate(50%, 0);
}

.slide-leave-to {
  transform: translate(-50%, 0);
}
</style>
