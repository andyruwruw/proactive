import api from '@/api';

const state = {
  user: null,
};

const getters = {
  user: (state) => state.user,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  async getUser() {

  },
  async login({ commit }, payload) {
    let user = await api.auth.login(payload);
    if (user) {
      commit('setUser', user);
    }
  },
  async register({ commit }, payload) {
    let user = await api.auth.register(payload);
    if (user) {
      commit('setUser', user);
    }
  },
  async logout() {

  },
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;