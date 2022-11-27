<template>
    <div v-if="customers.length < 1">
        <p class="primaryParagraph">
            You dont have any customers yet.
        </p>
    </div>
    <div v-if="customers.length > 0"
         class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <div v-if="selectedCustomers.length > 0"
                         class="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                        <button type="button"
                                class="inline-flex items-center rounded bcustomer bcustomer-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                            Bulk edit
                        </button>
                        <button type="button"
                                class="inline-flex items-center rounded bcustomer bcustomer-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30">
                            Delete all
                        </button>
                    </div>
                    <table class="min-w-full table-fixed divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                                <input type="checkbox"
                                       class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded bcustomer-gray-300 text-emerald-600 focus:ring-emerald-500 sm:left-6"
                                       :checked="indeterminate || selectedCustomers.length === customers.length"
                                       :indeterminate="indeterminate"
                                       @change="selectedCustomers = $event.target.checked ? customers.map((customer) => customer.id) : []"/>
                            </th>
                            <th scope="col"
                                class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                Customer ID
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Site id
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                First name
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Last name
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Address
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Address 2
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                City
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Zipcode
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Country
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Discount
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="customer in customers" :key="customer.id"
                            :class="[selectedCustomers.includes(customer.id) && 'bg-gray-50']">
                            <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                <div v-if="selectedCustomers.includes(customer.id)"
                                     class="absolute inset-y-0 left-0 w-0.5 bg-emerald-600"></div>
                                <input type="checkbox"
                                       class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded bcustomer-gray-300 text-emerald-600 focus:ring-emerald-500 sm:left-6"
                                       :value="customer.id" v-model="selectedCustomers"/>
                            </td>
                            <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedCustomers.includes(customer.id) ? 'text-emerald-600' : 'text-gray-900']">
                                {{ customer.id }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.site_id }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.firstname }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.lastname }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.address }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.address2 }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.city }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.zipcode }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.country }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ customer.discount }}
                            </td>
                            <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a :href="`customers/view/${customer.id}`"
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

// Statuses for customers
// 0    = Temporary
// 1    = New pending customer
// 10   = Packing
// 15   = Hanging
// 50   = Expired
// 90   = Cancelled
// 100  = Captured and completed

// store
const store = useStore();

const customers = computed(() => {
    return store.getters['customers/getCustomers']
})

// selected products
const selectedCustomers = ref([])
//checked
const checked = ref(false)
// indeterminate
const indeterminate = computed(() => selectedCustomers.value.length > 0 && selectedCustomers.value.length < customers.value.length)

console.log('se customers:', customers.value)

</script>
