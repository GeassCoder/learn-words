<template>
  <div id="language-selector">
    <span class="title">Languages:</span>
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
      selected: this.$store.state.selectedLanguages
    }
  },
  methods: {
    onChange () {
      // normalize local copy
      const normalized = this.selected.includes('All') ? ['All'] : this.selected.sort()

      // update global copy
      this.$store.dispatch('updateSelectedLanguages', normalized)
    }
  }
}
</script>

<style scoped lang="scss">
#language-selector {
  font-family: Roboto;
}

.title {
  display: block;
}

label {
  &:after {
    content: '';
    display: block;
  }
}

@include respond-to-tablet {
  .title {
    display: inline;
  }

  label {
    margin-left: 10px;

    &:after {
      display: none;
    }
  }
}
</style>
