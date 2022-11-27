<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot :show="open" as="template">
        <Dialog as="div" class="fixed z-30 inset-0 overflow-y-auto" @close="firstButton">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                 enter-to="opacity-100"
                                 leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </TransitionChild>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span aria-hidden="true" class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                                 enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                 enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                 leave-from="opacity-100 translate-y-0 sm:scale-100"
                                 leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">


                    <div
                        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4
                        text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle
                        sm:max-w-5xl sm:w-full sm:p-6">

                        <div class="flex gap-2 justify-between items-center border-b border-gray-200">
                            <DialogTitle as="h3" class="tertiaryHeader my-0 py-0">
                                {{ title }}
                            </DialogTitle>

                            <div class="flex-end">
                                <XIcon class="h-6 w-6 text-gray-700 self-center cursor-pointer"
                                       @click="firstButton"></XIcon>
                            </div>
                        </div>


                        <div class="flex items-center pb-2 mb-2">
                            <div class="flex-1">

                                <!--content media library - start-->
                                <div class="flex-1 flex items-stretch overflow-hidden mt-2">

                                    <!-- Main content - start-->
                                    <main class="flex-1 overflow-y-auto">
                                        <div class="pt-8 max-w-7xl mx-auto px-4 sm:pr-6 lg:pr-8">
                                            <!-- Tabs -->
                                            <div class="mt-3 sm:mt-2">
                                                <div class="sm:hidden">
                                                    <label for="tabs" class="sr-only">Select a tab</label>
                                                    <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->

                                                    <select
                                                        v-model="selected"
                                                        @change="yPaddingChange"
                                                        id="tabs"
                                                        class="block w-full pl-3 pr-10 py-2 text-base border-gray-300
                                                        focus:outline-none focus:ring-emerald-500 focus:border-emerald-500
                                                        sm:text-sm rounded-md">
                                                        <option>Media library</option>
                                                        <option>Unsplash.com</option>
                                                    </select>
                                                </div>
                                                <div class="hidden sm:block">
                                                    <div class="flex items-center border-b border-gray-200">
                                                        <nav class="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                                                             aria-label="Tabs">
                                                            <div v-for="tab in tabs" :key="tab.name"
                                                                 :aria-current="tab.current ? 'page' : undefined"
                                                                 :class="[tab.name === selected ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']">
                                                                <span class="cursor-pointer"
                                                                      @click="changeSelected(tab.name)">
                                                                    {{ tab.name }}
                                                                </span>
                                                            </div>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>


                                            <div v-if="selected ==='Media library'">
                                                <MediaLibraryComponent>
                                                </MediaLibraryComponent>
                                            </div>

                                            <div v-if="selected ==='Unsplash.com'">
                                                <div v-if="true">
                                                    <Unsplash>
                                                    </Unsplash>
                                                </div>
                                            </div>

                                        </div>
                                    </main>
                                    <!-- Main content - end-->

                                    <!-- Details sidebar start-->
                                    <aside
                                        class="w-96 bg-white pl-8 pr-2 border-l border-gray-200 overflow-y-auto">
                                        <div class="pb-16 space-y-6">
                                            <div>
                                                <div
                                                    class="bg-gray-600 min-h-[10rem] min-w-[20rem] block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                                                    <div
                                                        class="block aspect-w-10 aspect-h-7 overflow-hidden object-cover object-center w-full rounded-md">
                                                        <div v-if="getCurrentPreview">
                                                            <img
                                                                class="object-cover pointer-events-none"
                                                                :src="getCurrentPreview">
                                                        </div>

                                                        <div v-else>
                                                            <img
                                                                class="object-cover pointer-events-none"
                                                                :src="getCurrentElement.src">
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="mt-4 flex items-start justify-between">
                                                    <div>
                                                        <h2 class="text-lg font-medium text-gray-900"><span
                                                            class="sr-only">Details for </span>
                                                            Image name
                                                        </h2>
                                                        <p class="text-sm font-medium text-gray-500">Image size</p>
                                                    </div>
                                                    <button type="button"
                                                            class="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                                        <HeartIcon class="h-6 w-6" aria-hidden="true"/>
                                                        <span class="sr-only">Favorite</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div>

                                                <h3 class="font-medium text-gray-900">Information</h3>
                                                <dl class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                                                    <div class="py-3 flex justify-between text-sm font-medium">
                                                        <dt class="text-gray-500">Dimensions</dt>
                                                        <dd class="text-gray-900">4032 x 3024</dd>
                                                    </div>
                                                </dl>

                                            </div>

                                            <div class="flex gap-2">
                                                <button type="button"
                                                        class="myPrimaryButton bg-gray-600 text-white hover:bg-gray-700 hover:text-white focus:ring-gray-600 w-full">
                                                    Download
                                                </button>
                                                <button type="button"
                                                        class="myPrimaryDeleteButton bg-red-500 w-full">
                                                    Delete
                                                </button>
                                            </div>


                                            <div class="border-t border-gray-200 mt-2 sm:mt-2 pt-4">
                                                <div
                                                    class="sm:flex justify-center sm:gap-3 grid gap-4 sm:grid-flow-row-dense md:w-full md:float-right">

                                                    <div v-if="firstButtonText && false"
                                                         class="w-full">
                                                        <button ref="firstButtonRef"
                                                                class="myPrimaryButton bg-gray-700 hover:bg-gray-800 text-white focus:ring-gray-700 text-sm w-full"
                                                                type="button"
                                                                @click="firstButton">
                                                            {{ firstButtonText }}
                                                        </button>
                                                    </div>

                                                    <div v-if="secondButtonText"
                                                         class="w-full">
                                                        <button
                                                            class="myPrimaryButton bg-emerald-500 text-sm w-full"
                                                            type="button"
                                                            @click="secondButton">
                                                            {{ secondButtonText }}
                                                        </button>
                                                    </div>

                                                    <div v-if="thirdButtonText"
                                                         class="w-full">
                                                        <button
                                                            class="myPrimaryButton bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 text-sm w-full"
                                                            type="button"
                                                            @click="thirdButton">
                                                            {{ thirdButtonText }}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </aside>
                                    <!-- Details sidebar end-->
                                </div>
                                <!--content media library - end-->

                            </div>
                        </div>

                        <div v-if="description">
                            <div v-html="description" class="text-sm text-gray-600 mt-4 mb-10">
                            </div>
                            <header>
                                2
                                <slot name="header"></slot>
                            </header>
                            <main>
                                3
                                <slot></slot>
                            </main>
                        </div>

                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {computed, ref} from 'vue'
