const state = {
  music: [
    {tag: "", volume: 0},
    {tag: "what-a-difference-a-day-makes", volume: .06},
    {tag: "ova-da-wudz", volume: 0.17},
    {tag: "chopin", volume: 0.3},
    {tag: "akita-mani-yo", volume: 0.06},
    {tag: "day-and-night", volume: 0.12},
    {tag: "random1", volume: 0.08},
    {tag: "random2", volume: 0.08},
    {tag: "random3", volume: 0.08},
    {tag: "random4", volume: 0.08},
    {tag: "random5", volume: 0.08},
    {tag: "random6", volume: 0.08},
    {tag: "random7", volume: 0.08},
  ],
  sound: [
    {tag: "click", volume: [0, .1, .007, .01, .01]},
    {tag: "delete", volume: [0, .05, .008, .018, .05]},
    {tag: "done", volume: [0, .025, .008, .01, .025]},
    {tag: "hover", volume: [0, .05, .004, .005, .006]},
    {tag: "server", volume: [0, .05, .009, .01, .05]},
  ],
  random: 3,
};

const getters = {

};

const mutations = {
  setRandom(state, random) {
    state.random = random;
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