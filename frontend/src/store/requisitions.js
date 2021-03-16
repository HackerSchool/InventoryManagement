//import the api endpoints
import * as requisitionApi from '@/api/requisitions.api';

const state = {
  requisitions: [],
};

const getters = {};

const actions = {
  async fetchAllRequisitions({ commit }) {
    const response = await requisitionApi.getAllRequisitions();
    commit('SET_REQUISITIONS', response.data);
  },
  async fetchSelfRequisitions({ commit }) {
    const response = await requisitionApi.getSelfRequisitions();
    commit('SET_REQUISITIONS', response.data);
  },
  async createRequisition({ commit }, data) {
    const response = await requisitionApi.createRequisition(data);
    commit('SET_REQUISITION', response.data);
  },
  async updateRequisition({ commit }, { id, data }) {
    const response = await requisitionApi.updateRequisition(id, data);
    commit('SET_REQUISITION', { ...response.data, id });
  },
};

const mutations = {
  SET_REQUISITIONS(state, data) {
    state.requisitions = data;
  },
  SET_REQUISITION(state, data) {
    const index = state.requisitions.findIndex((requisition) => requisition.id == data.id);

    // Add item at beginning of array to keep sorting
    if (index === -1) state.requisitions.unshift(data);
    // editing the array doesn't trigger DOM refresh, but splice does
    else state.requisitions.splice(index, 1, data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
