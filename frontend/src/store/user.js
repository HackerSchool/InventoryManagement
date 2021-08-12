import { getImageSrc } from '@/utils/image';

const roles = {
  user: 0,
  admin: 1,
};

const state = {
  userId: null,
  istId: '',
  name: '',
  role: '',
  avatar: null,
};

const getters = {
  getPermissionLevel: (state) => roles[state.role] || 0,
  getAvatarUrl: (state) => state.avatar && getImageSrc(state.avatar),
  getName: (state) => state.name,
};

const actions = {
  loginUser({ commit }, user) {
    const { id, istId, name, role, exp, avatar } = user;
    commit('SET_USER', { userId: id, istId, name, role, expiresAt: exp, avatar });
  },
  logoutUser({ commit }) {
    commit('SET_USER', {
      userId: null,
      istId: '',
      name: '',
      role: '',
      expiresAt: -1,
      avatar: null,
    });
  },
};

const mutations = {
  SET_USER(state, data) {
    Object.keys(data).forEach((key) => (state[key] = data[key]));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