import {useStore} from 'vuex';
import {CheckIcon, ExclamationIcon, BellIcon} from '@heroicons/vue/outline'
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/vue';

import {
    CogIcon,
    CollectionIcon,
    HeartIcon,
    HomeIcon,
    MenuAlt2Icon,
    PhotographIcon,
    PlusSmIcon as PlusSmIconOutline,
    UserGroupIcon,
    ViewGridIcon as ViewGridIconOutline,
    XIcon,
} from '@heroicons/vue/outline';
import {
    PencilIcon,
    PlusSmIcon as PlusSmIconSolid,
    SearchIcon,
    ViewGridIcon as ViewGridIconSolid,
    ViewListIcon,
} from '@heroicons/vue/solid';
import Unsplash from "../designer/editor-menu/media-library-components/Unsplash";
import MediaLibraryComponent from "../designer/editor-menu/media-library-components/MediaLibraryComponent";


const selected = ref('Media library')

const tabs = [
    {
        name: 'Media library',
        current: true
    },
    {
        name: 'Unsplash.com',
        href: '#',
        current: false
    },
];

export default {
    components: {
        MediaLibraryComponent,
        Unsplash,
        Dialog,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        HeartIcon,
        MenuAlt2Icon,
        PencilIcon,
        PlusSmIconOutline,
        PlusSmIconSolid,
        SearchIcon,
        ViewGridIconSolid,
        ViewListIcon,
        XIcon,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        description: {
            required: true,
        },
        firstButtonText: {
            type: String,
        },
        secondButtonText: {
            type: String,
        },
        thirdButtonText: {
            type: String,
        },
        open: {
            required: true,
        },
    },

    setup(props, context) {
        //
        // store
        const store = useStore();
        //
        //
        // get current preview
        const getCurrentPreview = computed(() => {
            return store.getters['Designer/getCurrentPreview'];
        });
        //
        // get current element from store
        const getCurrentElement = computed(() => {
            return store.getters['Designer/getCurrentElement'];
        });
        //
        //
        // first button function
        const firstButton = function () {
            context.emit('firstMediaButtonFunction')
        }

        // second button  function
        const secondButton = function () {
            context.emit('secondMediaButtonFunction')
        }

        // third button function
        const thirdButton = function () {
            context.emit('thirdMediaButtonFunction')
        }
        //
        //
        const changeSelected = function (clicked) {
            selected.value = clicked;
        }
        //
        //
        return {
            firstButton,
            secondButton,
            thirdButton,
            tabs,
            selected,
            getCurrentElement,
            getCurrentPreview,
            changeSelected
        }
    },
}
</script>
