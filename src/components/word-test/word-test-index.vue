<template>
  <div class="word-test">
    <div v-if="state === STATES.notStarted" class="card">
      <info-button class="large" @click="startTest">Start Test</info-button>
    </div>
    <div v-if="state === STATES.noTest" class="no-test card">
      No need to test at this time!
    </div>
    <word-test-payload v-if="state === STATES.started"
      :test-words="testWords" @test-ended="endTest">
    </word-test-payload>
    <word-test-result v-if="state === STATES.ended"
      :failed-words="result.failed">
    </word-test-result>
  </div>
</template>

<script>
import wordTestService from './word-test-service.js'
import InfoButton from '@/components/info-button.vue'
import WordTestPayload from './word-test-payload.vue'
import WordTestResult from './word-test-result.vue'
import { mapState } from 'vuex'

export default {
  name: 'word-test',
  components: {
    InfoButton,
    WordTestPayload,
    WordTestResult
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
      result: null
    }
  },
  computed: mapState(['now']),
  created () {
    this.$store.dispatch('updateNow')
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
      this.result = wordTestService.getProcessedResult(result, this.now)
      this.state = this.STATES.ended
      this.$emit('test-ended')
      this.$store.dispatch('updateWords', result)
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
