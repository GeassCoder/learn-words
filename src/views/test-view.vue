<template>
  <div id="test-view">
    <language-selector class="language-selector" v-if="!isTesting">
    </language-selector>
    <word-test
      @test-started="isTesting = true"
      @test-ended="isTesting = false">
    </word-test>
  </div>
</template>

<script>
import LanguageSelector from '@/components/language-selector.vue'
import WordTest from '@/components/word-test/word-test-index.vue'

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
.language-selector {
  margin: 0 20px 30px;
}
</style>
