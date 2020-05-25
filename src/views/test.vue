<template>
  <div id="test-view">
    <!-- TODO: figure out how shared components are bundled? -->
    <language-selector></language-selector>

    <h1>This is the test page</h1>
  </div>
</template>

<script>
import LanguageSelector from '@/components/language-selector.vue'

export default {
  name: 'test-view',
  components: {
    LanguageSelector
  }
}
</script>

<style scoped lang="scss">

</style>
