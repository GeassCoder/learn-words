<template>
  <button class="info-button" v-bind="attrs" v-on="$listeners">
      <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'info-button',
  computed: {
    attrs () {
      // create a separate copy
      const result = {
        ...this.$attrs
      }

      // unless set to 'submit' explicitly, default to 'button'
      if (result.type !== 'submit') {
        result.type = 'button'
      }

      return result
    }
  },
  created () {
    if (!this.$slots.default) {
      console.error('Slot for info-button is required!')
    }
  }
}
</script>

<style scoped lang="scss">
.info-button {
  background-color: transparent;
  color: $info;
  font-size: 20px;
  font-weight: bold;
  height: 40px;

  &[disabled] {
    color: $disabled;
    background-color: $disabled-bg;
  }

  &.small {
    height: 30px;
  }
}
</style>
