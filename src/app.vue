<template>
  <div id="app">
    <toaster></toaster>
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

ul {
  padding-left: 0;

  li {
    list-style: none;
  }
}

p {
  margin: 0 0 20px 0;
}

input:not([type]) {
  height: 40px;
  font-size: 20px;
  padding-left: 10px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.1);

  &.small {
    height: 30px;
  }
}

input[type="checkbox"] {
  width: 15px;
  height: 15px;
  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.1);

  &:checked {
    background-color: $info;
  }
}

select {
  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.1);
  font-size: 15px;
  padding: 4px;
  border: 1px solid lightgrey;
  color: $info;
  font-weight: bold;
}

button {
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  font-size: 20px;
  font-weight: bold;
  height: 40px;
  cursor: pointer;
}

fieldset {
  border: 1px solid #888888;
  box-shadow: 2px 4px 4px 0 rgba(0,0,0,0.1);
}

.error {
  color: $error;
}

.card {
  margin: 0 auto;
  width: 80%;
  min-height: 400px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
}

#nav {
  padding: 15px 30px 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: $black;
    margin-right: 20px;
    text-decoration: none;

    &.router-link-exact-active, &:hover {
      color: $info;
      text-decoration: underline;
    }
  }
}

#main {
  margin: 0 auto;
  max-width: 960px;
}
</style>
