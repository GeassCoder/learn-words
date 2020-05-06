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
  },
  // TODO: remove
  created: function () {
    this.$store.dispatch('updateToasterMessage', 'haaaaaaaaahaaaaaaa')
  }
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // TODO:
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
