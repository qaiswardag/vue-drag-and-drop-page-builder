<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot :show="open" as="template" @after-leave="rawQuery = ''" appear>
        <Dialog as="div"
                class="relative z-10"
                @close="toggleSearchModal">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"/>
            </TransitionChild>

            <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
                                 enter-to="opacity-100 scale-100" leave="ease-in duration-200"
                                 leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                    <DialogPanel
                        class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                        <Combobox @update:modelValue="onSelect">
                            <div class="relative">
                                <SearchIcon class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                                            aria-hidden="true"/>
                                <ComboboxInput
                                    class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search..." @change="rawQuery = $event.target.value"/>
                            </div>

                            <ComboboxOptions v-if="filteredPages.length > 0 || filteredProducts.length > 0" static
                                             class="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2">
                                <li v-if="filteredPages.length > 0">
                                    <h2 class="text-xs font-semibold text-gray-900">Pages</h2>
                                    <ul class="-mx-4 mt-2 text-sm text-gray-700">
                                        <ComboboxOption v-for="page in filteredPages" :key="page.id"
                                                        :value="page" as="template" v-slot="{ active }">
                                            <li :class="['flex cursor-default select-none items-center px-4 py-2', active && 'bg-emerald-600 text-white']">
                                                <DocumentIcon
                                                    :class="['h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400']"
                                                    aria-hidden="true"/>
                                                <span class="ml-3 flex-auto truncate">{{ page.name }}</span>
                                            </li>
                                        </ComboboxOption>
                                    </ul>
                                </li>
                                <li v-if="filteredProducts.length > 0">
                                    <h2 class="text-xs font-semibold text-gray-900">Products</h2>
                                    <ul class="-mx-4 mt-2 text-sm text-gray-700">
                                        <ComboboxOption v-for="product in filteredProducts" :key="product.id"
                                                        :value="product"
                                                        as="template" v-slot="{ active }">
                                            <li :class="['flex cursor-default select-none items-center px-4 py-2', active && 'bg-emerald-600 text-white']">
                                                <img :src="product.imageUrl" alt=""
                                                     class="h-6 w-6 flex-none rounded-full object-cover"/>
                                                <span class="ml-3 flex-auto truncate">{{ product.name }}</span>
                                            </li>
                                        </ComboboxOption>
                                    </ul>
                                </li>
                            </ComboboxOptions>

                            <div v-if="rawQuery === '?'" class="py-14 px-6 text-center text-sm sm:px-14">
                                <SupportIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true"/>
                                <p class="mt-4 font-semibold text-gray-900">Help with searching</p>
                                <p class="mt-2 text-gray-500">Use this tool to quickly search for products and pages
                                    across our entire platform. You can also use the search modifiers found in the
                                    footer below to limit the results to just products or pages.</p>
                            </div>

                            <div
                                v-if="query !== '' && rawQuery !== '?' && filteredPages.length === 0 && filteredProducts.length === 0"
                                class="py-14 px-6 text-center text-sm sm:px-14">
                                <ExclamationIcon class="mx-auto h-6 w-6 text-gray-400" aria-hidden="true"/>
                                <p class="mt-4 font-semibold text-gray-900">No results found</p>
                                <p class="mt-2 text-gray-500">We couldn’t find anything with that term. Please try
                                    again.</p>
                            </div>

                            <div class="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                                Type
                                <kbd
                                    :class="['mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2', rawQuery.startsWith('#') ? 'border-emerald-600 text-emerald-600' : 'border-gray-400 text-gray-900']">#</kbd>
                                <span class="sm:hidden">for pages,</span>
                                <span class="hidden sm:inline">to access pages,</span>
                                <kbd
                                    :class="['mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2', rawQuery.startsWith('>') ? 'border-emerald-600 text-emerald-600' : 'border-gray-400 text-gray-900']">&gt;</kbd>
                                for products, and
                                <kbd
                                    :class="['mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2', rawQuery === '?' ? 'border-emerald-600 text-emerald-600' : 'border-gray-400 text-gray-900']">?</kbd>
                                for help.
                            </div>
                        </Combobox>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {computed, ref} from 'vue'
import {SearchIcon} from '@heroicons/vue/solid'
import {ExclamationIcon, FolderIcon, SupportIcon, DocumentIcon} from '@heroicons/vue/outline'
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'


const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
})

const emit = defineEmits(['toggleSearchModal'])


const pages = [
    {id: 1, name: 'Home', category: 'Pages', url: '#'},
    {id: 2, name: 'Get on touch', category: 'Pages', url: '#'},
    {id: 3, name: 'About us', category: 'Pages', url: '#'},
    {id: 4, name: 'Services', category: 'Pages', url: '#'},
    // More pages...
]

const products = [
    {
        id: 1,
        name: 'Bag',
        url: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 2,
        name: 'Watch',
        url: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGNoJTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 3,
        name: 'Shoes',
        url: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXMlMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
        id: 4,
        name: 'Jacket',
        url: '#',
        imageUrl:
            'https://images.unsplash.com/photo-1523297467724-f6758d7124c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGZhc2hpb24lMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    },
    // More products...
]

const rawQuery = ref('')
const query = computed(() => rawQuery.value.toLowerCase().replace(/^[#>]/, ''))
const filteredPages = computed(() =>
    rawQuery.value === '#'
        ? pages
        : query.value === '' || rawQuery.value.startsWith('>')
            ? []
            : pages.filter((page) => page.name.toLowerCase().includes(query.value))
)
const filteredProducts = computed(() =>
    rawQuery.value === '>'
        ? products
        : query.value === '' || rawQuery.value.startsWith('#')
            ? []
            : products.filter((product) => product.name.toLowerCase().includes(query.value))
)

function onSelect(item) {
    window.location = item.url
}

// toggle modal function
const toggleSearchModal = function () {
    emit('toggleSearchModal')
}
</script>
