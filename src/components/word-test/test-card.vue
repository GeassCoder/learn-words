<template>
  <div class="test-card">
    {{ word.text }}
  </div>
</template>

<script>
export default {
  name: 'test-card',
  props: {
    word: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.test-card {
  display: inline-block;
}
</style>
