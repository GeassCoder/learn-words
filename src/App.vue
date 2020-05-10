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
import toaster from '@/components/toaster.vue'

export default {
  name: 'app',
  components: {
    toaster
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    // color: #2c3e50;
    font-weight: bold;
    color: $black;

    &.router-link-exact-active {
      color: $info;
    }
  }
}
</style>
