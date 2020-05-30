<template>
  <div class="word-test">
    <div v-if="state === STATES.notStarted" class="card">
      <info-button @click="startTest">Start Test</info-button>
    </div>
    <div v-if="state === STATES.noTest" class="no-test card">
      No need to test at this time!
    </div>
    <test-payload v-if="state === STATES.started"
      :now="now" :test-words="testWords" @test-ended="endTest">
    </test-payload>
    <test-result v-if="state === STATES.ended"
      :failed-words="result.failed">
    </test-result>
  </div>
</template>

<script>
import wordTestService from './word-test-service.js'
import InfoButton from '@/components/info-button.vue'
import TestPayload from './test-payload.vue'
import TestResult from './test-result.vue'

export default {
  name: 'word-test',
  components: {
    InfoButton,
    TestPayload,
    TestResult
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
      testWords: [],
      result: null,
      now: Date.now()
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
      if (!this.testWords.length) {
        this.state = this.STATES.noTest
        this.$emit('test-ended')
        return
      }

      // start
      this.state = this.STATES.started
      this.$emit('test-started')
    },
    endTest (result) {
      this.result = result
      this.state = this.STATES.ended
      this.$emit('test-ended')

      // TODO: make ajax calls to backend, and update global data store using result
    }
  }
}
</script>

<style scoped lang="scss">
.no-test {
  color: $info;
  font-weight: bold;
}
</style>
