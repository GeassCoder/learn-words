<template>
  <div class="word-test">
    <div v-if="state === STATES.notStarted" class="start-test">
      <info-button @click="startTest">Start Test</info-button>
    </div>
    <div v-if="state === STATES.noTest" class="no-test">
      No need to test at this time!
    </div>
    <div v-if="state === STATES.started" class="in-test">
      <p class="test-header">
        <span class="current-index">
          {{formattedCurrent}} / {{testWordsLength}}
        </span>
        <button @click="endTest">Quit</button>
      </p>
      <transition name="fade" mode="out-in"
        @after-enter="testButtonDisabled = false"
        @after-leave="checkIfEnded">
        <test-card v-if="currentWord" :word="currentWord" :key="currentWord.id"></test-card>
      </transition>
      <!-- TODO: remove -->
      <br>
      <!-- green -->
      <button @click="pass" class="success-theme">Familiar</button>
      <!-- red -->
      <button @click="fail" class="fail-theme">Unfamiliar</button>
    </div>
    <div v-if="state === STATES.ended" class="done-test">
      <!-- Green -->
      <div v-if="!failedWords.length" class="all-pass">
        Great! No test word failed.
      </div>
      <!-- red -->
      <div v-else class="some-failed">
        <p>Failed: </p>
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
      return wordTestService.formatIndex(this.current, this.testWordsLength)
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
.fade-enter-active, .fade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
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
