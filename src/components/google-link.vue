<template>
  <a :href="href" target="_blank">
    <slot>google it</slot>
  </a>
</template>

<script>
export default {
  name: 'google-link',
  props: {
    toSearch: {
      type: String,
      required: true
    }
  },
  computed: {
    href () {
      return `https://www.google.com/search?q=${this.toSearch.replace(/\s+/g, '+')}`
    }
  }
}
</script>

<style scoped lang="scss">
a {
  text-overflow: ellipsis;
}
</style>
