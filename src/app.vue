<template>
  <div id="app">
    <toaster></toaster>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/test">Test</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Toaster from '@/components/toaster.vue'

export default {
  name: 'app',
  components: {
    Toaster
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: $black;
    margin-right: 20px;

    &.router-link-exact-active {
      color: $info;
    }
  }
}
</style>
