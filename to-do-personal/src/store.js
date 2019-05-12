    
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    items: [],
    item: null,
    deleted: false,
    loginorregister: -1,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setItems(state, items) {
      state.items = items;
    },
    setItem(state, item) {
      state.item = item;
    },
    setDeleted(state, deleted) {
      state.deleted = deleted;
    },
    setLoginOrRegister(state) {
      if (state.loginorregister == -1) {state.loginorregister = 1;}
      else if (state.loginorregister == 1) {state.loginorregister = 0;}
      else {state.loginorregister = 1;}
    }
  },
  actions: {
    toggleLoginRegister(context) {
      try {
        context.commit('setLoginOrRegister');
      } catch (error) {
        console.log(error);
      }
    },
    async register(context, data) {
      try {
        console.log("MY NAME");
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        console.log(this.state.user);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async postItem(context, payload) {
      try {
        let data = {
          title: payload.title,
          description: payload.description,
          due: payload.due,
          subitems: payload.subitems,
        };
        let response = await axios.post("/api/items/", data);
        context.commit('setItems', response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async getItems(context) {
      try {
        let response = await axios.get("/api/items/");
        context.commit('setItems', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getItem(context, payload) {
      try {
        let response = await axios.get("/api/items/" + payload._id);
        context.commit('setItem', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(context, payload) {
      try {
        let response = await axios.delete("/api/items/" + payload._id);
        context.commit('setDeleted', true);
      } catch (error) {
        console.log(error);
      }
    },
    undoDeleted(context, payload) {
      try {
        context.commit('setDeleted', false);
      } catch (error) {
        console.log(error);
      }
    }
  }
})
