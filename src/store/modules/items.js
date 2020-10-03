const state = {
  items: [],
  id: null,
};

const getters = {
  item: (state) => {
    for (let i = 0; i < state.items.length; i += 1) {
      if (state.items[i]._id === state.id) {
        return state.items[i];
      }
    }
    return null;
  }
};

const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  setID(state, id) {
    state.id = id;
  },
  setDeleted(state, deleted) {
    state.deleted = deleted;
  },
  setMenu(state, payload) {
    let set = -1;
    for (let i = 0; i < state.items.length; i++) {
      if (set != -1) {
        if (state.items[i].menu == true) {
          state.items[i].menu = false;
        } else {
          continue;
        }
      } else if (state.items[i]._id == payload._id) {
        if (state.items[i].menu == true) {
          state.items[i].menu = false;
        } else if (state.items[i].menu == false) {
          state.items[i].menu = true;
          set = i;
        }
      }
    }

    if (set != -1) {
      for (let i = 0; i < set; i++) {
        if (state.items[i].menu == true) {
          state.items[i].menu = false;
        } else {
          continue;
        }
      }
    }
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