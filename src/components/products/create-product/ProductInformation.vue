<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">
                <div class="mb-8">
                    <input
                        v-model="slugLock"
                        name="slug_lock"
                        hidden/>
                    <div class="flex items-center gap-2">
                        <h3 class="tertiaryHeaderWithout-pm">Product info</h3>
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
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consequuntur
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
                    <p class="primaryParagraph">Enter product details such as name and
                        description.</p>
                </div>
                <div class="labelInputErrorDiv">
                    <label for="name"
                           class="primaryLabel">Product name
                    </label>
                    <input
                        v-model="product.productName"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Product name"
                        autocomplete="off"
                        class="primaryInput"/>
                    <BackendErrors errorField="name"></BackendErrors>
                </div>

                <div class="labelInputErrorDiv">
                    <div v-if="slugLock">
                        <label for="product_slug"
                               class="primaryLabel">
                            Product slug
                        </label>
                        <div class="flex">
                            <div class="mt-1 relative flex items-center w-full">
                                <input
                                    v-model="product.productSlugLock"
                                    type="text"
                                    name="product_slug"
                                    id="product_slug"
                                    placeholder="Product slug"
                                    autocomplete="off"
                                    readonly
                                    class="primaryInput"/>
                                <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                    <kbd
                                        class="inline-flex items-center px-2 text-sm font-sans font-medium text-gray-400 cursor-pointer">
                                        <div v-if="slugLock">
                                            <svg
                                                @click="slugLock = false"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                class="h-5 w-5 text-red-600 cursor-pointer">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                            </svg>
                                        </div>
                                    </kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!slugLock">
                        <label for="product_slug"
                               class="primaryLabel ">
                            Product slug
                        </label>
                        <div class="flex">
                            <div class="mt-1 relative flex items-center w-full">
                                <input
                                    v-model="product.productSlugOpen"
                                    type="text"
                                    name="product_slug"
                                    id="product_slug"
                                    placeholder="Product slug"
                                    autocomplete="off"
                                    class="primaryInput"/>
                                <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                    <kbd
                                        class="inline-flex items-center px-2 text-sm font-sans font-medium text-gray-400 cursor-pointer">
                                        <div v-if="!slugLock">
                                            <svg
                                                @click="slugLock = true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                class="h-5 w-5 text-emerald-600 cursor-pointer">
                                                <path stroke-linecap="round"
                                                      stroke-linejoin="round"
                                                      d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                                            </svg>
                                        </div>
                                    </kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BackendErrors errorField="product_slug"></BackendErrors>
                </div>

                <div class="labelInputErrorDiv">
                    <label for="short_description"
                           class="primaryLabel">
                        Description - short (optional)
                    </label>
                    <QuillEditor
                        name="qais_wardag_short_description"
                        v-model:content="product.shortDescription"
                        :options="vueQuillOptionsShortDescription"
                        contentType="html"
                        class="rounded-b block w-full sm:text-sm font-medium text-black placeholder:font-normal placeholder:accent-gray-400 bg-gray-50 focus:bg-white py-3 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        id="short_description">
                    </QuillEditor>
                    <BackendErrors errorField="short_description"></BackendErrors>

                </div>

                <div class="labelInputErrorDiv">
                    <label for="long_description"
                           class="primaryLabel">
                        Description - long (optional)
                    </label>


                    <BackendErrors errorField="long_description"></BackendErrors>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted} from "vue";
import BackendErrors from "../../errors/BackendErrors";
import Popper from "vue3-popper";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


// store
const store = useStore();


// vue quill options
const vueQuillOptionsShortDescription = {
    modules: {
        toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline'],        // toggled buttons

            [{'list': 'ordered'}, {'list': 'bullet'}],

            [{'align': []}],

            ['clean'] // remove formatting button
        ]
    },
    theme: 'snow',
    placeholder: 'Description - short (optional)',
    readOnly: false,
}

// vue quill options
const vueQuillOptionsLongDescription = {
    modules: {
        toolbar: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            ['bold', 'italic', 'underline'],        // toggled buttons

            [{'list': 'ordered'}, {'list': 'bullet'}],

            [{'align': []}],

            ['clean'] // remove formatting button
        ]
    },
    theme: 'snow',
    placeholder: 'Description - long (optional)',
    readOnly: false,
}


// product details
const product = ref(
    {
        productName: '',
        productSlugLock: '',
        productSlugOpen: '',
        shortDescription: 'hello',
        longDescription: 'world',
    }
);


// product.productSlug
const slugLock = ref(true)
// product.productSlug
product.value.productSlugLock = computed(() => {
    return product.value.productName
})


// set product details
store.commit('createProduct/setProductDetails', product)

// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});

onMounted(() => {
    if (oldValues.value.product_slug) {
        product.value.productSlugOpen = oldValues.value.product_slug
    }
    product.value.productName = oldValues.value.name
    product.value.short_description = oldValues.value.short_description
    product.value.long_description = oldValues.value.long_description

    if (oldValues.value.slug_lock === "true") {
        slugLock.value = true
    }
    if (oldValues.value.slug_lock === "false") {
        slugLock.value = false
    }
})
</script>
