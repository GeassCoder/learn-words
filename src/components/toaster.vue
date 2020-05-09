<template>
<div class="toaster-container">
  <button :click="close">x</button>
  <p>{{ $store.state.toasterMessage }}</p>
</div>
</template>

<script>
export default {
  name: 'toaster',
  methods: {
    close () {
      $store.dispatch('updateToasterMessage', '')
    }
  }
}
</script>

<style scoped lang="scss">
.toaster {
  background-color: 
}
</style>
