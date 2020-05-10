<template>
  <div id="app">
    <toaster></toaster>
    <language-selector></language-selector>
    <!-- TODO: create a nav component? How to style router-link? -->
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
import LanguageSelector from '@/components/language-selector.vue'

export default {
  name: 'app',
  components: {
    Toaster,
    LanguageSelector
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
