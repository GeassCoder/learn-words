import Vue from 'vue'
import Vuex from 'vuex'
import utility from '@/services/utility'
import apiService from '@/services/api-service.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    now: Date.now(),
    selectedLanguages: ['All'],
    toaster: {
      message: '',
      type: 'error',
      timeoutId: null
    },
    // have to have this as custom events from a component cannot propagate to the grand parent.
    updatedWord: null,
    words: [
      // TODO: mock data, remove later
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
          language: 'English' // TODO: should autodetect the language on updateWord and addWord?
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
          language: 'English' // TODO: should autodetect the language on updateWord and addWord?
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
          language: 'English' // TODO: should autodetect the language on updateWord and addWord?
        }
      }
    ]
  },
  mutations: {
    updateNow (state) {
      state.now = Date.now()
    },

    updateSelectedLanguages (state, selectedLanguages) {
      state.selectedLanguages = selectedLanguages
    },

    updateToasterMessage (state, toasterInfo) {
      Object.assign(state.toaster, toasterInfo)

      if (!['success', 'error', 'warning'].includes(toasterInfo.type)) {
        state.toaster.type = 'error'
      }
    },

    updateToasterTimeout (state, timeoutId) {
      state.toaster.timeoutId = timeoutId
    },

    updateWord (state, updatedWord) {
      utility.replaceById(state.words, updatedWord)

      state.updatedWord = updatedWord
    },

    updateWords (state, words) {
      words.forEach(word => {
        utility.replaceById(state.words, word)
      })
    },

    addWord (state, newWord) {
      state.words.push(newWord)
    }
  },
  actions: {
    updateNow () {
      this.commit('updateNow')
    },

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
      const timeoutId = setTimeout(() => {
        if (state.toaster.message) {
          commit('updateToasterMessage', {
            message: ''
          })
        }
      }, 10000)

      commit('updateToasterTimeout', timeoutId)
    },

    updateWord ({ commit, dispatch }, updatedWord) {
      // TODO: test after integrating with backend
      return apiService.updateWord(updatedWord).then(
        () => {
          // update global store
          commit('updateWord', updatedWord)

          // show toaster message
          dispatch('updateToasterMessage', {
            message: 'Word updated successfully.',
            type: 'success'
          })
        },
        error => {
          console.error(error)

          // TODO: keep it in local storage for later sync up?

          // show error in toaster
          dispatch('updateToasterMessage', {
            message: 'Error: cannot update word.',
            type: 'error'
          })
        }
      )
    },

    updateWords ({ commit, dispatch }, words) {
      // TODO: test after integrating with backend
      return apiService.updateWords(words).then(
        () => {
          // update global store
          commit('updateWords', words)

          // show toaster message
          dispatch('updateToasterMessage', {
            message: 'Test results synced up.',
            type: 'success'
          })
        },
        error => {
          console.error(error)

          // TODO: keep it in local storage for later sync up?

          // show error in toaster
          dispatch('updateToasterMessage', {
            message: 'Error: cannot sync up test result.',
            type: 'error'
          })
        }
      )
    },

    addWord ({ commit, dispatch }, newWord) {
      // TODO: test after integrating with backend
      return apiService.addWord(newWord).then(
        newWord => {
          // update global store
          commit('addWord', newWord)

          // show toaster message
          dispatch('updateToasterMessage', {
            message: 'New Word added successfully.',
            type: 'success'
          })
        },
        error => {
          console.error(error)

          // TODO: keep it in local storage for later sync up?

          // show error in toaster
          dispatch('updateToasterMessage', {
            message: 'Error: cannot add new word.',
            type: 'error'
          })
        }
      )
    }
  },
  // TODO: may need to divide this up
  modules: {
  }
})
