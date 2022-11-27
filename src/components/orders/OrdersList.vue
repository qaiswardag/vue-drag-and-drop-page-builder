<template>
    <div v-if="orders.length < 1">
        <p class="primaryParagraph">
            You dont have any orders yet.
        </p>
    </div>
    <div v-if="orders.length > 0"
         class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <div v-if="selectedOrders.length > 0"
                         class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                        <button type="button"
                                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                            Bulk edit
                        </button>
                        <button type="button"
                                class="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                            Delete all
                        </button>
                    </div>
                    <table class="min-w-full table-fixed divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                                <input type="checkbox"
                                       class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 sm:left-6"
                                       :checked="indeterminate || selectedOrders.length === orders.length"
                                       :indeterminate="indeterminate"
                                       @change="selectedOrders = $event.target.checked ? orders.map((order) => order.id) : []"/>
                            </th>
                            <th scope="col"
                                class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                Order ID
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Site id
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Invoice number
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Billing name
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                E-mail
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Price
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="order in orders" :key="order.id"
                            :class="[selectedOrders.includes(order.id) && 'bg-gray-50']">
                            <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                <div v-if="selectedOrders.includes(order.id)"
                                     class="absolute inset-y-0 left-0 w-0.5 bg-emerald-600"></div>
                                <input type="checkbox"
                                       class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 sm:left-6"
                                       :value="order.id" v-model="selectedOrders"/>
                            </td>
                            <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedOrders.includes(order.id) ? 'text-emerald-600' : 'text-gray-900']">
                                {{ order.id }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ order.site_id }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ order.invoice_num }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ order.billing_name }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ order.email }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ order.price }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                         <span v-if="order.status === 0"
                                               class="py-1 px-2 rounded"
                                               :class="{'bg-gray-500 text-white' : order.status === 0}">
                                       Temporary: {{ order.status }}
                                    </span>
                                <span v-if="order.status === 1"
                                      class="py-1 px-2 rounded"
                                      :class="{'bg-blue-600 text-white' : order.status === 1}">
                                       New pending order: {{ order.status }}
                                    </span>
                                <span v-if="order.status === 10"
                                      class="py-1 px-2 rounded"
                                      :class="{'bg-pink-600 text-white' : order.status === 10}">
                                       Packing: {{ order.status }}
                                    </span>
                                <span v-if="order.status === 20"
                                      class="py-1 px-2 rounded"
                                      :class="{'bg-fuchsia-700 text-white' : order.status === 20}">
                                       Hanging: {{ order.status }}
                                    </span>
                                <span v-if="order.status === 50"
                                      class="py-1 px-2 rounded"
                                      :class="{'bg-yellow-600 text-white' : order.status === 50}">
                                       Expired: {{ order.status }}
                                    </span>
                                <span v-if="order.status === 90"
                                      class="py-1 px-2 rounded"
                                      :class="{'bg-red-600 text-white' : order.status === 90}">
                                       Cancelled: {{ order.status }}
                                    </span>
                                <span v-if="order.status === 100"
                                      class="py-1 px-2 rounded"
                                      :class="{'bg-emerald-600 text-white' : order.status === 100}">
                                       Completed: {{ order.status }}
                                    </span>

                                <span
                                    v-if="order.status === 30 || order.status === 40 || order.status === 60 || order.status === 70 || order.status === 80"
                                    class="ml-2 py-1 px-2 rounded bg-black text-white">
                                       Not set: {{ order.status }}
                                    </span>
                            </td>
                            <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a :href="`orders/view/${order.id}`"
                                   class="text-emerald-600 hover:text-emerald-900">
                                    View
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'

// Statuses for orders
// 0    = Temporary
// 1    = New pending order
// 10   = Packing
// 15   = Hanging
// 50   = Expired
// 90   = Cancelled
// 100  = Captured and completed

// store
const store = useStore();

const orders = computed(() => {
    return store.getters['orders/getOrders']
})

const ordersStat = {
    Pending: 40,
    today: 30,
    yesterday: 2,
    thisMonth: 60
}
// selected products
const selectedOrders = ref([])
//checked
const checked = ref(false)
// indeterminate
const indeterminate = computed(() => selectedOrders.value.length > 0 && selectedOrders.value.length < orders.value.length)

console.log('se orders:', orders.value)

</script>
