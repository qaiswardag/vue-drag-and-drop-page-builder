export default {
  namespaced: true,

  // state
  state: {
    user: null,

    // end state
  },

  // getters
  getters: {
    getUser(state) {
      return state.user;
    },

    // end getters
  },

  // mutations
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    // end mutations
  },

  // actions
  actions: {
    // end action
  },
};
