<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box">
                <div class="mb-8">
                    <div class="flex items-center gap-2">
                        <h3 class="tertiaryHeaderWithout-pm">
                            Product Category
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
                    <p class="primaryParagraph">
                        Choose product categories.
                    </p>
                </div>
                <TreeView :categories="categories"></TreeView>
            </div>
        </div>
    </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, ref} from "vue";
import {ChevronRightIcon, ChevronDownIcon} from '@heroicons/vue/solid'
import TreeView from "../../overview-and-actions/TreeView";
import {onMounted} from "vue";
import Popper from "vue3-popper";


// values
const store = useStore();
const isPending = ref(false);

// categories
// const categories = computed(() => {
//     return store.getters['product/getProductsCategories']
// });

// test - after end test use above
const categories = computed(() => {
    return store.getters['product/getTestCategoriesData']
});
// test - after end test use above
</script>
