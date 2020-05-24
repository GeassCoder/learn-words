<template>
<transition name="fade">
  <div id="toaster" v-if="message" :class="type">
    <button @click="close" title="close"> &#215; </button>
    <p>{{ message }}</p>
  </div>
</transition>
</template>

<script>
export default {
  name: 'toaster',
  computed: {
    message () {
      return this.$store.state.toaster.message
    },
    type () {
      return this.$store.state.toaster.type
    }
  },
  methods: {
    close () {
      this.$store.dispatch('updateToasterMessage', {
        message: ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
#toaster {
  position: fixed;
  width: 100%;
  z-index: 1;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  &.success {
    background-color: $success-bg;
    color: $success;
  }

  &.error {
    background-color: $error-bg;
  }

  &.warning {
    background-color: $warning-bg;
    color: $warning;
  }

  button {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 20px;
    font-size: 24px;
    color: $white;
    border: transparent;
    background-color: transparent;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
