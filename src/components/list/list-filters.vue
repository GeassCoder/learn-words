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
      <slider min="0" max="9" v-model="familiarity">
      </slider>
    </section>
    <!-- controls -->
    <info-button :disabled="hasError" @click="onSave">Save</info-button>
  </section>
</template>

<script>
import listService from './list-service.js'
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
      validator (v) {
        return v === null || Object.is(v)
      }
    }
  },
  data () {
    const result = {
      creationTimeOptions: listService.getTimeOptions(),
      lastShownTimeOptions: listService.getTimeOptions()
    }

    if (this.value === null) {
      Object.assign(result, {
        failedInLastTest: false,
        familiarity: 9,
        creationTime: listService.getEmptyTimeModel(),
        lastShownTime: listService.getEmptyTimeModel()
      })
    } else {
      Object.assign(result, this.value)
    }

    return result
  },
  computed: {
    hasError () {
      return this.creationTime.hasError || this.lastShownTime.hasError
    },
    formattedFamiliarity () {
      if (this.familiarity === 9) {
        return 'All Included'
      }

      if (this.familiarity === 0) {
        return 0
      }

      return '<=' + this.familiarity
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
}

.section {
  margin-bottom: 10px;

  input[type="checkbox"] {
    font-size: 20px;
    margin-left: 15px;
  }
}
</style>
