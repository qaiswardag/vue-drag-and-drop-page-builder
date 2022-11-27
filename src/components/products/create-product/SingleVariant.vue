<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">

                <div class="hidden-input-fields">
                    <input
                        v-model="hiddenInputProductType"
                        name="product_type"
                        hidden/>
                    <div v-if="selectedProductVariant === 'singleProduct'">
                        <input
                            v-model="product.productsWeight"
                            name="product_weight"
                            hidden/>
                        <input
                            v-model="product.material"
                            name="product_material"
                            hidden/>
                        <input
                            v-model="product.height"
                            name="product_height"
                            hidden/>
                        <input
                            v-model="product.width"
                            name="product_width"
                            hidden/>
                        <input
                            v-model="product.length"
                            name="product_length"
                            hidden/>
                        <input
                            v-model="product.midCode"
                            name="product_mid_code"
                            hidden/>
                        <input
                            v-model="product.hsCode"
                            name="product_hs_code"
                            hidden/>
                        <input
                            v-model="product.countryOfOrigin"
                            name="country_of_origin"
                            hidden/>
                    </div>
                </div>

                <!--single product start-->
                <div v-if="selectedProductVariant === 'singleProduct'">
                    <div class="grid sm:grid-cols-2 sm:gap-2 gap:4">
                        <div class="mb-8">
                            <div class="flex items-center gap-2">
                                <h3 class="tertiaryHeaderWithout-pm">Price & Inventory</h3>
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
                                                distinctio fuga, libero natus nisi quam reiciendis repudiandae totam
                                                veniam?
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
                            <p class="primaryParagraph">Enter additional product details.</p>
                        </div>
                        <div class="flex justify-end items-center gap-4">
                            <div class="flex items-center self-start">
                                <input
                                    v-model="selectedProductVariant"
                                    value="singleProduct"
                                    id="singleProduct"
                                    type="radio"
                                    class="myRadio">
                                <label
                                    for="singleProduct"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Single
                                </label>
                            </div>
                            <div class="flex items-center self-start">
                                <input v-model="selectedProductVariant"
                                       value="multipleProduct"
                                       id="multipleProduct"
                                       type="radio"
                                       class="myRadio">
                                <label
                                    for="multipleProduct"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Multiple
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2">
                        <div class="flex items-center gap-4">
                            <button
                                type="button"
                                @click="editSingleVariant"
                                class="onlyIconButton focusWithBackground">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="h-6 w-6"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <BackendErrors errorField="product_material"></BackendErrors>
                            <BackendErrors errorField="product_mid_code"></BackendErrors>
                            <BackendErrors errorField="product_hs_code"></BackendErrors>
                            <BackendErrors errorField="country_of_origin"></BackendErrors>
                            <BackendErrors errorField="product_weight"></BackendErrors>
                            <BackendErrors errorField="product_length"></BackendErrors>
                            <BackendErrors errorField="product_height"></BackendErrors>
                            <BackendErrors errorField="product_width"></BackendErrors>
                        </div>
                    </div>

                    <div class="flex justify-start items-start primary-gap">
                        <div class="w-full">
                            <div class="labelInputErrorDiv">
                                <label for="product_price"
                                       class="primaryLabel">Price
                                </label>
                                <input
                                    v-model="product.productPrice"
                                    type="text"
                                    name="product_price"
                                    id="product_price"
                                    placeholder="00.00"
                                    autocomplete="off"
                                    class="primaryInput"/>
                                <BackendErrors errorField="product_price"></BackendErrors>
                            </div>

                        </div>
                        <div class="w-full">
                            <div class="labelInputErrorDiv">
                                <label for="product_sku"
                                       class="primaryLabel">SKU (optional)
                                </label>
                                <input
                                    v-model="product.productSku"
                                    type="text"
                                    name="product_sku"
                                    id="product_sku"
                                    placeholder="SKU (optional)"
                                    autocomplete="off"
                                    class="primaryInput"/>
                                <BackendErrors errorField="product_sku"></BackendErrors>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-start items-start primary-gap">
                        <div class="w-full h-full">
                            <div class="labelInputErrorDiv">

                                <div v-if="getAutoStock === true">
                                    <label for="quantity_in_stock"
                                           class="primaryLabel">
                                        Quantity in stock
                                    </label>
                                    <input
                                        v-model="product.quantityInStock"
                                        type="text"
                                        name="quantity_in_stock"
                                        id="quantity_in_stock"
                                        placeholder="Quantity in stock"
                                        autocomplete="off"
                                        class="primaryInput"/>
                                    <BackendErrors errorField="quantity_in_stock"></BackendErrors>
                                </div>


                                <div v-if="getAutoStock === false"
                                     class="self-center justify-self-center h-full">
                                    <label for="quantity_in_stock"
                                           class="primaryLabel">Product in stock
                                    </label>
                                    <div class="flex justify-left items-center gap-6 mt-4">
                                        <SwitchGroup as="div" class="flex items-center">
                                            <Switch
                                                v-model="product.quantityInStock"
                                                :name="product.quantityInStock ? 'quantity_in_stock' : 'quantity_in_stock'"
                                                :class="[product.quantityInStock ? 'bg-emerald-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-68 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500']">
                                                <span class="sr-only">Use setting</span>
                                                <span
                                                    :class="[product.quantityInStock ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']">
      <span
          :class="[product.quantityInStock ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>
      <span
          :class="[product.quantityInStock ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity']"
          aria-hidden="true">
        <svg class="h-3 w-3 text-emerald-600" fill="currentColor" viewBox="0 0 12 12">
          <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
        </svg>
      </span>
    </span>
                                            </Switch>
                                            <SwitchLabel as="span" class="ml-3">
                                                <span class="text-sm font-medium text-gray-900">In stock? </span>
                                            </SwitchLabel>
                                        </SwitchGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full">
                            <div class="labelInputErrorDiv">
                                <label for="product_barcode"
                                       class="primaryLabel">Barcode (optional)
                                </label>
                                <input
                                    v-model="product.productsBarcode"
                                    type="text"
                                    name="product_barcode"
                                    id="product_barcode"
                                    placeholder="Barcode (optional)"
                                    autocomplete="off"
                                    class="primaryInput"/>
                                <BackendErrors errorField="product_barcode"></BackendErrors>
                            </div>
                        </div>
                    </div>
                </div>
                <!--single product end-->


                <!--multiple product start-->
                <div v-if="selectedProductVariant === 'multipleProduct'">
                    <div class="grid sm:grid-cols-2 sm:gap-2">
                        <div class="mb-8">
                            <div class="flex items-center gap-2">
                                <h3 class="tertiaryHeaderWithout-pm">Multiple variant</h3>
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
                                                distinctio fuga, libero natus nisi quam reiciendis repudiandae totam
                                                veniam?
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
                            <p class="primaryParagraph">Add variations of this product. Offer your customers different
                                options for price, color, style, size, shape, etc.
                            </p>
                        </div>
                        <div class="flex justify-end items-center gap-4">
                            <div class="flex items-center self-start">
                                <input
                                    v-model="selectedProductVariant"
                                    value="singleProduct"
                                    id="singleProduct"
                                    type="radio"
                                    class="myRadio">
                                <label
                                    for="singleProduct"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Single
                                </label>
                            </div>
                            <div class="flex items-center self-start">
                                <input v-model="selectedProductVariant"
                                       value="multipleProduct"
                                       id="multipleProduct"
                                       type="radio"
                                       class="myRadio">
                                <label
                                    for="multipleProduct"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Multiple
                                </label>
                            </div>
                        </div>
                    </div>

                    <MultipleVariants></MultipleVariants>
                </div>
                <!--multiple product end-->

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
        @thirdModalButtonFunction="thirdModalButtonFunction"
        @toggleModal="openModal = !openModal">

        <main>
            <div>
                <div>
                    <div class="section-form-containerModal">
                        <div class="section-form-boxModal">

                            <div class="inputsGroup">
                                <div class="flex items-center gap-2">
                                    <h3 class="tertiaryHeaderWithout-pm">Customs details</h3>
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
                                                    distinctio fuga, libero natus nisi quam reiciendis repudiandae totam
                                                    veniam?
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
                                <div class="flex justify-start items-start primary-gap">
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_material"
                                                   class="primaryLabel">Material
                                            </label>
                                            <input
                                                v-model="product.material"
                                                type="text"
                                                id="product_material"
                                                placeholder="Cotton"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_material"></BackendErrors>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_mid_code"
                                                   class="primaryLabel">Mid Code
                                            </label>
                                            <input
                                                v-model="product.midCode"
                                                type="text"
                                                id="product_mid_code"
                                                placeholder="Mid Code"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_mid_code"></BackendErrors>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-start items-start primary-gap">
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_hs_code"
                                                   class="primaryLabel">HS Code
                                            </label>
                                            <input
                                                v-model="product.hsCode"
                                                type="text"
                                                id="product_hs_code"
                                                placeholder="HS Code"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_hs_code"></BackendErrors>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="my-select"
                                                   class="primaryLabel">
                                                Country Of origin
                                            </label>
                                            <v-select
                                                id="my-select"
                                                v-model="product.countryOfOrigin"
                                                :options="COUNTRY_LIST"
                                            ></v-select>
                                            <BackendErrors errorField="country_of_origin"></BackendErrors>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="inputsGroup">
                                <div class="flex items-center gap-2">
                                    <h3 class="tertiaryHeaderWithout-pm">Dimensions</h3>
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
                                                    distinctio fuga, libero natus nisi quam reiciendis repudiandae totam
                                                    veniam?
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

                                <div class="flex justify-start items-start primary-gap">
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_weight"
                                                   class="primaryLabel">Weight (in grams)
                                            </label>
                                            <input
                                                v-model="product.productsWeight"
                                                type="text"
                                                id="product_weight"
                                                placeholder="1000"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_weight"></BackendErrors>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_length"
                                                   class="primaryLabel">Length (in millimeters)
                                            </label>
                                            <input
                                                v-model="product.length"
                                                type="text"
                                                id="product_length"
                                                placeholder="100"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_length"></BackendErrors>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-start items-start primary-gap">
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_height"
                                                   class="primaryLabel">Height (in millimeters)
                                            </label>
                                            <input
                                                v-model="product.height"
                                                type="text"
                                                id="product_height"
                                                placeholder="100"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_height"></BackendErrors>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <div class="labelInputErrorDiv">
                                            <label for="product_width"
                                                   class="primaryLabel">Width (in millimeters)
                                            </label>
                                            <input
                                                v-model="product.width"
                                                type="text"
                                                id="product_width"
                                                placeholder="100"
                                                autocomplete="off"
                                                class="primaryInput"/>
                                            <BackendErrors errorField="product_width"></BackendErrors>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    </DynamicModal>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted, watch, watchEffect} from "vue";
