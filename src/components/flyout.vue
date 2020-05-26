<template>
  <div class="flyout">
    <div class="flyout-controls">
      <slot name="controls"></slot>
    </div>
    <div class="flyout-container">
      <div class="flyout-inner-container">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flyout'
}
</script>

<style scoped lang="scss">
.flyout-container {
  position: relative;

  .flyout-inner-container {
    position: absolute;
    width: 100%;
    padding: 20px;
    background-color: $info-bg;
    border: 2px solid $info;
    min-height: 260px;

    &:empty {
      display: none;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
