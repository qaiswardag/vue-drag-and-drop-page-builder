<template>
    <div class="section-form-main">
        <div class="section-form-container">
            <div class="section-form-box-sidebar">
                <div class="mb-8">
                    <div class="flex items-center gap-2">
                        <h3 class="tertiaryHeaderWithout-pm">Product tags
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
                    <p class="primaryParagraph">Add product tags.
                    </p>
                </div>

                <input
                    name="tags"
                    v-model="tagsEntered"
                    hidden>

                <div class="flex flex-row flex-wrap gap-2 mt-2 mb-4">
                    <TransitionGroup name="tags">
                        <div v-for="(tag, index) in tags" :key="tag">
                            <div
                                class="flex justify-center items-center gap-2 inline-block bg-emerald-500 text-white font-semibold hover:bg-emerald-600 text-sm px-3 py-2 cursor-pointer rounded-2xl hover:bg-red-600"
                                :data-tag="tag"
                                @click="deleteTag">
                                <p :data-tag="tag">
                                    {{ tag }}
                                    <span :data-tag="tag">×</span>
                                </p>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>

                <div class="flex">
                    <div class="mt-1 relative flex items-center w-full">
                        <input
                            v-model="vueTag"
                            type="text"
                            class="primaryInput"
                            placeholder="Enter tags.."
                            @keydown.enter.tab.prevent="handleInput"
                            autocomplete="off">
                        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                            <kbd
                                class="inline-flex items-center border border-gray-200 rounded px-2 text-xs font-sans font-medium text-gray-400">
                                ⏎
                            </kbd>
                        </div>
                    </div>
                </div>
                <BackendErrors errorField="tags"></BackendErrors>

                <div v-if="error">
                    <p class="primaryInputError">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useStore} from 'vuex'
import {computed, ref, onMounted, watch} from "vue";
import BackendErrors from "../../errors/BackendErrors";
import Popper from "vue3-popper";


// store
const store = useStore();
const error = ref(null);
const vueTag = ref('');
const tagsEntered = ref([]);

// get tags from store
const tags = computed(() => {
    return store.getters['createProduct/getProductTags'];
});

// set tags
store.commit('createProduct/setProductTags', tagsEntered);

// handle input
const handleInput = function () {
    error.value = null;
    // spaces are not allowed
    if (vueTag.value.includes(' ')) {
        error.value = 'Spaces not allowed.';
        return
    }
    // spaces are not allowed
    if (vueTag.value === '') {
        error.value = 'Tag can not be empty.';
        return
    }

    // check if tag already have been added
    if (tagsEntered.value.includes(vueTag.value)) {
        error.value = 'This tag have already been added.';
        return;
    }
    // removes all whitespace & add to tags entered
    if (!tagsEntered.value.includes(vueTag.value)) {
        tagsEntered.value.push(vueTag.value.trim());
    }
    // clear vue model for tag
    vueTag.value = '';
}

// delete tag
const deleteTag = function (e) {
    tagsEntered.value = tagsEntered.value.filter((tag) => {
        return tag !== e.target.getAttribute('data-tag');
    })
}

// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});

onMounted(() => {
    if (oldValues.value.tags) {
        tagsEntered.value = oldValues.value.tags.split(',');
    }
})


</script>


<style scoped>

</style>
