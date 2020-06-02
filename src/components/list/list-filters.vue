<template>
  <section class="list-filters">
    <p class="title">Filters:</p>
    <!-- failed in last test -->
    <section class="section">
      <label>
        <span>Failed in last test</span>
        <input type="checkbox" v-model="failedInLastTest">
      </label>
    </section>
    <!-- creation time range -->
    <section class="section">
      <p>Creation time</p>
      <p class="error" v-if="creationTime.hasError">
        Select a valid creation time range!
      </p>
      <time-range-selector :options="creationTimeOptions" v-model="creationTime">
      </time-range-selector>
    </section>
    <!-- last shown time range -->
    <section class="section">
      <p>Last shown time</p>
      <p class="error" v-if="lastShownTime.hasError">
        Select a valid last shown time range!
      </p>
      <time-range-selector :options="lastShownTimeOptions" v-model="lastShownTime">
      </time-range-selector>
    </section>
    <!-- familiarity range -->
    <section class="section">
      <p>Familiarity: {{ formattedFamiliarity }}</p>
      <slider :min="familiarityMin" :max="familiarityMax" v-model="familiarity">
      </slider>
    </section>
    <!-- controls -->
    <info-button :disabled="hasError" @click="onSave">Save</info-button>
  </section>
</template>

<script>
import listService from './list-service.js'
import validateService from '@/services/validate-service.js'
import familiarityService from '@/services/familiarity-service.js'
import TimeRangeSelector from '@/components/time-range-selector.vue'
import Slider from '@/components/slider.vue'
import InfoButton from '@/components/info-button.vue'

export default {
  name: 'list-filters',
  components: {
    TimeRangeSelector,
    Slider,
    InfoButton
  },
  props: {
    value: {
      required: true,
      validator (value) {
        return validateService.validateFiltersModel(value)
      }
    }
  },
  data () {
    return {
      creationTimeOptions: listService.getTimeOptions(),
      lastShownTimeOptions: listService.getTimeOptions(),
      familiarityMin: familiarityService.familiarityMin,
      familiarityMax: familiarityService.familiarityMax,
      ...this.value
    }
  },
  computed: {
    hasError () {
      return this.creationTime.hasError || this.lastShownTime.hasError
    },
    formattedFamiliarity () {
      if (this.familiarity === this.familiarityMax) {
        return 'All Included'
      }

      if (this.familiarity === this.familiarityMin) {
        return 0
      }

      return '≤ ' + this.familiarity
    }
  },
  methods: {
    onSave () {
      this.$emit('input', {
        failedInLastTest: this.failedInLastTest,
        familiarity: this.familiarity,
        creationTime: this.creationTime,
        lastShownTime: this.lastShownTime
      })
    }
  }
}
</script>

<style scoped lang="scss">
p {
  margin: 0;
}

.title {
  margin-bottom: 20px;
  font-weight: bold;
  font-family: arial;
}

.section {
  margin-bottom: 10px;

  input[type="checkbox"] {
    font-size: 20px;
    margin-left: 15px;
  }
}
</style>
