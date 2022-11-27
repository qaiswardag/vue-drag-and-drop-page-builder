export default {
    namespaced: true,

    // state
    state: {
        productDetails: {
            productName: null,
            productSlug: null,
            shortDescription: null,
            longDescription: null,
        },


        productMetaDetails: {
            metaTitle: null,
            metaDescription: null,
        },

        // published
        isPublished: false,

        // tags
        productTags: [],

        // categories
        selectedCategories: [],

        // auto stock
        autoStock: false,
        // single product variant
        singleVariant: {
            productPrice: null,
            productSku: null,
            productsOnStock: null,
        },

        // multiple product variants
        singleVariant: {
            productPrice: null,
            productSku: null,
            productsOnStock: null,
        },

        // single or multiple product
        variantType: null,

        // product discount
        productDiscount: {},

        // campaigns
        discounts: [],

        // multiple product variants
        optionsWithValues: [],

        // end state
    },

    // getters
    getters: {
        getProductDetails(state) {
            return state.productDetails
        },
        getProductMetaDetails(state) {
            return state.productMetaDetails
        },
        getIsPublished(state) {
            return state.isPublished
        },
        getProductTags(state) {
            return state.productTags
        },
        // categories
        getSelectedCategories(state) {
            return state.selectedCategories
        },
        getAutoStock(state) {
            return state.autoStock
        },
        getSingleVariant(state) {
            return state.singleVariant
        },
        getVariantType(state) {
            return state.variantType
        },
        getProductDiscount(state) {
            return state.productDiscount
        },
        getDiscounts(state) {
            return state.discounts
        },
        getOptionsWithValues(state) {
            return state.optionsWithValues
        },

        // end getters
    },

    // mutations
    mutations: {
        setProductDetails(state, payload) {
            state.productDetails = payload
        },
        setProductMetaDetails(state, payload) {
            state.productMetaDetails = payload
        },
        setIsPublished(state, payload) {
            state.isPublished = payload
        },
        setProductTags(state, payload) {
            state.productTags = payload
        },
        setSelectedCategories(state, payload) {
            state.selectedCategories = payload
        },
        setAutoStock(state, payload) {
            state.autoStock = payload
        },
        setSingleVariant(state, payload) {
            state.singleVariant = payload
        },
        setVariantType(state, payload) {
            state.variantType = payload
        },
        setProductDiscount(state, payload) {
            state.productDiscount = payload
        },
        setDiscounts(state, payload) {
            state.discounts = payload
        },
        setOptionsWithValues(state, payload) {
            state.optionsWithValues = payload
        },
        // end mutations
    },

    // actions
    actions: {
        // end action
    },
};
