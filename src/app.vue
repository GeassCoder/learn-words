<template>
  <div id="app">
    <toaster></toaster>
    <!-- TODO: create a nav component? How to style router-link? -->
    <nav id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/test">Test</router-link>
    </nav>
    <main id="main">
      <router-view/>
    </main>
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
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;

  ul {
    padding-left: 0;

    li {
      list-style: none;
    }
  }

  .info-button {
    height: 40px;
    background-color: transparent;
    color: $info;
    font-size: 20px;
    font-weight: bold;

    &[disabled] {
      color: $disabled;
      background-color: $disabled-bg;
    }
  }

  input {
    height: 40px;
  }
}

#nav {
  padding: 15px 30px 30px;
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

#main {
  margin: 0 auto;
  max-width: 960px;
}
</style>
