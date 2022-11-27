<template>
    <div>
        <OverviewAndAction>
            <template v-slot:header>
                <div class="overview-menu-nav">
                    <a href="/products"
                       :class="{ 'active-link-color' : 'products' === currentRouteName }">
                        Products
                    </a>
                    <a href="/categories"
                       :class="{ 'active-link-color' : 'categories' === currentRouteName }">
                        Categories
                    </a>
                </div>
            </template>

            <template v-slot:para>
                A list of all the products in your account including product name, price and type.
            </template>

            <template v-slot:content>
                <a href="/products/create"
                   class="myPrimaryButton">
                    New product
                </a>
            </template>
        </OverviewAndAction>
        <div class="w-full">
            <ProductListsTable></ProductListsTable>
        </div>
    </div>
</template>


<script setup>
import ProductListsTable from "../../components/products/products/ProductListsTable";
import OverviewAndAction from "../../components/overview-and-actions/OverviewAndAction";
import {computed} from "vue";
import {useStore} from 'vuex'

// store
const store = useStore();

// props
const props = defineProps({
    products: {
        required: true
    },
})

store.commit('product/setProducts', props.products.data)

// route name
const currentRouteName = computed(() => {
    return store.getters['routes/getCurrentRo uteName']
});
</script>
