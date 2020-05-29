import Vue from 'vue'
import Vuex from 'vuex'
import utility from '@/services/utility'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedLanguages: ['All'],
    toaster: {
      message: '',
      timeoutId: null,
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
          creationTime: 1234567890123,
          lastShownTime: 1234567890123, // inited as creation time, updated on each test
          lastTestResult: 'N/A', // 'pass'/'fail'/'N/A'
          familiarity: 0, // 0-9,
          language: 'English' // should be generated on backend? on updateWord and addWord
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
          creationTime: 1234567890123,
          lastShownTime: 1234567890123,
          lastTestResult: 'pass', // 'pass'/'fail'/'N/A'
          familiarity: 0, // 0-9
          language: 'English' // should be generated on backend? on updateWord and addWord
        }
      },
      {
        id: '12348',
        text: 'freaking',
        meaning: 'bla bla bla',
        notes: [
          'first note'
        ],
        examples: [],
        meta: {
          creationTime: 1234567890333,
          lastShownTime: 1234567890999, // inited as creation time, updated on each test
          lastTestResult: 'pass', // 'pass'/'fail'/'N/A'
          familiarity: 0, // 0-9,
          language: 'English' // should be generated on backend? on updateWord and addWord
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

      // clear previous timeout if any
      clearTimeout(state.toaster.timeoutId)

      // reset in 10s
      state.toaster.timeoutId = setTimeout(() => {
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
