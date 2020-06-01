<template>
<transition name="fade">
  <div id="toaster" v-if="message" :class="type">
    <button @click="updateToasterMessage({message: ''})" title="close">
      &#215;
    </button>
    <p>{{ message }}</p>
  </div>
</transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'toaster',
  computed: mapState({
    message: state => state.toaster.message,
    type: state => state.toaster.type
  }),
  methods: mapActions(['updateToasterMessage'])
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
    box-shadow: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
