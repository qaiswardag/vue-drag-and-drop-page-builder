import {useAjax} from "../../composables/use-ajax";

export default {
    namespaced: true,

    // state
    state: {
        products: [],
        productsCategories: [],

        // test categories data
        // test categories data
        testCategoriesData: {
            name: 'Categories',
            children: [
                {
                    name: 'dior'
                },
                {
                    name: 'adidas'
                },
                {
                    name: 'h&m',
                    children: [
                        {
                            name: 'cos',
                            children: [
                                {name: '& other stories'},
                                {name: 'weekday'},
                                {name: 'adidas'}
                            ]
                        },
                        {name: 'afound'},
                        {name: 'arket'},
                        {name: 'adidas'},
                    ]
                },
                {
                    name: 'bestseller',
                    children: [
                        {
                            name: 'selected',
                            children: [{name: 'jaqueline de yong'}, {name: 'lmtd'}]
                        },
                        {name: 'yas'},
                        {name: 'pices'},
                    ]
                }
            ]
        },
        // test categories data
        // test categories data

        // end state
    },

    // getters
    getters: {
        getProducts(state) {
            return state.products
        },

        // test categories data
        // test categories data
        getProductsCategories(state) {
            return state.productsCategories
        },
        // test categories data
        // test categories data

        getTestCategoriesData(state) {
            return state.testCategoriesData
        },

        // end getters
    },

    // mutations
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
