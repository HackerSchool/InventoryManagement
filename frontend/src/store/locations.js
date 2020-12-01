// import the api endpoints
import * as locationApi from '@/api/locations.api';

const state = {
  locations: [],
};

const getters = {
  getLocation(id) {
    return state.locations.find((location) => location.id == id);
  },
};

const actions = {
  async fetchLocations({ commit }) {
    const response = await locationApi.getAllLocations();
    commit('SET_LOCATIONS', response.data);
  },
  async fetchLocation({ commit }, id) {
    const response = await locationApi.getLocation(id);
    commit('SET_LOCATION', response.data);
  },
  async createLocation({ commit }, data) {
    const response = await locationApi.addLocation(data);
    commit('SET_LOCATION', response.data);
  },
  async deleteLocation({ commit }, id) {
    await locationApi.deleteLocation(id);
    commit('REMOVE_LOCATION', id);
  },
  async updateLocation({ commit }, { id, data }) {
    const response = await locationApi.updateLocation(id, data);
    commit('SET_LOCATION', response.data);
  },
};

const mutations = {
  SET_LOCATIONS(state, data) {
    state.locations = data;
  },
  SET_LOCATION(state, data) {
    const index = state.locations.findIndex((location) => location.id == data.id);

    if (index === -1) state.locations.push(data);
    else state.locations[index] = data;
  },
  REMOVE_LOCATION(state, data) {
    const index = state.locations.findIndex((location) => location.id == data.id);
    state.locations.splice(index, 1); // removes element from array and shifts the others
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
