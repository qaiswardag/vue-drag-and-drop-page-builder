export default {
    namespaced: true,

    // state
    state: {
        media: [],
        // end state
    },

    // getters
    getters: {
        getMedia(state) {
            return state.media
        }
        // end getters
    },

    // mutations
    mutations: {
        setMedia(state, payload) {
            state.media = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
