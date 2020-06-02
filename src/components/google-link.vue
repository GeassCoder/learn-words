<template>
  <a class="google-link" :href="href" target="_blank">
    <slot>
      <span class="default">google it</span>
    </slot>
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
.google-link {
  font-family: Roboto;
  text-transform: capitalize;

  .default {
    text-transform: none;
  }
}
</style>
