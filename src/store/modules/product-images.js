import {useAjax} from "../../composables/use-ajax";

export default {
    namespaced: true,

    // state
    state: {
        images: [],
    },

    // getters
    getters: {
        getImages(state) {
            return state.images
        },
        // end getters
    },

    // mutations
    mutations: {
        setImages(state, payload) {
            state.images = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // load product images
        async loadProductImages(context) {
            // use ajax
            const {loadData} = useAjax()
            // try
            try {
                const data = await loadData(
                    `/products/create/images`,
                    {},
                    {additionalCallTime: 0}
                )
                // context & send to mutation
                context.commit('setImages', data)

                // catch errors
            } catch (err) {
                throw err;
            }
        },

        // end action
    },
};
