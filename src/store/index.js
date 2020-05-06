import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// TODO: refactor
function sameArrayValues (arr1, arr2) {
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())
}

export default new Vuex.Store({
  state: {
    selectedLanguages: [],
    toasterMessage: '',
    words: []
  },
  mutations: {
    updateSelectedLanguages (state, selectedLanguages) {
      state.selectedLanguages = selectedLanguages
    }
  },
  actions: {
    updateSelectedLanguages ({ commit, state }, selectedLanguages) {
      // normalize
      if (selectedLanguages.includes('All')) {
        selectedLanguages = ['All']
      }

      // if no change, bail out
      if (sameArrayValues(state.selectedLanguages, selectedLanguages)) {
        return
      }

      commit('updateSelectedLanguages', selectedLanguages)
    }
  },
  modules: {
  }
})
