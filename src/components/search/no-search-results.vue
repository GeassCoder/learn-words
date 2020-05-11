<template>
  <div class="no-search-results">
    <p class="results-stats">Can't find results... Do you want to save it?</p>
    <button @click="save">Save</button>
  </div>
</template>

<script>
export default {
  name: 'no-search-results',
  data () {
    return {
      // ??
    }
  },
  methods: {
    save () {
      // ??
    }
  }
}
</script>

<style scoped lang="scss">
.no-search-results {
  .results-stats {
    color: $error;

    .search-text {
      color: $info;
      font-style: italic;
    }
  }

  button {
    color: $info;
    min-width: 100px;
    height: 30px;
    font-size: 20px;
    background-color: transparent;
  }
}
</style>
