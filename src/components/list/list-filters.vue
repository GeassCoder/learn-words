<template>
  <div id="list-filters">
    <p>Filters:</p>
    <!-- failed in last test -->
    <label>
      <input type="checkbox" v-model="failedInLastTest">
      <span>failed in last test</span>
    </label>
    <!-- creation time range -->
    <div>
      <label>
        <input type="checkbox" v-model="useCreationTime">
        <span>creation time</span>
      </label>
      <span class="error" v-if="creationTime.hasError">
        select a valid creation time range
      </span>
      <time-range-selector :disabled="!useCreationTime"
        :options="creationTimeOptions" v-model="creationTime">
      </time-range-selector>
    </div>
    <!-- last shown time range -->
    <div>
      <label>
        <input type="checkbox" v-model="useLastShownTime">
        <span>last shown time</span>
      </label>
      <span class="error" v-if="lastShownTime.hasError">
        select a valid last shown time range
      </span>
      <time-range-selector :disabled="!useLastShownTime"
        :options="lastShownTimeOptions" v-model="lastShownTime">
      </time-range-selector>
    </div>
    <!-- familiarity range -->
    <label>
      <input type="checkbox" v-model="useFamiliarity">
      <span>Familiarity</span>
      <input :disabled="!useFamiliarity" v-model="familiarity"
        type="range" min="0" max="9" value="0" >
    </label>
    <!-- controls -->
    <button @click="onSave">save</button>
    <button @click="onCancel">cancel</button>
  </div>
</template>

<script>
import listService from './list-service.js'
import TimeRangeSelector from '@/components/time-range-selector.vue'

export default {
  name: 'list-filters',
  components: {
    TimeRangeSelector
  },
  data () {
    return {
      useCreationTime: false,
      useLastShownTime: false,
      useFamiliarity: false,
      failedInLastTest: false,
      familiarity: null,
      creationTime: listService.getEmptyTimeModel(),
      lastShownTime: listService.getEmptyTimeModel(),
      creationTimeOptions: listService.getTimeOptions(),
      lastShownTimeOptions: listService.getTimeOptions()
    }
  },
  methods: {
    onSave () {
      this.$emit('filters-updated', {
        failedInLastTest: this.failedInLastTest,
        familiarity: this.useFamiliarity ? this.familiarity : null,
        creationTime: this.useCreationTime ? this.creationTime : null,
        lastShownTime: this.useLastShownTime ? this.lastShownTime : null
      })
    },

    onCancel () {
      this.$emit('filters-canceled')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
