import {useAjax} from "../../composables/use-ajax";

export default {
    namespaced: true,

    // state
    state: {
        orders: [],
        // end state
    },

    // getters
    getters: {
        getOrders(state) {
            return state.orders
        }
        // end getters
    },

    // mutations
    mutations: {
        setOrders(state, payload) {
            state.orders = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
