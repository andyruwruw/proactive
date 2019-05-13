    
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

    MUSIC: [
      {tag: "song1", volume: 1},
      {tag: "song2", volume: 0.2},
    ],
    song: 0,
    sound_pack: 1,
    SOUNDS: [
      {tag: "click", volume: .1},
      {tag: "delete", volume: .1},
      {tag: "done", volume: 1},
      {tag: "hover", volume: .05},
      {tag: "server", volume: 1},
    ],
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
    },
    setSong(state, song) {
      state.song = song;
    },
    setSoundPack(state, pack) {
      state.sound_pack = pack;
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
        let response = await axios.post("/api/item/", data);
        context.commit('setItems', response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async getItems(context) {
      try {
        let response = await axios.get("/api/item/");
        context.commit('setItems', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getItem(context, payload) {
      try {
        let response = await axios.get("/api/item/" + payload._id);
        context.commit('setItem', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(context, payload) {
      try {
        let response = await axios.delete("/api/item/" + payload._id);
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
    },
    playSound(context, payload)
    {
      if (this.state.sound_pack == 0)
      {
        return 0;
      }
      try {
        console.log(this.state.sound_pack + this.state.SOUNDS[payload.sound].tag);
        var media = document.getElementById(this.state.sound_pack + this.state.SOUNDS[payload.sound].tag);
        console.log("trying to play a sound");
        if (payload.volume == 0)
        {
            media.volume = this.state.SOUNDS[payload.sound].volume;
        }
        else
        {
            media.volume = payload.volume;
        }
        const playPromise = media.play();
        if (playPromise !== null) 
            playPromise.catch(() => {media.play();})
      } catch (error) {
        console.log(error);
      }
    },
    changeSong(context, payload)
    {
      if (this.state.song == 0)
      {
        return 0;
      }
      try{
        var media = document.getElementById(this.state.MUSIC[this.state.song].tag);
        var playPromise = media.pause();

        context.commit('setSong', payload.song);

        media = document.getElementById(this.state.MUSIC[this.state.song].tag);
        media.volume = this.state.MUSIC[this.state.song].volume;
        playPromise = media.play();
        if (playPromise !== null){
          playPromise.catch(() => { media.play(); })
        }
      } catch(error)
      {
        console.log(error);
      }
    },
    changeSoundPack(context, payload)
    {
      context.commit('setSoundPack', payload.pack);
    }
  }
})
