import Vue from 'vue';
import Vuex from 'vuex';
import modules from '@/store';

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    ...modules,
  },
});

export default store;
