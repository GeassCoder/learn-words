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
        text: 'composite'
      },
      {
        text: 'artistic'
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
