const state = {
  items: [],
  item: null,
  deleted: false,
};

const getters = {

};

const mutations = {
  setItems(state, items) {
    for (var i = 0; i < items.length; i++)
    {
      items[i].menu = false;
    }
    state.items = items;
  },
  setItem(state, item) {
    state.item = item;
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