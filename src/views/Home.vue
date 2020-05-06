<template>
  <div class="home">
    <!-- TODO: figure out if a common component is used in different bundles, how code splitting works, i.e. will it be included in each bundle or pulled out to a shared-code bundle? -->
    <language-selector></language-selector>
    <!-- TODO?? -->
    <word-details></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details.vue'
import LanguageSelector from '@/components/language-selector.vue'

export default {
  name: 'home',
  components: {
    WordDetails,
    LanguageSelector
  }
}
</script>
