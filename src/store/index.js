import Vue from 'vue';
import Vuex from 'vuex';

import items from './modules/items';
import preferences from './modules/preferences';
import sound from './modules/sound';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    items,
    preferences,
    sound,
    user,
  },
});
