export default {
    namespaced: true,

    // state
    state: {
        currentRouteName: null,

        // end state
    },

    // getters
    getters: {
        getCurrentRouteName(state) {
            return state.currentRouteName
        },
        // end getters
    },

    // mutations
    mutations: {
        setCurrentRouteName(state, payload) {
            state.currentRouteName = payload
        },

        // end mutations
    },

    // actions
    actions: {

        // end action
    }
};
