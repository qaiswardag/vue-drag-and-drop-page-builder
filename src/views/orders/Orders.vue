<template>
    <div>
        <div class="w-full">
            <OrdersList></OrdersList>
        </div>
    </div>
</template>


<script setup>
import OrdersList from "../../components/orders/OrdersList";
import {useStore} from 'vuex'

// store
const store = useStore();


// props
const props = defineProps({
    orders: {
        required: true
    },
})

// set orders
store.commit('orders/setOrders', props.orders.data)
</script>
