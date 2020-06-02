<template>
  <div class="list-sorter">
    <label>
      <span class="label-text">Sort By:</span>
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
  props: {
    // from v-model outside
    value: {
      required: true,
      // TODO: consider using json schema
      validator (value) {
        return value === '' || value instanceof Object
      }
    }
  },
  data () {
    return {
      // We have to create a separate variable 'sort' from prop 'value' because
      // if we do v-model="value" on <select>, vue will give warning about
      // mutating props directly.
      // We have to use v-model on <select> because we can't get its value from
      // event.target.value in onChange() method as it will be evaluated to
      // '[Object object]'
      sort: this.value,
      sortOtions: listService.getSortOptions()
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.sort)
    }
  }
}
</script>

<style scoped lang="scss">
.label-text {
  margin-right: 10px;
  font-weight: bold;
  font-family: arial;
}
</style>
