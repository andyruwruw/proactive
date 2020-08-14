const state = {
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
  datemade: 0,
  itembackground: true,
  tooltipsactive: true,
  groupsetting: 0,
};

const getters = {

};

const mutations = {
  setSong(state, song) {
    state.music = song;
  },
  setSoundPack(state, pack) {
    state.sound_pack = pack;
  },
  setPreferences(state, preferences) {
    state.labels[0] = preferences.labels[0];
    state.labels[1] = preferences.labels[1];
    state.labels[2] = preferences.labels[2];
    state.colors = preferences.colors;
    state.display = preferences.display;
    state.theme = preferences.theme;
    state.groups = preferences.groups;
    state.order = preferences.order;
    state.sound_pack = preferences.sound_pack;
    state.music = preferences.music;
    state.svolume = preferences.svolume;
    state.mvolume = preferences.mvolume;
    state.datemade = preferences.datemade;
    state.openmenus = preferences.openmenus;
    console.log(state.mainmenu +" "+ preferences.mainmenu);
    state.mainmenu = preferences.mainmenu;
    state.itembackground = preferences.itembackground;
    state.tooltipsactive = preferences.tooltipsactive;
    state.groupsetting = preferences.groupsetting;
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