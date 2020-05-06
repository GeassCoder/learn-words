<template>
  <div id="language-selector">
    <p>Select languages</p>
    <label v-for="language in languages" :key="language">
      <input type="checkbox" :value="language" v-model="selected"
        @change="$store.dispatch('updateSelectedLanguages', selected)">
      {{language}}
    </label>
  </div>
</template>

<script>
const LANGUAGES = ['All', 'English', 'Japanese']

export default {
  name: 'language-selector',
  data () {
    return {
      languages: LANGUAGES,
      selected: []
    }
  }
}
</script>

<style lang="scss">
label {
  margin-right: 20px;
}
</style>
