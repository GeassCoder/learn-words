<template>
  <div class="word" :class="theme + '-theme'">
    <p class="title">
      <span class="word-text">{{ word.text }}</span>
      <info-button class="small toggle-details" @click="toggleDetails">
        {{ showDetails ? 'Hide' : 'Show' }} Details
      </info-button>
      <google-link :to-search="word.text">Google '{{word.text}}'</google-link>
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
    },
    theme: {
      type: String,
      default: 'success'
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
  &.success-theme {
    .title {
      background-color: $success-bg;
    }

    .word-details {
      border: 1px solid $success-bg;
    }
  }

  &.fail-theme {
    .title {
      background-color: $error-bg;
    }

    .word-details {
      border: 1px solid $error-bg;
    }
  }

  .title {
    padding: 5px 10px;
    margin-bottom: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .word-text {
      font-weight: bold;
      text-transform: capitalize;
    }

    button.toggle-details {
      margin: 0 15px;
    }
  }

  .word-details {
    padding: 20px;
    border-top: transparent;
  }
}
</style>
