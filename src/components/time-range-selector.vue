<template>
  <fieldset class="time-range-selector">
    <label class="date-selector">
      <span class="label-text">from</span>
      <select v-model="from" @change="onChange">
        <option value=""></option>
        <option v-for="option in fromOptions"
          :value="option"
          :disabled="fromOptionDisabled(option)"
          :key="option.text">
          {{option.text}}
        </option>
      </select>
    </label>
    <label class="date-selector">
      <span class="label-text">to</span>
      <select v-model="to" @change="onChange">
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
      this.$emit('input', {
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
.time-range-selector {
  border: none;

  .date-selector {
    margin-right: 20px;

    .label-text {
      margin-right: 5px;
    }
  }
}
</style>
