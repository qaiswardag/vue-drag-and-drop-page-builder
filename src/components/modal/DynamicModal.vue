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
                        class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
                        <div class="flex items-center border-b border-gray-200 pb-2 mb-2">
                            <div class="flex-1">

                                <div v-if="type ==='default'">
                                </div>

                                <div class="flex gap-2 justify-start items-center">
                                    <div v-if="type ==='success'"
                                         class="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                                        <CheckIcon aria-hidden="true" class="h-4 w-4 text-green-600"/>
                                    </div>

                                    <div v-if="type ==='warning'"
                                         class="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-200">
                                        <BellIcon aria-hidden="true" class="h-4 w-4 text-gray-600"/>
                                    </div>

                                    <div v-if="type ==='delete'"
                                         class="flex items-center justify-center h-6 w-6 rounded-full bg-red-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-4 h-4 text-red-800">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                        </svg>
                                    </div>

                                    <div v-if="type ==='error'"
                                         class="flex items-center justify-center h-6 w-6 rounded-full bg-red-100">
                                        <ExclamationIcon aria-hidden="true" class="h-4 w-4 text-red-600"/>
                                    </div>

                                    <DialogTitle as="h3" class="tertiaryHeader my-0 py-0">
                                        {{ title }}
                                    </DialogTitle>
                                </div>
                            </div>
                            <div
                                @click="firstButton"
                                class="flex-end">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke-width="2"
                                     stroke="currentColor" aria-hidden="true"
                                     class="h-6 w-6 text-gray-700 self-center cursor-pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                        </div>

                        <div>
                            <div v-html="description" class="text-sm text-gray-600 mt-4 mb-10">
                            </div>
                            <header>
                                <slot name="header"></slot>
                            </header>
                            <main>
                                <slot></slot>
                            </main>
                        </div>

                        <div class="border-t border-gray-200 mt-2 sm:mt-2 pt-4">
                            <div
                                :class="{'sm:grid-cols-1': gridColumnAmount === 1, 'sm:grid-cols-2': gridColumnAmount === 2, 'sm:grid-cols-3': gridColumnAmount === 3 }"
                                class="sm:grid sm:gap-3 grid gap-4 sm:grid-flow-row-dense md:w-full md:float-right">

                                <div v-if="firstButtonText">
                                    <button ref="firstButtonRef"
                                            class="myPrimaryButton bg-gray-700 hover:bg-gray-800 text-white focus:ring-gray-700 text-sm w-full"
                                            type="button"
                                            @click="firstButton">
                                        {{ firstButtonText }}
                                    </button>
                                </div>

                                <div v-if="secondButtonText">
                                    <button
                                        class="myPrimaryButton bg-yellow-400 hover:bg-yellow-500 text-white focus:ring-yellow-400 text-sm w-full"
                                        type="button"
                                        @click="secondButton">
                                        {{ secondButtonText }}
                                    </button>
                                </div>

                                <div v-if="thirdButtonText">
                                    <div v-if="type ==='default'">
                                        <button
                                            class="myPrimaryButton bg-emerald-500 text-sm w-full"
                                            type="button"
                                            @click="thirdButton">
                                            {{ thirdButtonText }}
                                        </button>
                                    </div>
                                    <div v-if="type ==='success'">
                                        <button
                                            class="myPrimaryButton bg-emerald-500 text-sm w-full"
                                            type="button"
                                            @click="thirdButton">
                                            {{ thirdButtonText }}
                                        </button>
                                    </div>

                                    <div v-if="type ==='warning'">
                                        <button
                                            class="myPrimaryButton bg-emerald-500 text-sm w-full"
                                            type="button"
                                            @click="thirdButton">
                                            {{ thirdButtonText }}
                                        </button>
                                    </div>

                                    <div v-if="type ==='error' || type ==='delete'">
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
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import {ref} from 'vue'
import {CheckIcon, ExclamationIcon, BellIcon} from '@heroicons/vue/outline'
import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'

export default {
    components: {
        Dialog,
        DialogOverlay,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        CheckIcon,
        ExclamationIcon,
        BellIcon,
    },
    props: {
        id: {
            type: Number,
        },
        gridColumnAmount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
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
        // first button function
        const firstButton = function () {
            context.emit('firstModalButtonFunction')
        }

        // second button  function
        const secondButton = function () {
            context.emit('secondModalButtonFunction')
        }

        // third button function
        const thirdButton = function () {
            context.emit('thirdModalButtonFunction')
        }
        //
        return {
            firstButton,
            secondButton,
            thirdButton,
        }
    },
}
</script>
