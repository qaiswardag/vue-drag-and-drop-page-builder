<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">
                <div class="grid sm:grid-cols-2 sm:gap-2 gap:4">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="tertiaryHeaderWithout-pm">Product discount
                                <span
                                    class="optionalBig">(optional)
                                </span>
                            </h3>
                            <Popper
                                :hover="true"
                                placement="top"
                                :arrow="true">
                                <template #content>
                                    <div class="popperToolkitContent">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                            <a href='#' target="_blank" class="primaryLink">Visit our
                                                help
                                                center.
                                            </a>
                                        </p>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
                                            consequuntur
                                            distinctio fuga, libero natus nisi quam reiciendis repudiandae totam veniam?
                                        </p>
                                    </div>
                                </template>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         class="popperIconBig"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor"
                                         stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                            </Popper>
                        </div>
                        <p class="primaryParagraph">Create new product discount.</p>
                    </div>
                    <div>
                        <div class="flex sm:justify-end items-center gap-6 pb-4 mb-4">
                            <button
                                @click="addDiscount"
                                type="button"
                                class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                                <PlusSmIconOutline class="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div v-for="(campaign, index) in campaigns" :key="index">
                    <input
                        v-model="campaign.discountType"
                        :name="`campaigns[${index}][type]`"
                        type="text"
                        hidden/>
                    <input
                        v-model="campaign.discountValue"
                        :name="`campaigns[${index}][value]`"
                        type="text"
                        hidden/>

                    <input
                        v-model="campaign.fromDate"
                        :name="`campaigns[${index}][from_date]`"
                        type="date"
                        hidden/>

                    <input
                        v-model="campaign.toDate"
                        :name="`campaigns[${index}][to_date]`"
                        type="date"
                        hidden/>

                    <input
                        v-model="campaign.campaignId"
                        :name="`campaigns[${index}][front_end_id]`"
                        type="text"
                        hidden/>
                </div>
                <DiscountsList @deleteCampaign="deleteCampaign" @editCampaign="editCampaign"></DiscountsList>
            </div>
        </div>
    </div>


    <DynamicModal
        :type="typeModal"
        :id="idModal"
        :gridColumnAmount="gridColumnModal"
        :title="titleModal"
        :description="descriptionModal"
        :firstButtonText="firstButtonModal"
        :secondButtonText="secondButtonModal"
        :thirdButtonText="thirdButtonModal"
        :open="openModal"
        @firstModalButtonFunction="firstModalButtonFunction"
        @secondModalButtonFunction="secondModalButtonFunction"
        @thirdModalButtonFunction="thirdModalButtonFunction">

        <div v-if="namedSlotDiscount">
            <div v-if="false">
                <header>
                    <p class="mt-4 mb-12 text-center mt-2 text-sm text-gray-500 border-b border-gray-200">
                    </p>
                </header>
            </div>

            <main>
                <div>
                    <div>
                        <div class="section-form-containerModal">
                            <div class="section-form-boxModal">
                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">Date</h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="grid md:grid-cols-2 justify-left item-baseline md:gap-4">
                                        <div class="labelInputErrorDiv">
                                            <label for="from_date"
                                                   class="primaryLabel">Product discount from date
                                            </label>
                                            <input
                                                v-model="singleDiscount.fromDate"
                                                type="date"
                                                id="from_date"
                                                placeholder="Product discount from date"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>

                                        <div class="labelInputErrorDiv">
                                            <label for="to_date"
                                                   class="primaryLabel">Product discount to date
                                            </label>
                                            <input
                                                v-model="singleDiscount.toDate"
                                                type="date"
                                                id="to_date"
                                                placeholder="Product discount to date"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                        </div>
                                    </div>
                                </div>

                                <div class="inputsGroup">
                                    <div class="flex items-center gap-2">
                                        <h3 class="tertiaryHeaderWithout-pm">Discount</h3>
                                        <Popper
                                            :hover="true"
                                            placement="top"
                                            :arrow="true">
                                            <template #content>
                                                <div class="popperToolkitContent">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        <a href='#' target="_blank" class="primaryLink">Visit our
                                                            help
                                                            center.
                                                        </a>
                                                    </p>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                        Adipisci consequuntur
                                                        distinctio fuga, libero natus nisi quam reiciendis repudiandae
                                                        totam veniam?
                                                    </p>
                                                </div>
                                            </template>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     class="popperIconBig"
                                                     fill="none"
                                                     viewBox="0 0 24 24"
                                                     stroke="currentColor"
                                                     stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </Popper>
                                    </div>
                                    <div class="grid md:grid-cols-2 justify-left item-baseline md:gap-4">
                                        <div v-if="singleDiscount.discountType === 'fixed'">
                                            <div class="labelInputErrorDiv">
                                                <label for="value_fixed"
                                                       class="primaryLabel">Fixed discount
                                                </label>
                                                <div class="flex">
                                                    <input
                                                        v-model="singleDiscount.discountValue"
                                                        type="number"
                                                        id="value_fixed"
                                                        placeholder="Enter discount in fixed amount"
                                                        autocomplete="off"
                                                        class="primaryInputWithRightIcon"/>
                                                    <span class="iconForRightInput">
                                                    Fixed
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="singleDiscount.discountType === 'percentage'">
                                            <div class="labelInputErrorDiv">
                                                <label for="value_percentage"
                                                       class="primaryLabel">Discount percentage %
                                                </label>
                                                <div class="flex">
                                                    <input
                                                        v-model="singleDiscount.discountValue"
                                                        type="number"
                                                        id="value_percentage"
                                                        placeholder="Enter discount in percentage %"
                                                        autocomplete="off"
                                                        class="primaryInputWithRightIcon"/>
                                                    <span class="iconForRightInput">
                                <svg class="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="5" x2="5" y2="19"/>  <circle
                                    cx="6.5" cy="6.5" r="2.5"/>  <circle cx="17.5" cy="17.5" r="2.5"/></svg>
                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <Listbox as="div" v-model="singleDiscount.discountType">
                                            <div class="labelInputErrorDiv">
                                                <ListboxLabel class="primaryLabel"> Discount type</ListboxLabel>
                                                <div class="mt-1 relative">
                                                    <ListboxButton
                                                        class="primaryInput text-left">
                                    <span class="block truncate">{{
                                            singleDiscount.discountType[0].toUpperCase() + singleDiscount.discountType.slice(1)
                                        }}</span>
                                                        <span
                                                            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
        </span>
                                                    </ListboxButton>

                                                    <transition leave-active-class="transition ease-in duration-100"
                                                                leave-from-class="opacity-100"
                                                                leave-to-class="opacity-0">
                                                        <ListboxOptions
                                                            class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-hidden focus:outline-none sm:text-sm">
                                                            <ListboxOption as="template"
                                                                           v-for="(discountType, index) in discountTypes"
                                                                           :key="index"
                                                                           :value="discountType"
                                                                           v-slot="{ active, selected }">
                                                                <li :class="[active ? 'text-white bg-emerald-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-8 pr-4']">
                                                <span
                                                    :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                                {{
                                                        discountType[0].toUpperCase() + discountType.slice(1)
                                                    }}
                                                </span>
                                                                    <span v-if="selected"
                                                                          :class="[active ? 'text-white' : 'text-emerald-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                                                </li>
                                                            </ListboxOption>
                                                        </ListboxOptions>
                                                    </transition>
                                                </div>
                                            </div>
                                        </Listbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </DynamicModal>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted, watch} from "vue";
