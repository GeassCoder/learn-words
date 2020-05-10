<template>
  <div id="language-selector">
    <p>Languages:</p>
    <label v-for="language in languages" :key="language">
      <input type="checkbox" :value="language" v-model="selected"
        @change="onChange">
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
  },
  methods: {
    onChange () {
      let normalized

      // normalize
      if (this.selected.includes('All')) {
        normalized = this.languages.filter(one => one !== 'All').sort()
      } else {
        normalized = this.selected.sort()
      }

      this.$store.dispatch('updateSelectedLanguages', normalized)
    }
  }
}
</script>

<style scoped lang="scss">
label {
  margin-right: 20px;
}
</style>
