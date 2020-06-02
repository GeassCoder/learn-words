<template>
  <div class="slider">
    <span>{{$attrs.min}}</span>
    <input type="range" v-bind="$attrs" @input="onInput">
    <span>{{$attrs.max}}</span>
  </div>
</template>

<script>
import validateService from '@/services/validate-service.js'

export default {
  name: 'slider',
  methods: {
    onInput (event) {
      this.$emit('input', Number(event.target.value))
    }
  },
  created () {
    const isValid = validateService.validateSliderAttrs(this.$attrs)

    if (!isValid) {
      console.error('Missing required attribute!', this.$attrs)
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

  span {
    font-size: 18px;
  }
}
</style>
