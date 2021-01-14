// import the api endpoints
import * as memberApi from '@/api/members.api';

const state = {
  members: [],
};

const getters = {
  getMember: (state) => (id) => state.members.find((member) => member.id == id),
};

const actions = {
  async fetchMembers({ commit }) {
    const response = await memberApi.getAllMembers();
    commit('SET_MEMBERS', response.data);
  },
  async fetchMember({ commit }, id) {
    const response = await memberApi.getMember(id);
    commit('SET_MEMBER', response.data);
  },
  async createMember({ commit }, data) {
    const response = await memberApi.addMember(data);
    commit('SET_MEMBER', response.data);
  },
  async deleteMember({ commit }, id) {
    await memberApi.deleteMember(id);
    commit('REMOVE_MEMBER', id);
  },
  async updateMember({ commit }, { id, data }) {
    const response = await memberApi.updateMember(id, data);
    commit('SET_MEMBER', { ...response.data, id });
  },
};

const mutations = {
  SET_MEMBERS(state, data) {
    state.members = data;
  },
  SET_MEMBER(state, data) {
    const index = state.members.findIndex((member) => member.id == data.id);

    if (index === -1) state.members.push(data);
    // editing the array doesn't trigger DOM refresh, but splice does
    else state.members.splice(index, 1, data);
  },
  REMOVE_MEMBER(state, id) {
    const index = state.members.findIndex((member) => member.id == id);
    state.members.splice(index, 1); // removes element from array and shifts the others
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
