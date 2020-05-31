<template>
  <div class="word-test-payload">
    <p class="test-header">
      <span class="current-index">
        <span> {{ formattedCurrent }} </span> /
        <strong>{{ testWordsLength }}</strong>
      </span>
      <button @click="endTest" class="warning-theme">Quit</button>
    </p>
    <transition name="fade" mode="out-in"
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
import wordTestService from './word-test-service.js'
import WordTestCard from './word-test-card.vue'

export default {
  name: 'word-test-payload',
  components: {
    WordTestCard
  },
  props: {
    now: {
      type: Number,
      default: Date.now()
    },
    testWords: {
      type: Array,
      required: true
      // TODO: validator?
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
      this[isPassed ? 'passed' : 'failed'].push(
        wordTestService.getUpdatedWord(this.currentWord, isPassed, this.now)
      )

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

button {
  &.warning-theme {
    color: $warning;
    background-color: $white;
    border: 1px solid $warning-bg;

    &:hover {
      color: $white;
      background-color: $warning;
    }
  }

  &.success-theme {
    color: $success;
    background-color: $white;
    border: 1px solid $success-bg;

    &:hover {
      color: $white;
      background-color: $success;
    }

    &:focus {
      outline-color: $success;
    }
  }

  &.fail-theme {
    color: $error;
    background-color: $white;
    border: 1px solid $error-bg;

    &:hover {
      color: $white;
      background-color: $error;
    }

    &:focus {
      outline-color: $error;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: transform 0.3s, opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translate(50%, 0);
}

.fade-leave-to {
  transform: translate(-50%, 0);
}
</style>
