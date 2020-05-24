<template>
  <div id="list-sorter">
    <label>
      <span>Sort By:</span>
      <select v-model="sort" @change="onChange">
        <option value=""></option>
        <option v-for="option in sortOtions" :value="option" :key="option.text">
          {{option.text}}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import listService from './list-service.js'

export default {
  name: 'list-sorter',
  data () {
    return {
      sort: '',
      sortOtions: listService.getSortOptions()
    }
  },
  methods: {
    onChange () {
      this.$emit('sorter-updated', this.sort)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
