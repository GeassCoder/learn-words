<template>
  <div class="list-sorter">
    <label>
      <span class="label-text">Sort By:</span>
      <select v-model="value" @change="onChange">
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
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sortOtions: listService.getSortOptions()
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style scoped lang="scss">
.label-text {
  margin-right: 10px;
}
</style>
