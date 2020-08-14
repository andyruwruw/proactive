const state = {
  user: null,
  loginRegister: -1,
};

const getters = {

};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setLoginOrRegister(state) {
    if (state.loginRegister == -1) {state.loginRegister = 1;}
    else if (state.loginRegister == 1) {state.loginRegister = 0;}
    else {state.loginRegister = 1;}
  },
};

const actions = {

};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;