import Vue from 'vue'
import Vuex from 'vuex'
import utility from '@/services/utility'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedLanguages: [],
    toasterMessage: '',
    words: [
      // TODO: remove later
      {
        text: 'composite',
        meaning: 'bla bla bla',
        notes: [
          'first note bla bla',
          'second note bla bla'
        ],
        examples: [
          'first example',
          'second example'
        ],
        meta: {
          creationTime: 'mm/dd/yyyy',
          lastSearchTime: null,
          lastTestTime: null,
          lastTestResult: null // 'pass'/'fail'/null
        }
      },
      {
        text: 'artistic',
        meaning: 'bla bla bla',
        notes: [],
        examples: [
          'first example'
        ],
        meta: {
          creationTime: 'mm/dd/yyyy',
          lastSearchTime: null,
          lastTestTime: null,
          lastTestResult: null // 'pass'/'fail'/null
        }
      }
    ]
  },
  mutations: {
    updateSelectedLanguages (state, selectedLanguages) {
      state.selectedLanguages = selectedLanguages
    },

    updateToasterMessage (state, message) {
      state.toasterMessage = message
    }
  },
  actions: {
    updateSelectedLanguages ({ commit, state }, selectedLanguages) {
      // if no change, bail out
      if (utility.sameArrayValues(state.selectedLanguages, selectedLanguages)) {
        return
      }

      commit('updateSelectedLanguages', selectedLanguages)
    },

    updateToasterMessage ({ commit, state }, message) {
      commit('updateToasterMessage', message)

      // reset in 10s
      setTimeout(() => {
        if (state.toasterMessage) {
          commit('updateToasterMessage', '')
        }
      }, 10000)
    }
  },
  // ??
  modules: {
  }
})
