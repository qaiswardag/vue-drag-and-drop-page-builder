<template>
    <Transition name="fade">
        <div
            v-if="campaigns.length > 0"
            class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="min-w-full table-fixed divide-y divide-gray-300">

                            <thead
                                class="py-12 w-full bg-gray-50">
                            <tr>
                                <th v-if="getVariantType === 'singleProduct'"
                                    scope="col"
                                    class="min-w-[10rem] py-6 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-4 bg-gray-50">
                                    New price
                                </th>
                                <th v-if="getVariantType === 'singleProduct'"
                                    scope="col"
                                    class="min-w-[10rem] px-4 py-6 text-left text-sm font-semibold text-gray-900">
                                    Main price
                                </th>

                                <th scope="col"
                                    class="min-w-[10rem] py-6 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-4 bg-gray-50">
                                    Discount value
                                </th>

                                <th scope="col"
                                    class="min-w-[10rem] px-4 py-6 text-left text-sm font-semibold text-gray-900">
                                    Discount type
                                </th>
                                <th scope="col"
                                    class="min-w-[10rem] px-4 py-6 text-left text-sm font-semibold text-gray-900 bg-gray-50">
                                    From
                                </th>
                                <th scope="col"
                                    class="min-w-[10rem] px-4 py-6 text-left text-sm font-semibold text-gray-900">
                                    To
                                </th>

                                <th scope="col"
                                    class="min-w-[6rem] pr-6 py-6 text-right text-sm font-semibold text-gray-900">
                                    Edit
                                </th>
                                <th scope="col"
                                    class="min-w-[6rem] pl-3 pr-8 py-6 text-left text-sm font-semibold text-gray-900">
                                    Delete
                                </th>

                            </tr>
                            </thead>


                            <TransitionGroup name="table">
                                <tbody
                                    v-for="(campaign, index) in campaigns" :key="campaign.campaignId"
                                    class="divide-y divide-gray-200 bg-white">
                                <tr
                                    class="text-left">

                                    <td v-if="getVariantType === 'singleProduct'"
                                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <div v-if="campaign.discountType === 'fixed'">
                                            <div
                                                v-if="!getSingleVariant.productPrice">
                                                <input
                                                    value="Main price empty"
                                                    type="text"
                                                    readonly
                                                    disabled
                                                    placeholder="499.99"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                            <div
                                                v-if="getSingleVariant.productPrice">
                                                <input
                                                    :value="(getSingleVariant.productPrice - campaign.discountValue).toFixed(2)"
                                                    type="text"
                                                    readonly
                                                    disabled
                                                    placeholder="499.99"
                                                    autocomplete="off"
                                                    class="primaryInput"/>

                                            </div>
                                        </div>


                                        <div v-if="campaign.discountType === 'percentage'">
                                            <div
                                                v-if="!getSingleVariant.productPrice">
                                                <input
                                                    value="Main price empty"
                                                    type="text"
                                                    readonly
                                                    disabled
                                                    placeholder="499.99"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                            <div
                                                v-if="getSingleVariant.productPrice">
                                                <input
                                                    :value="((getSingleVariant.productPrice / 100) * (100 - campaign.discountValue)).toFixed(2)"
                                                    type="text"
                                                    readonly
                                                    disabled
                                                    placeholder="499.99"
                                                    autocomplete="off"
                                                    class="primaryInput"/>
                                            </div>
                                        </div>
                                    </td>

                                    <td v-if="getVariantType === 'singleProduct'"
                                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <div v-if="getSingleVariant.productPrice">
                                            <input
                                                :value="getSingleVariant.productPrice"
                                                type="text"
                                                readonly
                                                disabled
                                                placeholder="499.99"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                        <div v-else>
                                            <input
                                                value="Main price empty"
                                                type="number"
                                                readonly
                                                disabled
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                    </td>


                                    <td
                                        class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <div
                                            v-if="campaign.discountValue && Number.isFinite(Number(campaign.discountValue))">
                                            <input
                                                :value="campaign.discountValue"
                                                type="number"
                                                @click="$emit('editCampaign', campaign.campaignId)"
                                                readonly
                                                placeholder="499.99"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                        <div v-else>
                                            <input
                                                value="Enter discount"
                                                type="number"
                                                @click="$emit('editCampaign', campaign.campaignId)"
                                                readonly
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                        <div
                                            class="whitespace-normal py-0 pr-4 text-sm font-semibold">
                                            <BackendErrors
                                                :errorField="`value${campaign.campaignId}`"></BackendErrors>
                                        </div>
                                    </td>


                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <input
                                            :value="campaign.discountType[0].toUpperCase() + campaign.discountType.slice(1)"
                                            type="text"
                                            @click="$emit('editCampaign', campaign.campaignId)"
                                            readonly
                                            placeholder="499.99"
                                            autocomplete="off"
                                            class="primaryInput"/>
                                        <div
                                            class="whitespace-normal py-0 pr-4 text-sm font-semibold">
                                            <BackendErrors
                                                :errorField="`type${campaign.campaignId}`"></BackendErrors>
                                        </div>
                                    </td>


                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <input
                                            :value="campaign.fromDate"
                                            type="date"
                                            @click="$emit('editCampaign', campaign.campaignId)"
                                            readonly
                                            placeholder="499.99"
                                            autocomplete="off"
                                            class="primaryInput"/>
                                        <div
                                            class="whitespace-normal py-0 pr-4 text-sm font-semibold">
                                            <BackendErrors
                                                :errorField="`from_date${campaign.campaignId}`"></BackendErrors>
                                        </div>
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <input
                                            :value="campaign.toDate"
                                            type="date"
                                            @click="$emit('editCampaign', campaign.campaignId)"
                                            readonly
                                            placeholder="499.99"
                                            autocomplete="off"
                                            class="primaryInput"/>
                                        <div
                                            class="whitespace-normal py-0 pr-4 text-sm font-semibold">
                                            <BackendErrors
                                                :errorField="`to_date${campaign.campaignId}`"></BackendErrors>
                                        </div>
                                    </td>

                                    <td class="whitespace-nowrap py-4 text-sm font-medium min-w-[6rem] px-6 align-top text-right">
                                        <button
                                            type="button"
                                            @click="$emit('editCampaign', campaign.campaignId)"
                                            class="onlyIconButton focusWithBackground">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 class="h-5 w-5"
                                                 fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke="currentColor"
                                                 stroke-width="2">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                            </svg>
                                        </button>
                                    </td>

                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-800 align-top">
                                        <button
                                            @click="$emit('deleteCampaign', campaign.campaignId)"
                                            class="onlyIconButton errorFocusWithErrorBackground"
                                            type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke-width="2"
                                                 stroke="currentColor"
                                                 class="w-5 h-5 cursor-pointer">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                        </button>
                                    </td>

                                </tr>
                                </tbody>
                            </TransitionGroup>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue';
import BackendErrors from "../../errors/BackendErrors";

// store
const store = useStore();

// campaigns updated after edit or delete
const updatedCampaigns = ref();
// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});

// get backend validation errors
const errors = computed(() => {
    return store.getters['user/getBackendValidationErrors']
});

// get campaigns
const campaigns = computed(() => {
    return store.getters['createProduct/getDiscounts']
});
// get variant type
const getVariantType = computed(() => {
    return store.getters['createProduct/getVariantType']
});

// get single variant
const getSingleVariant = computed(() => {
    return store.getters['createProduct/getSingleVariant']
});
//
</script>

<style scoped>

</style>
