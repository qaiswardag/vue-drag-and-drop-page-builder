<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10"
                @click="$emit('closeNotificationsWindow')">
            <div class="fixed inset-0"/>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                                         enter="transform transition ease-in-out duration-200 sm:duration-200"
                                         enter-from="translate-x-full" enter-to="translate-x-0"
                                         leave="transform transition ease-in-out duration-400 sm:duration-400"
                                         leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-lg font-medium text-gray-900">
                                                Notifications
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">

                                                <button type="button"
                                                        class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                                        @click="$emit('closeNotificationsWindow')">
                                                    <span class="sr-only">Close panel</span>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                         class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              d="M6 18L18 6M6 6l12 12"/>
                                                    </svg>


                                                </button>
                                            </div>
                                        </div>
                                        <p class="primaryParagraph">
                                            Latest 15 notifications
                                        </p>
                                        <a href="#"
                                           class="block primaryLink primaryParagraph rounded">
                                            View all notifications
                                        </a>
                                    </div>
                                    <div class="relative mt-0 flex-1 px-4 sm:px-6">
                                        <!-- Replace with your content -->
                                        <div class="absolute inset-0 px-4 sm:px-6">

                                            <div v-if="notifications.length > 0"
                                                 class="grid grid-cols-1 primary-gap mt-4">
                                                <div v-for="notification in notifications" :key="notification.id"
                                                     class="border border-gray-200 bg-gray-50 py-4 px-4 rounded">
                                                    <a href="#"
                                                       class="text-sm font-medium text-gray-900 mb-4 mt-2 font-semibold block">
                                                        {{ notification.title }}
                                                    </a>
                                                    <div v-if="notification.image === null">
                                                    </div>
                                                    <div v-if="notification.image">
                                                        <a href="#">
                                                            <img alt="notification thumbnail"
                                                                 class="object-cover h-40 w-full xl:h-56 xl:w-full rounded"
                                                                 :src="notification.image">
                                                        </a>
                                                    </div>
                                                    <p class="text-sm text-gray-500 mt-4">
                                                        {{ notification.description.slice(0, 60) }}...
                                                    </p>

                                                    <div class="flex items-center justify-left gap-2">
                                                        <a href="#"
                                                           class="myPrimaryButton text-xs py-2 my-4">
                                                            Read more
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- /End replace -->
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {useStore} from 'vuex'

// store
const store = useStore();

// props
const props = defineProps({
    open: {
        required: true
    },
})

// notifications
const notifications = store.getters['notifications/getNotifications'];
// emit
const emit = defineEmits(['closeNotificationsWindow'])


// setup code
</script>
