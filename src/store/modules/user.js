import {useAjax} from "../../composables/use-ajax";

export default {
    namespaced: true,

    // state
    state: {
        user: null,
        backendValidationErrors: null,
        backendOldValues: null,
        siteId: null,
        siteName: null,

        // end state
    },

    // getters
    getters: {
        getUser(state) {
            return state.user
        },
        getBackendValidationErrors(state) {
            return state.backendValidationErrors
        },
        getBackendOldValues(state) {
            return state.backendOldValues
        },
        getSiteId(state) {
            return state.siteId
        },
        getSiteName(state) {
            return state.siteName
        },
        // end getters
    },

    // mutations
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setBackendValidationErrors(state, payload) {
            state.backendValidationErrors = payload
        },
        setBackendOldValues(state, payload) {
            state.backendOldValues = payload
        },
        setSiteId(state, payload) {
            state.siteId = payload
        },
        setSiteName(state, payload) {
            state.siteName = payload
        },

        // end mutations
    },

    // actions
    actions: {
        // end action
    }
};
