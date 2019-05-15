    
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
      {tag: "", volume: 0},
      {tag: "what-a-difference-a-day-makes", volume: .06},
      {tag: "ova-da-wudz", volume: 0.17},
      {tag: "chopin", volume: 0.3},
      {tag: "akita-mani-yo", volume: 0.06},
      {tag: "day-and-night", volume: 0.12},
      {tag: "random1", volume: 0.02},
      {tag: "random2", volume: 0.2},
      {tag: "random3", volume: 0.2},
      {tag: "random4", volume: 0.2},
      {tag: "random5", volume: 0.2},
      {tag: "random6", volume: 0.2},
      {tag: "random7", volume: 0.2},
    ],
    preferences: {
      labels: [true, true, true],
      colors: 0,
      display: 0,
      theme: 0,
      groups: [],
      order: 0,
      sound_pack: 1,
      music: 0,
      svolume: 1,
      mvolume: 1,
    },
    SOUNDS: [
      {tag: "click", volume: [0, .1, .007, .01, .01]},
      {tag: "delete", volume: [0, .05, .008, .018, .05]},
      {tag: "done", volume: [0, .025, .008, .01, .025]},
      {tag: "hover", volume: [0, .05, .004, .005, .006]},
      {tag: "server", volume: [0, .05, .009, .01, .05]},
    ],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
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
    setLoginOrRegister(state) {
      if (state.loginorregister == -1) {state.loginorregister = 1;}
      else if (state.loginorregister == 1) {state.loginorregister = 0;}
      else {state.loginorregister = 1;}
    },
    setSong(state, song) {
      state.preferences.music = song;
    },
    setSoundPack(state, pack) {
      state.preferences.sound_pack = pack;
    },
    setPreferences(state, preferences) {
      state.preferences.labels[0] = preferences.labels[0];
      state.preferences.labels[1] = preferences.labels[1];
      state.preferences.labels[2] = preferences.labels[2];
      state.preferences.colors = preferences.colors;
      state.preferences.display = preferences.display;
      state.preferences.theme = preferences.theme;
      state.preferences.groups = preferences.groups;
      state.preferences.order = preferences.order;
      state.preferences.sound_pack = preferences.sound_pack;
      state.preferences.music = preferences.music;
      state.preferences.svolume = preferences.svolume;
      state.preferences.mvolume = preferences.mvolume;
    },
    setMenu(state, payload) {
      var set = -1;
      for (var i = 0; i < state.items.length; i++)
      {
        if (set != -1)
        {
          if (state.items[i].menu == true)
          state.items[i].menu = false;
          else continue;
        }
        else if (state.items[i]._id == payload._id){
          if (state.items[i].menu == true) {
            state.items[i].menu = false;
          }
          else if (state.items[i].menu == false) {
            state.items[i].menu = true;
            set = i;
          }
        }
      }
      if (set != -1)
      {
        
        for (var i = 0; i < set; i++)
        {
          if (state.items[i].menu == true)
          state.items[i].menu = false;
          else continue;
        }
      }
    },
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
        let response = await axios.post("/api/users", data);
        context.commit('setUser', response.data);
        response = await axios.post("/api/preferences");
        context.commit('setPreferences', response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit('setUser', response.data);
        let newresponse = await axios.get("/api/preferences");
        context.commit('setPreferences', newresponse.data);
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
        let newresponse = await axios.get("/api/preferences");
        context.commit('setPreferences', newresponse.data);
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
        console.log(response.data);
        context.commit('setItem', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateItem(context, payload) {
      try {
        let response = await axios.put("/api/item/" + payload._id, payload);
        console.log(response.data);
        context.commit('setItems', response.data);
        context.commit('setItem', null);
      } catch (error) {
        console.log(error);
      }
    },
    toggleMenu(context, payload) {
      context.commit('setMenu', payload);
    },
    async done(context, payload) {
      try {
        let response = await axios.put("/api/item/done/" + payload.id, {done: 1});
        context.commit('setItems', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async undone(context, payload) {
      try {
        let response = await axios.put("/api/item/done/" + payload.id, {done: 0});
        context.commit('setItems', response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(context, payload) {
      try {
        let response = await axios.delete("/api/item/" + payload._id);
        context.commit('setItems', response.data);
        if (this.state.item != null)
        {
          context.commit('setItem', null);
        }
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
      if (this.state.preferences.sound_pack == 0)
      {
        return 0;
      }
      try {
        var media = document.getElementById(this.state.preferences.sound_pack + this.state.SOUNDS[payload.sound].tag);
        if (payload.volume == 0)
        {
            let volumeLevel = this.state.SOUNDS[payload.sound].volume[this.state.preferences.sound_pack];
            console.log(volumeLevel);
            let multiplyer = 1;
            switch (this.state.preferences.svolume) {
              case 0:
              multiplyer = .5
              break;
              case 1:
              multiplyer = 1.3;
              break;
              case 2:
              multiplyer = 2.3;
              break;
            }
            volumeLevel = volumeLevel * multiplyer;
            media.volume = volumeLevel;
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
      try{
        var media = document.getElementById(this.state.MUSIC[this.state.preferences.music].tag);
        var playPromise = media.pause();

        context.commit('setSong', payload.music);

        if (this.state.preferences.music == 0)
        {
          return 0;
        }

        media = document.getElementById(this.state.MUSIC[this.state.preferences.music].tag);
        let volumeLevel = this.state.MUSIC[this.state.preferences.music].volume;
        let multiplyer = 1;
        switch (this.state.preferences.mvolume) {
          case 0:
          multiplyer = .075
          break;
          case 1:
          multiplyer = .15;
          break;
          case 2:
          multiplyer = .5;
          break;
        }
        volumeLevel = volumeLevel * multiplyer;
        media.volume = volumeLevel;
        playPromise = media.play();
        if (playPromise !== null){
          playPromise.catch(() => { media.play(); })
        }
      } catch(error)
      {
        console.log(error);
      }
    },
    playSong(cotext)
    {
      try{
        if (this.state.preferences.music == 0)
        {
          return 0;
        }
        let media = document.getElementById(this.state.MUSIC[this.state.preferences.music].tag);
        let volumeLevel = this.state.MUSIC[this.state.preferences.music].volume;
        let multiplyer = 1;
        switch (this.state.preferences.mvolume) {
          case 0:
          multiplyer = .075
          break;
          case 1:
          multiplyer = .15;
          break;
          case 2:
          multiplyer = .5;
          break;
        }
        volumeLevel = volumeLevel * multiplyer;
        media.volume = volumeLevel;
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
    },
    async changePreferences(context)
    {
      let data = {
        labels: this.state.preferences.labels,
        colors: this.state.preferences.colors,
        display: this.state.preferences.display,
        theme: this.state.preferences.theme,
        groups: this.state.preferences.groups,
        order: this.state.preferences.order,
        sound_pack: this.state.preferences.sound_pack,
        music: this.state.preferences.music,
        svolume: this.state.preferences.svolume,
        mvolume: this.state.preferences.mvolume,
      }
      let response = await axios.put("/api/preferences", data);
      context.commit('setPreferences', response.data);
    },
    async updatePreferences(context, payload) {
      let newPref = {
        labels: this.state.preferences.labels,
        colors: this.state.preferences.colors,
        display: this.state.preferences.display,
        theme: this.state.preferences.theme,
        groups: this.state.preferences.groups,
        order: this.state.preferences.order,
        sound_pack: this.state.preferences.sound_pack,
        music: this.state.preferences.music,
        svolume: this.state.preferences.svolume,
        mvolume: this.state.preferences.mvolume,
      };
      if (payload.tag == "labels")
      {
        newPref.labels[payload.at] = payload.set;
      }
      else 
      {
        newPref[payload.tag] = payload.set;
      }
      context.commit('setPreferences', newPref);
    },
    async loadPreferences(context)
    {
      let response = await axios.get("/api/preferences");
      console.log("LJSD:FJS:DF");
      console.log(response.data);
      context.commit('setPreferences', response.data);
    },
    resetSettings(context)
    {
      let newPref = {
        labels: [true, true, true],
        colors: 0,
        display: 0,
        theme: 0,
        groups: [],
        order: 0,
        sound_pack: 1,
        music: 1,
        svolume: 1,
        mvolume: 1,
      };
      context.commit('setPreferences', newPref);
    }
  }
})
