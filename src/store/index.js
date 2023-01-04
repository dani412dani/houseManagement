import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    LOGIN_USER(state, newUser) {
      state.user = newUser
    }
  },
  actions: {
    loginUser({ commit }, newUser) {
      commit('LOGIN_USER', newUser)
    }
  },
  modules: {
  }
})