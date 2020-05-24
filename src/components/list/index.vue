<template>
  <div class="list">
    <!-- TODO: figure out how shared components are bundled? -->
    <!-- TODO: make a tabs component -->
    <language-selector></language-selector>
    <list-filters @filters-updated="onFiltersUpdated">
    </list-filters>
    <list-sorter @sorter-updated="onSorterUpdated">
    </list-sorter>
    <!-- TODO: render the list using v-for -->
    {{list}}
  </div>
</template>

<script>
import listService from './list-service.js'
import LanguageSelector from '@/components/language-selector.vue'
import ListFilters from './list-filters.vue'
import ListSorter from './list-sorter.vue'

export default {
  name: 'list',
  components: {
    LanguageSelector,
    ListFilters,
    ListSorter
  },
  data () {
    return {
      filters: {
        failedInLastTest: false,
        familiarity: null,
        creationTime: null,
        lastShownTime: null
      },
      sort: ''
    }
  },
  computed: {
    // make 'filteredList' a computed prop to take advantage of caching
    // if only sort is changed we don't have to re-compute this.list from scratch
    _filteredList () {
      return listService.applyFilters(this.$store.state.words, this.filters)
    },
    list () {
      return listService.applySort(this._filteredList, this.sort)
    }
  },
  methods: {
    onFiltersUpdated (filters) {
      this.filters = filters
    },
    onSorterUpdated (sort) {
      this.sort = sort
    }
  }
}
</script>
