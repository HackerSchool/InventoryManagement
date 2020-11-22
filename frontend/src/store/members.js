// import the api endpoints
import { getAllMembers } from '@/api/members.api';

const state = {
  members: [],
};

const getters = {};

const actions = {
  async fetchMembers({ commit }) {
    const response = await getAllMembers();
    commit('SET_MEMBERS', response.data);
  },
};

const mutations = {
  SET_MEMBERS(state, data) {
    state.members = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
