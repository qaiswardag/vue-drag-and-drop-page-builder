<template>
    <div
        class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
            type="button"
            class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 md:hidden"
            @click="sidebarOpen = true">
            <span class="sr-only">Open sidebar</span>
            <MenuAlt2Icon class="h-6 w-6" aria-hidden="true"/>
        </button>
        <div class="flex-1 px-4 flex justify-between">
            <div class="flex-1 flex">
                <form
                    class="w-full flex md:ml-0"
                    @submit.prevent>
                    <label for="search-field" class="sr-only">
                        Search anything...
                    </label>
                    <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                            <SearchIcon class="h-5 w-5" aria-hidden="true"/>
                        </div>
                        <input id="search-field"
                               class="cursor-pointer block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 font-semibold placeholder-gray-500 placeholder:font-semibold focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                               @click.prevent="search"
                               placeholder="Search anything..."
                               readonly
                               type="search"
                               autocomplete="off"
                               name="search"/>
                    </div>
                </form>
            </div>
            <div class="ml-4 flex items-center md:ml-6">
                <button type="button"
                        @click="openNotificationsWindow"
                        class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                    <span class="sr-only">View notifications</span>
                    <BellIcon class="h-6 w-6" aria-hidden="true"/>
                </button>

                <!-- Profile dropdown -->
                <Menu as="div" class="ml-3 relative">
                    <div>
                        <MenuButton
                            class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            <span class="sr-only">Open user menu</span>
                            <div
                                class="h-8 w-8 rounded-full bg-emerald-100 flex justify-center items-center text-sm font-semibold">
                                {{ user?.first_name.charAt(0).toUpperCase() }}
                            </div>
                        </MenuButton>
                    </div>
                    <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                                <a :href="item.href"
                                   :class="[currentRouteName === item.routeName ? 'active-link-color bg-gray-100' : 'text-gray-800', 'block px-4 py-2 text-sm']">
                                    <div class="font-medium text-gray-900 truncate">
                                        <div>
                                            {{
                                                item.name
                                            }}
                                        </div>
                                        <div v-if="item.email">
                                            {{
                                                item.email
                                            }}
                                        </div>
                                    </div>
                                </a>
                            </MenuItem>

                            <MenuItem class="block px-4 py-2 text-sm">
                                <div @click="handleSignout"
                                     class="w-full cursor-pointer">
                                    Sign out
                                </div>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </div>

    <DynamicModal
        :type="typeModal"
        :id="idModal"
        :gridColumnAmount="gridColumnModal"
        :title="titleModal"
        :description="descriptionModal"
        :firstButtonText="firstButtonModal"
        :secondButtonText="secondButtonModal"
        :thirdButtonText="thirdButtonModal"
        :open="openModal"
        @firstModalButtonFunction="firstModalButtonFunction"
        @secondModalButtonFunction="secondModalButtonFunction"
        @thirdModalButtonFunction="thirdModalButtonFunction">

        <div v-if="signOutFormForModal">
            <header>
            </header>
            <main>
                <form
                    ref="signOutForm"
                    method="post"
                    action="/logout"
                    class="myPrimaryForm">
                    <input type="hidden" name="_token" :value="csrf">
                </form>
            </main>
        </div>
    </DynamicModal>

    <SearchAnythingModal :open="openSearchModal"
                         @toggleSearchModal="openSearchModal = !openSearchModal">
    </SearchAnythingModal>

    <SlideOverNotifications
        :open="notificationsWindow"
        @closeNotificationsWindow="closeNotificationsWindow">
    </SlideOverNotifications>
</template>

<script setup>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import DynamicModal from "../modal/DynamicModal";
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

import {
    BellIcon,
    MenuAlt2Icon,
    CogIcon
} from '@heroicons/vue/outline'
import {SearchIcon} from '@heroicons/vue/solid'
import SearchAnythingModal from '../modal/SearchAnythingModal'
import SlideOverNotifications from '../sidebar/SlideOverNotifications'

// use search model
const openSearchModal = ref(false);

// csrf
const csrf = ref(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))

const notificationsWindow = ref(false);

// discount types
const discountTypes = ref([
    'fixed',
    'percentage'
]);
// singleCampaign details
const singleCampaign = ref({}
);

// store
const store = useStore();
// user
const user = computed(() => {
    return store.getters['user/getUser']
});

const currentRouteName = computed(() => {
    return store.getters['routes/getCurrentRouteName']
});

// user navigation
const userNavigation = ref([
    {
        name: computed(() => {
            return user.value?.first_name
        }),
        email: computed(() => {
            return user.value?.email
        }),
        href: '/account',
        routeName: 'account',
        icon: BellIcon
    },
    {
        name: 'Settings',
        href: '/settings',
        routeName: 'settings',
        icon: BellIcon
    },
    {
        name: 'Help',
        href: '/help',
        routeName: 'help',
        icon: BellIcon
    },
]);
//
// use dynamic model
const openModal = ref(false);
// modal content
const typeModal = ref('');
const idModal = ref(Number(null));
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);
//
// side bar
const sidebarOpen = ref(false)

// serach modal
const search = function () {
    openSearchModal.value = true
}
// sign out form
const signOutForm = ref();
const signOutFormForModal = ref(null);
//
// handle sign out
const handleSignout = function () {
    // set sign out
    signOutFormForModal.value = true
    // open modal to true
    openModal.value = true
    // set modal standards
    typeModal.value = 'success';
    gridColumnModal.value = 2;
    titleModal.value = `Sign out`;
    descriptionModal.value = 'Are you sure you want to sign out?';
    firstButtonModal.value = 'Close';
    //secondButtonModal.value = '';
    thirdButtonModal.value = 'Sign out';

    // handle modal click
    firstModalButtonFunction.value = function () {
        // set sign out
        signOutFormForModal.value = false
        // close modal
        openModal.value = false
    };
    //
    // handle delete
    thirdModalButtonFunction.value = function () {
        // set sign out
        signOutFormForModal.value = false
        // close modal
        openModal.value = false

        // sign out
        signOutForm.value.submit()
    };
}
// handle notifications window
const openNotificationsWindow = function () {
    notificationsWindow.value = true
}
// close notifications window
const closeNotificationsWindow = function () {
    notificationsWindow.value = false
}
</script>