import {Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions} from '@headlessui/vue'
import {CheckIcon, ChevronDownIcon} from '@heroicons/vue/solid'
import createProduct from "../../../store/modules/create-product";
import MultipleVariants from './MultipleVariants'
import BackendErrors from "../../errors/BackendErrors";
import DynamicModal from "../../modal/DynamicModal";
import uniqid from "uniqid";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {COUNTRY_LIST} from '../../../../../config/countries.js'
import {Switch, SwitchGroup, SwitchLabel} from '@headlessui/vue'
import Popper from "vue3-popper";


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

// store
const store = useStore();
// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});

// hidden input field for product type
const hiddenInputProductType = ref(null);

// product details for single variant
const product = ref(
    {
        productPrice: null,
        productSku: null,
        quantityInStock: null,
        productsBarcode: null,

        // add in edit modal
        productsWeight: null,
        material: null,
        height: null,
        width: null,
        length: null,
        midCode: null,
        hsCode: null,
        countryOfOrigin: null
    },
);


// selected product variant type
const selectedProductVariant = ref('singleProduct');

// watch
watch(selectedProductVariant, (selectedVariantType) => {
    // single variant type
    if (selectedVariantType === 'singleProduct') {
        hiddenInputProductType.value = 0;
    }
    // multiple variant type
    if (selectedVariantType === 'multipleProduct') {
        hiddenInputProductType.value = 1
    }
}, {immediate: true});

