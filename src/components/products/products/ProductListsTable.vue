<template>
    <div v-if="products.length < 1">
        <p class="primaryParagraph">
            You dont have any products yet.
        </p>
    </div>
    <div v-if="products.length > 1">
        <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <div v-if="selectedProducts.length > 0"
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
                                           :checked="indeterminate || selectedProducts.length === products.length"
                                           :indeterminate="indeterminate"
                                           @change="selectedProducts = $event.target.checked ? products.map((product) => product.id) : []"/>
                                </th>
                                <th scope="col"
                                    class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                                    Name
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Site id
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Test
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Test
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Test
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Test
                                </th>
                                <th scope="col"
                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Test
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="product in products" :key="product.id"
                                :class="[selectedProducts.includes(product.id) && 'bg-gray-50']">
                                <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                                    <div v-if="selectedProducts.includes(product.id)"
                                         class="absolute inset-y-0 left-0 w-0.5 bg-emerald-600"></div>
                                    <input type="checkbox"
                                           class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 sm:left-6"
                                           :value="product.id" v-model="selectedProducts"/>
                                </td>
                                <td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedProducts.includes(product.id) ? 'text-emerald-600' : 'text-gray-900']">
                                    {{ product.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ product.site_id }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    something here
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    something here
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    something here
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    something here
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    something here
                                </td>
                                <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <a href="#" class="text-emerald-600 hover:text-emerald-900"
                                    >Edit<span class="sr-only">, {{ product.id }}</span></a
                                    >
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {useStore} from 'vuex'
import OverviewAndAction from "../../overview-and-actions/OverviewAndAction";

// store
const store = useStore();
// getters products
const products = computed(() => {
    return store.getters['product/getProducts']
});

// selected products
const selectedProducts = ref([])
// checked
const checked = ref(false)
// indeterminate
const indeterminate = computed(() => {
    return selectedProducts.value.length > 0 && selectedProducts.value.length < products.value.length
})
console.log('se:', products.value)
</script>
