<template>
    <CustomersList>
    </CustomersList>
</template>


<script setup>
import CustomersList from '../../components/customers/CustomersList'
import {useStore} from 'vuex'
import customers from "../../store/modules/customers";

// store
const store = useStore();

// props
const props = defineProps({
    customers: {
        required: true
    },
})


// set orders
store.commit('customers/setCustomers', props.customers.data)
</script>
