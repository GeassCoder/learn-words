<template>
  <div id="test-view">
    <!-- TODO: figure out how shared components are bundled? -->
    <language-selector></language-selector>
    <word-test></word-test>
  </div>
</template>

<script>
import LanguageSelector from '@/components/language-selector.vue'
import WordTest from '@/components/word-test/index.vue'

export default {
  name: 'test-view',
  components: {
    LanguageSelector,
    WordTest
  }
}
</script>

<style scoped lang="scss">

</style>
