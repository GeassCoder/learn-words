<template>
  <div id="test-view">
    <!-- TODO: figure out how shared components are bundled? -->
    <language-selector v-if="!isTesting"></language-selector>
    <word-test
      @test-started="isTesting = true"
      @test-ended="isTesting = false">
    </word-test>
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
  },
  data () {
    return {
      isTesting: false
    }
  }
}
</script>

<style scoped lang="scss">

</style>
