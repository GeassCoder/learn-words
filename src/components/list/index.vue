<template>
  <div class="list">
    <!-- TODO: figure out how shared components are bundled? -->
    <language-selector></language-selector>
    <flyout>
      <template v-slot:controls>
        <info-button class="small toggle-filter" @click="onFiltersClick">
          Filters
        </info-button>
        <info-button class="small" @click="onSortByClick">
          Sort By
        </info-button>
      </template>
      <template v-slot:container>
        <list-filters v-if="showFilters" v-model="filters"
          @input="showFilters = false" key="list-filters">
        </list-filters>
        <list-sorter v-if="showSorter" v-model="sort"
          @input="showSorter = false" key="list-sorter">
        </list-sorter>
      </template>
    </flyout>
    <ul class="word-list">
      <li v-for="word in list" :key="word.id">
        <word :word="word"></word>
      </li>
    </ul>
  </div>
</template>

<script>
import listService from './list-service.js'
import InfoButton from '@/components/info-button.vue'
import LanguageSelector from '@/components/language-selector.vue'
import Flyout from '@/components/flyout.vue'
import ListFilters from './list-filters.vue'
import ListSorter from './list-sorter.vue'
import Word from '@/components/word.vue'

export default {
  name: 'list',
  components: {
    InfoButton,
    LanguageSelector,
    Flyout,
    ListFilters,
    ListSorter,
    Word
  },
  data () {
    return {
      filters: listService.getFiltersInit(),
      sort: '',
      showFilters: false,
      showSorter: false
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
    onFiltersClick () {
      this.showFilters = !this.showFilters
      this.showSorter = false
    },
    onSortByClick () {
      this.showSorter = !this.showSorter
      this.showFilters = false
    }
  }
}
</script>

<style scoped lang="scss">
.toggle-filter {
  margin-right: 20px;
}

.word-list {
  li {
    margin-bottom: 20px;
  }
}
</style>
