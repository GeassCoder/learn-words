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

    updateToasterMessage (state, message) {
      state.toasterMessage = message
    },

    updateWord (state, updatedWord) {
      const index = state.words.findIndex(word => word.id === updatedWord.id)
      if (index === -1) {
        console.error("Updated word is not in the data store's word list, this should not happen")
        // TODO: consider update toaster message, how should we do it?
        return
      }

      // TODO: try the other syntax
      Vue.$set(state.words, index, updatedWord)
      // TODO: try the other syntax
      // state.words.splice(index, 1, updatedWord)
      // TODO: test if it's really necessary here,
      // state.words[index] = updatedWord
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
    },

    updateWord ({ commit }, updatedWord) {
      // TODO: figure out the shortcut
      commit('updateWord', updatedWord)
    }
  },
  // ??
  modules: {
  }
})
