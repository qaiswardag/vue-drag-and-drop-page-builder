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
                       :class="{ 'active-link-color' : 'categories-products' === currentRouteName }">
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
                    New Category
                </a>
            </template>
        </OverviewAndAction>

    </div>
</template>


<script setup>
import OverviewAndAction from "../../components/overview-and-actions/OverviewAndAction";
import {useStore} from 'vuex'
import {computed} from "vue";

// store
const store = useStore();


// route name
const currentRouteName = computed(() => {
    return store.getters['routes/getCurrentRouteName']
});

</script>
