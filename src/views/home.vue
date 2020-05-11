<template>
  <div id="home-view">
    <search></search>
  </div>
</template>

<script>
import Search from '@/components/search/main.vue'

export default {
  name: 'home',
  components: {
    Search
  }
}
</script>

<style scoped lang="scss">
#home-view {
  padding: 0 2% 2%;
}
</style>