// set product variants
store.commit('createProduct/setSingleVariant', product);
// set product variant type. single variant or multiple variants
store.commit('createProduct/setVariantType', selectedProductVariant);


// edit single variant
const editSingleVariant = function () {
    // open modal to true
    openModal.value = true

    // set modal standards
    typeModal.value = 'default';
    gridColumnModal.value = 2;
    titleModal.value = 'Edit variant';
    descriptionModal.value = 'Add general information, country of origin, weight & dimensions to the product.';
    firstButtonModal.value = null;
    secondButtonModal.value = 'Reset';
    thirdButtonModal.value = 'Save';


    // handle click
    firstModalButtonFunction.value = function () {
        // close model
        openModal.value = false
    };

    // handle click
    secondModalButtonFunction.value = function () {
        // reset input fields
        product.value.productsWeight = null;
        product.value.material = null;
        product.value.height = null;
        product.value.width = null;
        product.value.length = null;
        product.value.midCode = null;
        product.value.hsCode = null;
        product.value.countryOfOrigin = null;
        // close model
        // openModal.value = false
    };
    // handle click
    thirdModalButtonFunction.value = function () {
        // close model
        openModal.value = false
    };
// end modal
};

const getProductDetails = computed(() => {
    return store.getters['createProduct/getProductDetails']
});

