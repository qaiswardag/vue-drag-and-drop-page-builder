<template>
    <div>
        <UploadFiles>
        </UploadFiles>

        <FilePondUploadFiles>
        </FilePondUploadFiles>

        <!-- Main content -->
        <div class="grid grid-cols-12 primary-gap overflow-hidden bg-white rounded-xl">
            <!-- main gallary overview -->
            <main class="flex-1 overflow-y-auto col-span-8">

                <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                    <div class="flex">
                        <h1 class="tertiaryHeader">
                            Photos
                        </h1>
                    </div>

                    <!-- Tabs -->
                    <GalleryImages>
                    </GalleryImages>
                </div>
            </main>

            <!-- details sidebar -->
            <aside class="overflow-y-auto border-l border-gray-200 bg-white p-8 col-span-4">
                <div class="space-y-6 pb-16">
                    <div>
                        <div class="aspect-h-7 block overflow-hidden rounded-lg">
                            <img :src="currentFile.source" alt="" class="object-cover"/>
                        </div>
                        <div class="mt-4 flex items-start justify-between">
                            <div>
                                <h2 class="text-lg font-medium text-gray-900"><span
                                    class="sr-only">Details for </span>{{ currentFile.name }}</h2>
                                <p class="text-sm font-medium text-gray-500">{{ currentFile.size }}</p>
                            </div>
                            <button type="button"
                                    class="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500">

                                <span class="sr-only">Favorite</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-900">Information</h3>
                        <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                            <div v-for="key in Object.keys(currentFile.information)" :key="key"
                                 class="flex justify-between py-3 text-sm font-medium">
                                <dt class="text-gray-500">{{ key }}</dt>
                                <dd class="whitespace-nowrap text-gray-900">{{ currentFile.information[key] }}</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="flex primary-gap">
                        <button type="button"
                                class="myPrimaryButton">
                            Download
                        </button>
                        <button type="button"
                                class="myPrimaryDeleteButton">
                            Delete
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import GalleryImages from '../../components/media/GalleryImages'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import FilePondUploadFiles from "../../components/media/FilePondUploadFiles"
import UploadFiles from "../../components/media/UploadFiles";
//
// store
const store = useStore();

// props
const props = defineProps({
    media: {
        required: true
    },
})

// set data
store.commit('media/setMedia', props.media.data)
//
//
//
//
// tabs
const tabs = [
    {name: 'Recently Viewed', href: '#', current: true},
    {name: 'Recently Added', href: '#', current: false},
    {name: 'Favorited', href: '#', current: false},
]

// current file
const currentFile = {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
        'https://images.unsplash.com/photo-1541779408-c355f91b42c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80',
    information: {
        Created: 'June 8, 2020',
        'Last modified': 'June 8, 2020',
        Dimensions: '4032 x 3024',
        Resolution: '72 x 72',
    },
}

// mobile menu
const mobileMenuOpen = ref(false)
//
</script>
