<template>
  <div class="slider">
    <span>{{$attrs.min}}</span>
    <input type="range" v-bind="$attrs" @input="onInput">
    <span>{{$attrs.max}}</span>
  </div>
</template>

<script>
export default {
  name: 'slider',
  methods: {
    onInput (event) {
      this.$emit('input', Number(event.target.value))
    }
  },
  created () {
    // TODO: consider using json schema
    if (!('min' in this.$attrs) || !('max' in this.$attrs) || !('value' in this.$attrs)) {
      console.error('Missing required attribute!')
    }
  }
}
</script>

<style scoped lang="scss">
.slider {
  padding: 7px 15px;

  input {
    margin: 0 6px;
  }
}
</style>
