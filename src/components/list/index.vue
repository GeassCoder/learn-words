<template>
  <div class="list">
    <!-- TODO: figure out how shared components are bundled? -->
    <!-- should only render on mobile -->
    <div class="for-mobile language-selector">
      <language-selector></language-selector>
    </div>
    <flyout>
      <template v-slot:controls>
        <div class="controls-container">
          <!-- should only render on tablet and above -->
          <div class="for-above-tablet language-selector">
            <language-selector></language-selector>
          </div>
          <div class="control-buttons">
            <info-button class="small" @click="onFiltersClick"
              :class="{active: showFilters}">
              Filters <span class="down-arrow">&#9660;</span>
            </info-button>
            <span class="divider">|</span>
            <info-button class="small" @click="onSortByClick"
              :class="{active: showSorter}">
              Sort By <span class="down-arrow">&#9660;</span>
            </info-button>
          </div>
        </div>
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
    // make computed props for _wordsInSelectedLanguages and 'filteredList' to
    // take advantage of caching if only sort is changed we don't have to
    // re-compute this.list from scratch
    _wordsInSelectedLanguages () {
      // save some typings
      const selectedLanguages = this.$store.state.selectedLanguages
      const allWords = this.$store.state.words

      if (selectedLanguages.includes('All')) {
        return allWords
      }

      return allWords.filter(word => {
        return selectedLanguages.includes(word.language)
      })
    },
    _filteredList () {
      return listService.applyFilters(this._wordsInSelectedLanguages, this.filters)
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
.language-selector {
  &.for-mobile {
    margin: 0 0 10px 10px;
  }

  &.for-above-tablet {
    display: none;
  }

  @include above-tablet {
    &.for-mobile {
      display: none;
    }

    &.for-above-tablet {
      display: block;
    }
  }
}

.controls-container {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}

.control-buttons {
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0 20px;

    .down-arrow {
      display: inline-block;
      font-size: 10px;
      transform: scale(1.5, 1) translateY(-2px)
    }
  }

  .divider {
    color: $disabled;
    font-size: 25px;
  }
}

.word-list {
  li {
    margin-bottom: 20px;
  }
}
</style>
