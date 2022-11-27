<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">
                <div class="mb-8">
                    <div class="flex items-center gap-2">
                        <h3 class="tertiaryHeaderWithout-pm">
                            Meta title & description
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
                </div>
                <div class="labelInputErrorDiv">
                    <label for="meta_title"
                           class="primaryLabel">Meta title (optional)
                    </label>
                    <input
                        v-model="productMeta.metaTitle"
                        type="text"
                        name="meta_title"
                        id="meta_title"
                        placeholder="Meta title"
                        autocomplete="off"
                        class="primaryInput"/>
                    <BackendErrors errorField="meta_title"></BackendErrors>
                </div>

                <div class="labelInputErrorDiv">
                    <label for="meta_description"
                           class="primaryLabel">Meta description (optional)
                    </label>
                    <textarea
                        v-model="productMeta.metaDescription"
                        cols="2"
                        rows="3"
                        id="meta_description"
                        name="meta_description"
                        placeholder="Meta description"
                        class="primaryTextArea">
                </textarea>
                    <BackendErrors errorField="meta_description"></BackendErrors>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted} from "vue";
import {PlusCircleIcon, MinusCircleIcon, ChevronUpIcon, ChevronDownIcon} from '@heroicons/vue/solid'
import BackendErrors from "../../errors/BackendErrors";
import Popper from "vue3-popper";


// store
const store = useStore();

const productMeta = ref(
    {
        metaTitle: '',
        metaDescription: '',
    }
);


// set product
store.commit('createProduct/setProductMetaDetails', productMeta)

// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});


onMounted(() => {
    if (oldValues.value.meta_title) {
        productMeta.value.metaTitle = oldValues.value.meta_title
    }

    if (oldValues.value.meta_description) {
        productMeta.value.metaDescription = oldValues.value.meta_description
    }
})

</script>

<style>
--popper-theme-background-color {

}
</style>
