<template>
    <div>
        <div v-if="isPending">
            <Spinner></Spinner>
        </div>
        <!-- form -->
        <form @submit="submitForm" method="post" action="/products/create" class="myPrimaryForm">
            <input type="hidden" name="_token" :value="csrf">
            <OverviewAndAction>
                <template v-slot:breadcrumb>
                    <nav class="rounded-md w-full">
                        <ol class="list-reset flex text-xs">
                            <li><a href="#" class="text-gray-500">Products</a></li>
                            <li><span class="text-gray-500 mx-2">/</span></li>
                            <li class="text-gray-500">New product</li>
                        </ol>
                    </nav>
                </template>
                <template v-slot:header>
                    New product
                </template>
                <template v-slot:para>
                    Fill all necessary fields. Offer something unique & enter the market with a good product
                    name.
                </template>

                <template v-slot:content>
                    <SubmitElement buttonText="Create"></SubmitElement>
                </template>
            </OverviewAndAction>


            <div class="grid xl:grid-cols-12 grid-cols-1 primary-gap">
                <div class="xl:col-span-9">
                    <div class="space-y-8 divide-y divide-gray-200">
                        <div class="grid grid-cols-1 primary-gap">
                            <ProductInformation testooo="hellooooooo qais"></ProductInformation>
                            <Media></Media>
                            <SingleVariant></SingleVariant>
                            <Discounts></Discounts>
                            <Category></Category>
                            <Meta></Meta>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-3">
                    <div class="grid primary-gap">
                        <Publish></Publish>
                        <AutoStock></AutoStock>
                        <Tags></Tags>
                    </div>
                </div>
            </div>

            <div class="mb-16 mt-10 pb-6 border-b-2 border-emerald-500">
                <SubmitElement buttonText="Create"></SubmitElement>
            </div>
        </form>
    </div>

    <div class="max-w-3-xl mx-auto py-6">
        <ul role="list" class="p-4 my-8 space-y-3">
            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Product details: {{ getProductDetails }}</p>
                        </div>
                    </div>
                </button>
            </li>
            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Product published: {{ getIsPublished }}</p>
                        </div>
                    </div>
                </button>
            </li>
            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Product meta details: {{ getProductMetaDetails }}</p>
                        </div>
                    </div>
                </button>
            </li>
            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Coosen tags: {{ getTags }}</p>
                        </div>
                    </div>
                </button>
            </li>

            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Get selected categories: {{ getSelectedCategories }}</p>
                        </div>
                    </div>
                </button>
            </li>
            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Product single variant: {{ getSingleVariant }}</p>
                        </div>
                    </div>
                </button>
            </li>

            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Variant type: {{ getVariantType }}</p>
                        </div>
                    </div>
                </button>
            </li>
            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Product auto stock: {{ getAutoStock }}</p>
                        </div>
                    </div>
                </button>
            </li>

            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Product discount: {{ getDiscount }}</p>
                        </div>
                    </div>
                </button>
            </li>

            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Get discounts: {{ getDiscounts }}</p>
                        </div>
                    </div>
                </button>
            </li>


            <li class="sm:rounded border relative group bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600">
                <button class="w-full py-4 px-2 text-left">
                    <div class="flex justify-between space-x-3">
                        <div class="min-w-0 flex-1">
                            <p>Get options with values: {{ getOptionsWithValues }}</p>
                        </div>
                    </div>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import OverviewAndAction from "../../components/overview-and-actions/OverviewAndAction";
import SubmitElement from "../../components/form/SubmitElement";
import Spinner from '../../components/loaders/Spinner'
import ProductInformation from "../../components/products/create-product/ProductInformation";
import Media from "../../components/products/create-product/Media";
import Category from "../../components/products/create-product/Category";
import Meta from "../../components/products/create-product/Meta";
import Publish from "../../components/products/create-product/Publish";
import AutoStock from "../../components/products/create-product/AutoStock";
import Tags from "../../components/products/create-product/Tags";
import SingleVariant from "../../components/products/create-product/SingleVariant";
import Discounts from "../../components/products/create-product/Discounts";
import {useStore} from 'vuex'

// store
const store = useStore();

const isPending = ref(false);

const product = ref(
    {published: false}
);

// csrf
const csrf = ref(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))


// submit form
const submitForm = function (e) {

}

const errors = computed(() => {
    return store.getters['user/getBackendValidationErrors'];
});


// DELETE BELOW AFTER TEST
// DELETE BELOW AFTER TEST
// DELETE BELOW AFTER TEST
// DELETE BELOW AFTER TEST
// DELETE BELOW AFTER TEST
// GETTERS - FROM STORE — CREATE PRODUCT
const getProductDetails = computed(() => {
    return store.getters['createProduct/getProductDetails']
});

const getProductMetaDetails = computed(() => {
    return store.getters['createProduct/getProductMetaDetails']
});

const getIsPublished = computed(() => {
    return store.getters['createProduct/getIsPublished']
});

const getTags = computed(() => {
    return store.getters['createProduct/getProductTags']
});

const getSelectedCategories = computed(() => {
    return store.getters['createProduct/getSelectedCategories']
});

const getAutoStock = computed(() => {
    return store.getters['createProduct/getAutoStock']
});

const getSingleVariant = computed(() => {
    return store.getters['createProduct/getSingleVariant']
});

const getVariantType = computed(() => {
    return store.getters['createProduct/getVariantType']
});

const getDiscount = computed(() => {
    return store.getters['createProduct/getProductDiscount']
});


const getDiscounts = computed(() => {
    return store.getters['createProduct/getDiscounts']
});

const getOptionsWithValues = computed(() => {
    return store.getters['createProduct/getOptionsWithValues']
});
// DELETE ABOVE AFTER TEST
// DELETE ABOVE AFTER TEST
// DELETE ABOVE AFTER TEST
// DELETE ABOVE AFTER TEST
// DELETE ABOVE AFTER TEST


</script>

