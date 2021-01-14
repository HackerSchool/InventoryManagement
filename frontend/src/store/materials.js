// import the api endpoints
import * as materialApi from '@/api/materials.api';

const state = {
  materials: [],
};

const getters = {
  getMaterial: (state) => (id) => state.materials.find((material) => material.id == id),
};

const actions = {
  async fetchMaterials({ commit }) {
    const response = await materialApi.getAllMaterials();
    commit('SET_MATERIALS', response.data);
  },
  async fetchMaterial({ commit }, id) {
    const response = await materialApi.getMaterial(id);
    commit('SET_MATERIAL', response.data);
  },
  async createMaterial({ commit }, data) {
    const response = await materialApi.addMaterial(data);
    commit('SET_MATERIAL', response.data);
    return response;
  },
  async deleteMaterial({ commit }, id) {
    await materialApi.deleteMaterial(id);
    commit('REMOVE_MATERIAL', id);
  },
  async updateMaterial({ commit }, { id, data }) {
    const response = await materialApi.updateMaterial(id, data);
    commit('SET_MATERIAL', { ...response.data, id });
    return response;
  },
  async updateMaterialImage({ commit }, { id, data }) {
    const response = await materialApi.uploadImage(id, data);
    commit('SET_MATERIAL', { ...response.data, id });
  },
};

const mutations = {
  SET_MATERIALS(state, data) {
    state.materials = data;
  },
  SET_MATERIAL(state, data) {
    const index = state.materials.findIndex((material) => material.id == data.id);

    if (index === -1) state.materials.push(data);
    // editing the array doesn't trigger DOM refresh, but splice does
    else state.materials.splice(index, 1, data);
  },
  REMOVE_MATERIAL(state, id) {
    const index = state.materials.findIndex((material) => material.id == id);
    state.materials.splice(index, 1); // removes element from array and shifts the others
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
