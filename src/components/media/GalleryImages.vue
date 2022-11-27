<template>
    <div>
        <div class="mt-3 sm:mt-2">
            <div class="sm:hidden">
                <label for="tabs" class="sr-only">Select a tab</label>
                <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                <select id="tabs" name="tabs"
                        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm">
                    <option selected="">Recently Viewed</option>
                    <option>Recently Added</option>
                    <option>Favorited</option>
                </select>
            </div>
            <div>
                <div class="flex items-center border-b border-gray-200">
                    <nav class="-mb-px flex flex-1 space-x-6 xl:space-x-8" aria-label="Tabs">
                        <a v-for="tab in tabs" :key="tab.id" :href="tab.href"
                           :aria-current="tab.current ? 'page' : undefined"
                           :class="[tab.current ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']">{{
                                tab.name
                            }}</a>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Gallery -->
        <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
            <ul role="list"
                class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <li v-for="file in images" :key="file.name" class="relative">
                    <div
                        class="rounded-lg bg-gray-100']">
                        <img :src="`./storage/images/site-${siteId}/${file.name}`" :alt="file.name"
                             class="lg:h-48 xl:w-full h-48 w-full rounded-md object-cover">
                    </div>
                    <div
                        class="mt-1 py-2 px-2 pointer-events-none block text-xs text-white bg-gray-800 break-words border border-gray-5 rounded-lg">
                        <p>
                            Name: {{ file.name }}
                        </p>
                        <p>
                            Size: {{ (file.size / 1000).toFixed(2) }} KB
                        </p>
                        <p>
                            Width: {{ file.width }}
                        </p>
                        <p>
                            Height: {{ file.height }}
                        </p>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {ref, computed} from 'vue'


// store
const store = useStore();

const images = computed(() => {
    return store.getters['media/getMedia']
})

const siteId = computed(() => {
    return store.getters['user/getSiteId']
})

const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
]

</script>

