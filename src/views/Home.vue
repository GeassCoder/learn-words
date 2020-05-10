<template>
  <div class="home">
    <div class="search-box">
      <input type="search">
      <span @click="search">&#128269;</span>
    </div>
    <!-- TODO?? -->
    <word-details></word-details>
  </div>
</template>

<script>
import WordDetails from '@/components/word-details.vue'

export default {
  name: 'home',
  components: {
    WordDetails
  },
  methods: {
    search () {
      // TODO
    }
  }
}
</script>

<style scoped lang="scss">

</style>
