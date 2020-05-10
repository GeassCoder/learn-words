<template>
<transition name="fade">
  <div id="toaster" v-if="message">
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
      return this.$store.state.toasterMessage
    }
  },
  methods: {
    close () {
      this.$store.dispatch('updateToasterMessage', '')
    }
  }
}
</script>

<style scoped lang="scss">
#toaster {
  position: absolute;
  width: 100%;
  z-index: 1;
  color: $error;
  background-color: $error-bg;
  text-align: center;
  font-weight: bold;
  padding: 10px;

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
