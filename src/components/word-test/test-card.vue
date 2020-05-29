<template>
  <div class="test-card card">
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
  font-weight: bold;
  text-transform: capitalize;
  font-size: 30px;
  letter-spacing: 2px;
}
</style>
