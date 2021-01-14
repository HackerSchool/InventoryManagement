//import the api endpoints
import * as requisitionApi from '@/api/requisitions.api';

const state = {
  requisitions: [],
};

const getters = {};

const actions = {
  async fetchSelfRequisitions({ commit }) {
    const response = await requisitionApi.getSelfRequisitions();
    commit('SET_REQUISITIONS', response.data);
  },
};

const mutations = {
  SET_REQUISITIONS(state, data) {
    state.requisitions = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
