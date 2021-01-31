// import the api endpoints
import * as projectsApi from '@/api/projects.api';

const state = {
  projects: [],
};

const getters = {
  getProjectsSelect: (state) => {
    return state.projects.map((project) => ({ text: project.name, value: project.id }));
  },
};

const actions = {
  async fetchProjects({ commit }) {
    const response = await projectsApi.getAllProjects();
    commit('SET_PROJECTS', response.data);
  },
};

const mutations = {
  SET_PROJECTS(state, data) {
    state.projects = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
