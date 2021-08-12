import Vue from 'vue';
import Vuex from 'vuex';
import storeConfig from '@/store';

Vue.use(Vuex);

let store = new Vuex.Store(storeConfig);

export default store;
