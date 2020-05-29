<template>
  <div class="word-test">
    <div v-if="state === STATES.notStarted" class="card">
      <info-button @click="startTest">Start Test</info-button>
    </div>
    <div v-if="state === STATES.noTest" class="no-test card">
      No need to test at this time!
    </div>
    <div v-if="state === STATES.started">
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
        <test-card v-if="currentWord" :word="currentWord"
          class="test-card" :key="currentWord.id">
        </test-card>
      </transition>
      <div class="test-buttons">
        <button @click="pass" class="success-theme">Familiar</button>
        <button @click="fail" class="fail-theme">Unfamiliar</button>
      </div>
    </div>
    <div v-if="state === STATES.ended" class="done-test">
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
  </div>
</template>

<script>
import wordTestService from './word-test-service.js'
import familiarityService from '@/services/familiarity-service.js'
import InfoButton from '@/components/info-button.vue'
import TestCard from './test-card.vue'
import Word from '@/components/word.vue'

export default {
  name: 'word-test',
  components: {
    InfoButton,
    TestCard,
    Word
  },
  data () {
    const STATES = {
      notStarted: Symbol('notStarted'),
      noTest: Symbol('noTest'),
      started: Symbol('started'),
      ended: Symbol('ended')
    }

    return {
      STATES,
      state: STATES.notStarted,
      testButtonDisabled: false,
      current: 0,
      testWords: [],
      failedWords: [],
      now: Date.now()
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
    startTest () {
      // save some typings
      const $state = this.$store.state

      // get test words
      this.testWords = wordTestService.getTestWords(
        $state.words, $state.selectedLanguages, this.now
      )

      // if no test words, end directly
      if (!this.testWordsLength) {
        this.state = this.STATES.noTest
        this.$emit('test-ended')
        return
      }

      // start
      this.state = this.STATES.started
      this.$emit('test-started')
    },
    endTest () {
      this.state = this.STATES.ended
      this.$emit('test-ended')
    },
    pass () {
      // prevent thrashing
      if (this.testButtonDisabled) {
        return
      }

      this.testButtonDisabled = true
      this._updateMeta(this.currentWord.meta, true)
      ++this.current
    },
    fail () {
      // prevent thrashing
      if (this.testButtonDisabled) {
        return
      }

      this.testButtonDisabled = true
      this._updateMeta(this.currentWord.meta, false)
      this.failedWords.push(this.currentWord)
      ++this.current
    },
    _updateMeta (meta, hasPassed) {
      // save some typings
      const familiarity = meta.familiarity

      if (status) {
        meta.lastTestResult = 'pass'
        meta.familiarity = familiarityService.incrementFamiliarity(familiarity)
      } else {
        meta.lastTestResult = 'fail'
        meta.familiarity = familiarityService.decrementFamiliarity(familiarity)
      }

      meta.lastShownTime = this.now
    },
    checkIfEnded () {
      // if we have got to the end of the list
      if (this.current === this.testWordsLength) {
        this.endTest()
        // TODO: make ajax calls to backend, and update global data store?
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$width: 80%;

.no-test {
  color: $info;
  font-weight: bold;
}

.test-header {
  width: $width;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.test-card {
  margin-bottom: 20px;
}

.test-buttons {
  width: $width;
  margin: 0 auto 20px;
  display: flex;
  justify-content: space-around;
}

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

button {
  &.warning-theme {
    background-color: $white;
    color: $warning;
    border: 1px solid $warning-bg;

    &:hover {
      background-color: $warning;
      color: $white;
    }
  }

  &.success-theme {
    background-color: $white;
    color: $success;
    border: 1px solid $success-bg;

    &:hover {
      background-color: $success;
      color: $white;
    }

    &:focus {
      outline-color: $success;
    }
  }

  &.fail-theme {
    background-color: $white;
    color: $error;
    border: 1px solid $error-bg;

    &:hover {
      background-color: $error;
      color: $white;
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