const getAutoStock = computed(() => {
    return store.getters['createProduct/getAutoStock']
});

// set old value
onMounted(() => {
    // price & inventory
    product.value.productPrice = oldValues.value.product_price;
    product.value.productSku = oldValues.value.product_sku;
    product.value.productsBarcode = oldValues.value.product_barcode;

    // edit modal
    product.value.productsWeight = oldValues.value.product_weight;
    product.value.material = oldValues.value.product_material;
    product.value.height = oldValues.value.product_height;
    product.value.width = oldValues.value.product_width;
    product.value.length = oldValues.value.product_length;
    product.value.midCode = oldValues.value.product_mid_code;
    product.value.hsCode = oldValues.value.product_hs_code;
    product.value.countryOfOrigin = oldValues.value.country_of_origin;


    // old value & logic for quantity in stock based on auto stock
    // watch for changes
    watch(getAutoStock, (getAutoStockUpdated) => {
        //
        // old value for quantity in stock based on if auto stock is false
        if (oldValues.value.product_type === '0' && getAutoStockUpdated === true) {
            product.value.quantityInStock = oldValues.value.quantity_in_stock;
        }
        // old value & logic for quantity in stock based on if auto stock is false
        if (getAutoStockUpdated === false && (product.value.quantityInStock !== true || product.value.quantityInStock === false)) {
            product.value.quantityInStock = ""
        }
        // end watch
    });

    // // old value & logic for quantity in stock based on if auto stock is false
    if (oldValues.value.quantity_in_stock === 'on') {
        product.value.quantityInStock = true;
    }
    //

    // old value for product type single
    if (oldValues.value.product_type === '0') {
        selectedProductVariant.value = 'singleProduct';
    }
    // old value for product type multiple
    if (oldValues.value.product_type === '1') {
        selectedProductVariant.value = 'multipleProduct';
    }
})
</script>


<style scoped>
/* vue slected css - start*/
>>> {
    /* borders */
    --vs-border-color: #eeeeee;
    --vs-border-width: 0;
    --vs-border-style: solid;
    --vs-border-radius: 4px;

    /* controls */
    --vs-controls-color: #666;
    --vs-border-color: #eee;


    /* dropdown */
    --vs-dropdown-bg: #fff;
    --vs-dropdown-option-color: #000;

    /* selected */
    --vs-selected-color: #000;

    /* hover*/
    --vs-dropdown-option--active-bg: #10b981;
    --vs-dropdown-option--active-color: #fff;
}

/* vue slected css - end*/
</style>
