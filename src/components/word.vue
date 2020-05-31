<template>
  <div class="word" :class="theme + '-theme'">
    <p class="title">
      <span class="word-text">{{ word.text }}</span>
      <info-button class="small toggle-details" @click="toggleDetails">
        {{ showDetails ? 'Hide' : 'Show' }} Details
      </info-button>
      <google-link class="google-link" :to-search="word.text">Google "{{word.text}}"</google-link>
    </p>
    <word-details class="word-details" v-show="showDetails" :word="word"></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details/word-details-index.vue'
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

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
    padding: 8px 5%;
    margin-bottom: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .word-text {
      font-weight: bold;
      text-transform: capitalize;
      margin-right: 6%;
    }

    .toggle-details {
      margin: 0 16px;
      margin-right: 4%;
      font-size: 16px;
    }

    .google-link {
      font-size: 18px;
    }
  }

  .word-details {
    padding: 20px;
    border-top: transparent;
  }
}
</style>
