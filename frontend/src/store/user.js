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
};

const actions = {
  loginUser({ commit }, jwt) {
    const { id, istId, name, role, exp, avatar } = JSON.parse(atob(jwt.split('.')[1]));
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
