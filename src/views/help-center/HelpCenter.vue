<template>
    <div class="bg-warm-gray-50">
        <div class="relative mx-auto max-w-7xl pl-4 pr-8 sm:px-6 lg:px-8">
            <div class="mt-8">

                <form
                    action="/help/article"
                    method="GET"
                    ref="searchFormRef"
                    enctype="multipart/form-data">

                    <label for="default-search"
                           class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            v-model="searchField"
                            name="search_query"
                            type="text"
                            id="search_query"
                            class="searchInputWithButton"
                            autocomplete="off"
                            placeholder="Searching help articles...">
                        <button
                            @click.prevent="handleSearch"
                            type="submit"
                            class="text-white absolute right-2.5 bottom-2.5 bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-100 font-medium rounded-lg text-sm px-4 py-2">
                            Search
                        </button>
                    </div>
                    <BackendErrors errorField="search_query"></BackendErrors>

                    <ul role="list"
                        class="flex flex-wrap justify-start items-center primary-gap my-4">
                        <a :href="`/help/article?category=${category.title}&search_query=${searchField}`"
                           class="primaryParagraph text-center text-white font-bold cursor-pointer py-2 px-4 rounded-xl bg-gray-600 hover:bg-emerald-500"
                           v-for="category in categories" :key="category.id">
                            {{ category.title }}
                        </a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                             stroke="currentColor" class="w-4 h-4 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </ul>


                </form>
            </div>

            <!-- FAQ -->
            <div class="bg-warm-gray-50">
                <div class="mx-auto max-w-md py-24 px-4 sm:max-w-3xl sm:py-32 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div class="lg:grid lg:grid-cols-3 lg:gap-8">
                        <div>
                            <h2 class="secondaryHeader">
                                Frequently asked questions
                            </h2>
                        </div>
                        <div class="mt-12 lg:col-span-2 lg:mt-0">
                            <dl class="space-y-12">
                                <div>
                                    <dt class="text-lg font-medium text-warm-gray-900">How do you make holy water?</dt>
                                    <dd class="mt-2 text-base text-warm-gray-500">You boil the hell out of it. Lorem
                                        ipsum dolor
                                        sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <h2 class="secondaryHeader mt-8 mb-8 text-center">
                    Latest articles
                </h2>
                <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <li class="pt-8 pb-12 pl-4 pr-2 border border-gray-400 rounded-md bg-white"
                        v-for="article in articles.data" :key="article.id">
                        <h3 class="tertiaryHeader">
                            {{ article.headline }}
                        </h3>
                        <p class="primaryParagraph mt-8">
                            {{ article.description }}
                        </p>

                        <a href="#" class="bg-gray-600 hover:bg-emerald-500 rounded-xl mt-6 inline-block">
                        <span class="primaryParagraph text-xs font-semibold text-white flex items-center py-2 px-4">
                            {{ article.help_center_category.title }}
                        </span>
                        </a>
                    </li>
                </ul>
            </div>


        </div>
    </div>
</template>


<script setup>
import {computed, onMounted, ref} from "vue";
import {useStore} from 'vuex'
import BackendErrors from "../../components/errors/BackendErrors";

// store
const store = useStore();

// props
const props = defineProps({
    articles: {
        required: true
    },
    categories: {
        required: true
    },
})
// search form ref
const searchFormRef = ref(null)
// csrf
const csrf = ref(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
//
const errors = computed(() => {
    return store.getters['user/getBackendValidationErrors'];
});
//
// get backend old values
const oldValues = computed(() => {
    return store.getters['user/getBackendOldValues']
});
//
// search field
const searchField = ref("")
//
const handleSearch = function () {
    console.log('fn ran')
    // submit
    searchFormRef.value.submit()

}

// on mounted
onMounted(() => {
    if (oldValues.value && oldValues.value.search_query) {
        searchField.value = oldValues.value.search_query
    }
})
</script>
