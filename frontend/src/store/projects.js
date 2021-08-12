// import the api endpoints
import * as projectsApi from '@/api/projects.api';

const state = {
  projects: [],
};

const getters = {
  getProjectsSelect: (state) => {
    return state.projects.map((project) => ({ text: project.name, value: project.id }));
  },
  getProjectMembers: (state) => (id) => state.projects.find((project) => project.id == id),
};

const actions = {
  async fetchProjects({ commit }) {
    const response = await projectsApi.getAllProjects();
    commit('SET_PROJECTS', response);
  },
  async fetchProject({ commit }, id) {
    const response = await projectsApi.getProject(id);
    commit('SET_PROJECT', response.data);
  },
  async createProject({ commit }, data) {
    const response = await projectsApi.addProject(data);
    commit('SET_PROJECT', response.data);
  },
  async deleteProject({ commit }, id) {
    await projectsApi.deleteProject(id);
    commit('REMOVE_PROJECT', id);
  },
  async updateProject({ commit }, { id, data }) {
    const response = await projectsApi.updateProject(id, data);
    commit('SET_PROJECT', { ...response.data, id });
  },
  async addMember({ commit }, { id, memberId }) {
    const response = await projectsApi.addMember(id, memberId);
    commit('SET_PROJECT', { ...response.data, id });
  },
  async deleteMember({ commit }, { id, memberId }) {
    const response = await projectsApi.deleteMember(id, memberId);
    commit('SET_PROJECT', { ...response.data, id });
  },
};

const mutations = {
  SET_PROJECTS(state, data) {
    state.projects = data;
  },
  SET_PROJECT(state, data) {
    const index = state.projects.findIndex((project) => project.id == data.id);

    if (index === -1) state.projects.push(data);
    // editing the array doesn't trigger DOM refresh, but splice does
    else state.projects.splice(index, 1, data);
  },
  REMOVE_PROJECT(state, id) {
    const index = state.projects.findIndex((project) => project.id == id);
    state.projects.splice(index, 1); // removes element from array and shifts the others
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
