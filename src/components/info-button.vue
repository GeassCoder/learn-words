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
  // We have to set border to override the default looking including
  // the gradient background, setting 'background-color: white;' only
  // does not work.
  // https://css-tricks.com/overriding-default-button-styles/
  border: 1px solid $info-bg;
  background-color: $white;
  color: $info;
  height: 40px;

  &:hover, &.active {
    background-color: $info;
    color: $white;
  }

  &[disabled] {
    color: $disabled;
    background-color: $disabled-bg;
  }

  &.small {
    height: 36px;
    font-size: 16px;
  }

  &.large {
    height: 48px;
  }
}
</style>