import uniqid from 'uniqid';
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue';
import {ChevronDownIcon} from '@heroicons/vue/solid'
import DynamicModal from "../../modal/DynamicModal";
import BackendErrors from "../../errors/BackendErrors";
import DiscountsList from "./DiscountsList";
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid'
import {PlusSmIcon as PlusSmIconOutline} from '@heroicons/vue/outline'
import Popper from "vue3-popper";


// store
const store = useStore();
// emits
const emit = defineEmits(['deleteCampaign', 'editCampaign'])


// use dynamic model
const openModal = ref(false);
// modal content
const typeModal = ref('');
const idModal = ref(Number(null));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);

// discount types
const discountTypes = ref([
    'fixed',
    'percentage'
]);
// singleDiscount details
const singleDiscount = ref({}
);

//
//
// named slots for adding, editing and deleting campaigns
const namedSlotDiscount = ref(null);

// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});


// get single variant
const getSingleVariant = computed(() => {
    return store.getters['createProduct/getSingleVariant']
});
//
// set single campaign details
store.commit('createProduct/setProductDiscount', singleDiscount);

// campaigns added
const campaigns = ref([]);
//
// add campaign
const addDiscount = function () {
    // set single campaign to empty object
    singleDiscount.value = {
        discountType: 'fixed',
        discountValue: 0
    };

    // open modal to true
    openModal.value = true
    // set named slots for adding, editing and deleting campaigns
    namedSlotDiscount.value = true

    // set modal standards
    typeModal.value = 'default';
    gridColumnModal.value = 2;
    titleModal.value = 'Create new campaign';
    descriptionModal.value = 'Create a new campaign. Set campaign date from, date to, campaign discount or change campaign type.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Add campaign';

    // handle add campaign click
    firstModalButtonFunction.value = function () {
        // set named slots for adding, editing and deleting campaigns
        namedSlotDiscount.value = false
        // set single campaign to empty object
        singleDiscount.value = {};
        // close model
        openModal.value = false
    }
    //
    // handle add campaign click
    thirdModalButtonFunction.value = function () {
        // create unique id for campaign
        singleDiscount.value.campaignId = uniqid();

        // if discount value is 0 then set to null
        if (singleDiscount.value.discountValue === 0) {
            singleDiscount.value.discountValue = 0
        }

        // push discount into campaigns
        campaigns.value.push(singleDiscount.value);
        // set single campaign to empty object
        singleDiscount.value = {};

        // set named slots for adding, editing and deleting campaigns
        namedSlotDiscount.value = false
        // close model
        openModal.value = false

    }
// end modal
};
//
// edit campaign
const editCampaign = function (id) {
    // open modal to true
    openModal.value = true

    // set named slots for adding, editing and deleting campaigns
    namedSlotDiscount.value = true

    //
    // saved campaigns
    const savedDiscounts = ref([]);
    savedDiscounts.value = JSON.stringify(campaigns.value);
    savedDiscounts.value = JSON.parse(savedDiscounts.value);
    //
    // find campaign with id
    singleDiscount.value = savedDiscounts.value.find(campaign => {
        if (campaign.campaignId === id) {
            singleDiscount.value.discountType = campaign.discountType;
            return campaign.campaignId === id;
        }
    });

    // set modal standards
    typeModal.value = 'default';
    gridColumnModal.value = 2;
    titleModal.value = 'Edit discount';
    descriptionModal.value = 'Update discount value, from date, to date or change discount type.';
    firstButtonModal.value = 'Close';
    thirdButtonModal.value = 'Update';

    // handle edit campaign modal click
    firstModalButtonFunction.value = function () {
        // set single campaign to empty object
        singleDiscount.value = {};
        // set discount to percentage to false
        singleDiscount.value.discountType = 'fixed'
        // set named slots for adding, editing and deleting campaigns
        namedSlotDiscount.value = false
        // close model
        openModal.value = false
    };
    //
    // handle edit campaign modal click
    thirdModalButtonFunction.value = function () {
        // find the campaign with id
        savedDiscounts.value.find(campaign => {
            if (campaign.campaignId === id) {

                // if discount value is 0 then set to null
                if (singleDiscount.value.discountValue === 0) {
                    singleDiscount.value.discountValue = 0
                }

                // return the campaign with new values
                campaign = singleDiscount.value
            }
            ;
        });
        // set campaign to updated values
        campaigns.value = savedDiscounts.value
        //
        // set single campaign to empty object
        singleDiscount.value = {};

        // set named slots for adding, editing and deleting campaigns
        namedSlotDiscount.value = false
        // close model
        openModal.value = false

    }
// end modal
};
//
// delete campaign
const deleteCampaign = function (id) {
    // open modal to true
    openModal.value = true

    // set named slots for adding, editing and deleting campaigns
    namedSlotDiscount.value = false

    // set modal standards
    typeModal.value = 'delete';
    gridColumnModal.value = 2;
    titleModal.value = 'Are you sure you want to delete this discount?';
    descriptionModal.value = 'Are you sure you want to delete this product discount? The discount cannot be restored.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Delete';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // close modal
        openModal.value = false
    };
    //
    // handle add campaign
    thirdModalButtonFunction.value = function () {
        campaigns.value = campaigns.value.filter(campaign => {
            return campaign.campaignId !== id
        });
        // close modal
        openModal.value = false
    };
// end modal
};
//
// set campaigns
store.commit('createProduct/setDiscounts', campaigns);
//
//
//
// set backend old values for fields
onMounted(() => {
    // set backend old values
    if (oldValues.value.campaigns) {
        // for each on campaigns for old values
        oldValues.value.campaigns.forEach((campaign, index) => {
            singleDiscount.value.discountType = campaign.type;
            singleDiscount.value.discountValue = Number(campaign.value);
            singleDiscount.value.fromDate = campaign.from_date;
            singleDiscount.value.toDate = campaign.to_date;
            singleDiscount.value.campaignId = campaign.front_end_id;
            // push old discounts into campaigns
            campaigns.value.push(singleDiscount.value);
            // set single campaign to empty object
            singleDiscount.value = {};
        });
    }
    // end mounted
});
</script>
