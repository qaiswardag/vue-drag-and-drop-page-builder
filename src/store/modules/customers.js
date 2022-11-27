import {useAjax} from "../../composables/use-ajax";

export default {
    namespaced: true,

    // state
    state: {
        customers: [],
        // end state
    },

    // getters
    getters: {
        getCustomers(state) {
            return state.customers
        }
        // end getters
    },

    // mutations
    mutations: {
        setCustomers(state, payload) {
            state.customers = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
