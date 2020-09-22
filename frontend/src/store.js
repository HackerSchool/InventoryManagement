import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let state = {};

let store = new Vuex.Store({
    state: state,
    mutations: {
        //for example change the state to login
    },
    actions: {
        //for example login
    },
    getters: {
        //for example isLoggedIn
    }
});

export default store