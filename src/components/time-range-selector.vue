<template>
  <fieldset>
    <label>
      <span>from</span>
      <select :disabled="disabled" v-model="from" @change="onChange">
        <option value=""></option>
        <option v-for="option in fromOptions"
          :value="option"
          :disabled="fromOptionDisabled(option)"
          :key="option.text">
          {{option.text}}
        </option>
      </select>
    </label>
    <label>
      <span>to</span>
      <select :disabled="disabled" v-model="to" @change="onChange">
        <option value=""></option>
        <option v-for="option in toOptions"
          :value="option"
          :disabled="toOptionDisabled(option)"
          :key="option.text">
          {{option.text}}
        </option>
      </select>
    </label>
  </fieldset>
</template>

<script>
export default {
  name: 'time-range-selector',
  model: {
    event: 'time-range-updated'
  },
  props: {
    value: {
      type: Object,
      required: true
      // validator (value) {
      //   // TODO: consider using json schema for validation
      //   return value.from && value.to
      // }
    },
    disabled: Boolean,
    options: {
      type: Array,
      required: true
      // validator (value) {
      //   // TODO: consider using json schema for validation
      //   return value.length
      // }
    }
  },
  data () {
    return {
      from: this.value.from,
      to: this.value.to,
      fromOptions: this.options.slice(1),
      toOptions: this.options.slice(0, -1)
    }
  },
  methods: {
    onChange () {
      this.$emit('time-range-updated', {
        from: this.from,
        to: this.to,
        hasError: !this.from.text || !this.to.text
      })
    },
    fromOptionDisabled (option) {
      return Boolean(this.to && (option.index <= this.to.index))
    },
    toOptionDisabled (option) {
      return Boolean(this.from && (option.index >= this.from.index))
    }
  }
}
</script>

<style scoped lang="scss">
</style>
