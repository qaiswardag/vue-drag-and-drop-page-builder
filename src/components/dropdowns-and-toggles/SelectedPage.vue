<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <Listbox v-model="selected" as="div">
        <div class="relative">
            <div class="inline-flex shadow-sm rounded-md divide-x divide-[#0bb783]">
                <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-[#029568]">
                    <div
                        class="relative inline-flex items-center bg-[#0bb783] py-2 px-2 border border-transparent rounded-l-md shadow-sm text-white">
                        <CheckIcon aria-hidden="true" class="h-3 w-3"/>
                        <p class="ml-2 text-xs font-bold">{{ selected.title }}</p>
                    </div>
                    <ListboxButton
                        class="relative inline-flex items-center bg-[#0bb783] p-2 rounded-l-none rounded-r-md text-xs font-medium text-white hover:bg-[#0bb783] focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#0bb783]">
                        <span class="sr-only">Change published status</span>
                        <ChevronDownIcon aria-hidden="true" class="h-3 w-3 text-white"/>
                    </ListboxButton>
                </div>
            </div>

            <transition leave-active-class="transition ease-in duration-100"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0">
                <ListboxOptions
                    class="origin-top-right absolute z-20 right-0 mt-2 w-32 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <ListboxOption v-for="option in publishingOptions" :key="option.title"
                                   v-slot="{ active, selected }"
                                   :value="option"
                                   as="template">
                        <li
                            :class="[active ? 'text-white bg-[#0bb783]' : 'text-gray-900', 'cursor-default select-none relative p-4 text-xs']">
                            <div class="flex flex-col">
                                <div class="flex justify-between">
                                    <p :class="selected ? 'font-semibold' : 'font-normal'">
                                        {{ option.title }}
                                    </p>
                                    <span v-if="selected" :class="active ? 'text-white' : 'text-[#0bb783]'">
                    <CheckIcon aria-hidden="true" class="h-3 w-3"/>
                  </span>
                                </div>
                            </div>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script>
import {ref} from 'vue';
import {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions
} from '@headlessui/vue';
import {CheckIcon, ChevronDownIcon} from '@heroicons/vue/solid';

const publishingOptions = [
    {
        title: 'Contact',
        current: true
    },
    {
        title: 'About',
        current: false
    },
];

export default {
    components: {
        Listbox,
        ListboxButton,
        ListboxLabel,
        ListboxOption,
        ListboxOptions,
        CheckIcon,
        ChevronDownIcon,
    },
    setup() {
        const selected = ref(publishingOptions[0]);

        return {
            publishingOptions,
            selected,
        };
    },
};
</script>
