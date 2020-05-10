<template>
  <!-- TODO -->
  <!-- TODO: figure out if a common component is used in different bundles, how code splitting works, i.e. will it be included in each bundle or pulled out to a shared-code bundle? -->
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: 'word-details',
  props: {
    // ??
    msg: String
  }
}
</script>

<style scoped lang="scss">
// ??
</style>
