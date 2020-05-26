<template>
  <div class="word">
    <p class="title">
      <span>{{ word.text }}</span>
      <info-button class="small toggle-details" @click="toggleDetails">
        {{ showDetails ? 'Hide' : 'Show' }} Details
      </info-button>
      <google-link :to-search="word.text">google '{{word.text}}'</google-link>
    </p>
    <word-details class="word-details" v-show="showDetails" :word="word"></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details/index.vue'
import GoogleLink from '@/components/google-link.vue'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'word',
  components: {
    WordDetails,
    GoogleLink,
    InfoButton
  },
  data () {
    return {
      showDetails: false
    }
  },
  props: {
    word: {
      type: Object,
      required: true
    }
  },
  computed: {
    resultsLength () {
      return this.results.length
    }
  },
  methods: {
    toggleDetails () {
      this.showDetails = !this.showDetails
    }
  }
}
</script>

<style scoped lang="scss">
.word {
  .title {
    background-color: $success-bg;
    padding: 5px 10px;
    margin-bottom: 0;

    button.toggle-details {
      margin: 0 15px;
    }
  }

  .word-details {
    padding: 20px;
    border: 1px solid $success-bg;
    border-top: transparent;
  }
}
</style>
