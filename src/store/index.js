import Vue from 'vue'
import Vuex from 'vuex'
import utility from '@/services/utility'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedLanguages: [],
    toaster: {
      message: '',
      type: 'error'
    },
    // have to have this as custom events from a component cannot propagate to the grand parent.
    updatedWord: null,
    words: [
      // TODO: remove later
      {
        id: '12345',
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
          lastSearchTime: 'N/A',
          lastTestTime: 'N/A',
          lastTestResult: 'N/A' // 'pass'/'fail'/'N/A'
        }
      },
      {
        id: '12346',
        text: 'artistic',
        meaning: 'bla bla bla',
        notes: [],
        examples: [
          'first example'
        ],
        meta: {
          creationTime: 'mm/dd/yyyy',
          lastSearchTime: 'N/A',
          lastTestTime: 'N/A',
          lastTestResult: 'N/A' // 'pass'/'fail'/'N/A'
        }
      }
    ]
  },
  mutations: {
    updateSelectedLanguages (state, selectedLanguages) {
      state.selectedLanguages = selectedLanguages
    },

    updateToasterMessage (state, toasterInfo) {
      Object.assign(state.toaster, toasterInfo)

      if (!['success', 'error', 'warning'].includes(toasterInfo.type)) {
        state.toaster.type = 'error'
      }
    },

    updateWord (state, updatedWord) {
      utility.replaceById(state.words, updatedWord)

      state.updatedWord = updatedWord
    },

    addWord (state, newWord) {
      state.words.push(newWord)
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

    updateToasterMessage ({ commit, state }, toasterInfo) {
      commit('updateToasterMessage', toasterInfo)

      // reset in 10s
      setTimeout(() => {
        if (state.toaster.message) {
          commit('updateToasterMessage', {
            message: ''
          })
        }
      }, 10000)
    },

    updateWord ({ commit }, updatedWord) {
      // TODO: figure out the shortcut
      commit('updateWord', updatedWord)
    },

    addWord ({ commit }, newWord) {
      // TODO: figure out the shortcut
      commit('addWord', newWord)
    }
  },
  // ??
  modules: {
  }
})
