<template>
  <div class="test">
    <!-- TODO: create a nav component? How to style router-link? -->
    <language-selector></language-selector>

    <h1>This is the test page</h1>
  </div>
</template>

<script>
import LanguageSelector from '@/components/language-selector.vue'

export default {
  name: 'test',
  components: {
    LanguageSelector
  }
}
</script>
