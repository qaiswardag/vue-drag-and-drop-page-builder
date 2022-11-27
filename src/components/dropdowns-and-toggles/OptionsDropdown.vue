<template>
    <Menu as="div" class="text-xs relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                </svg>
                Options
                <ChevronDownIcon class="h-3 w-3" aria-hidden="true"/>
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="text-xs z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                <div class="px-4 py-3">
                    <p>Signed in as</p>
                    <p class="font-medium text-gray-900 truncate">
                        {{ user.email }}
                    </p>
                </div>
                <div class="py-1">


                    <MenuItem v-slot="{ active }">
                        <a href="/designer/preview"
                           target=”_blank”
                           :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-xs']"
                           @click="preview">
                            <div class="flex items-center justify-left gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="w-3 h-3">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                                </svg>
                                Preview
                            </div>
                        </a>
                    </MenuItem>


                    <MenuItem v-slot="{ active }">
                        <div
                            @click="deleteAllElements"
                            class="cursor-pointer"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-xs']">
                            <div class="flex items-center justify-left gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                                Delete all sections
                            </div>
                        </div>
                    </MenuItem>


                    <MenuItem v-slot="{ active }">
                        <div
                            @click="handleHistory"
                            class="cursor-pointer"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-xs']">
                            <div class="flex items-center justify-left gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24"
                                     stroke-width="2"
                                     stroke="currentColor"
                                     class="w-3 h-3">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"/>
                                </svg>
                                History
                            </div>
                        </div>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                        <a href="/support"
                           target="_blank"
                           :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-xs']">
                            <div class="flex items-center justify-left gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="w-3 h-3">
                                    <path stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"/>
                                </svg>
                                Support
                            </div>
                        </a>
                    </MenuItem>
                </div>

                <div
                    class="py-1">
                    <MenuItem v-slot="{ active }">
                        <button
                            @click="handleSignout"
                            :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full text-left px-4 py-2 text-xs']">
                            <div class="flex items-center justify-left gap-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    class="w-3 h-3">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                </svg>
                                Sign out
                            </div>
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>

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

        <div v-if="designerHistory">
            <header>
            </header>
            <main>
                <div>
                    <ul role="list">
                        <li v-for="history in pageHistory" :key="history.id"
                            class="relative bg-gray-50 my-2 py-4 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 hover:bg-gray-100 rounded-xl">
                            <div class="flex justify-between space-x-3">
                                <div class="min-w-0 flex-1">
                                    <a href="#" class="block focus:outline-none">
                                        <span class="absolute inset-0" aria-hidden="true"/>
                                        <p class="truncate text-sm text-gray-500">
                                            {{ history.info }}
                                        </p>
                                    </a>
                                </div>
                                <time :datetime="history.datetime"
                                      class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                                    {{ history.time }}
                                </time>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </DynamicModal>
</template>

<script setup>
import {saveAllComponentsInLocalstorage} from "../../composables/save-all-components-in-localstorage";
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {ChevronDownIcon} from '@heroicons/vue/solid'
import DynamicModal from "../modal/DynamicModal";
import {ref, computed} from "vue";
// store
import {useStore} from "vuex";

// store
const store = useStore();
// csrf
const csrf = ref(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
// emit preview current design
const emit = defineEmits(['previewCurrentDesign', 'signOutClick']);

const preview = function () {
    emit('previewCurrentDesign');
};
// current user
const user = computed(() => {
    return store.getters['user/getUser']
});
//
//
// sign out form
const signOutForm = ref(null);
const signOutFormForModal = ref(null);
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
// components added
const componentsAdded = ref([]);
// designer history content - default false
const designerHistory = ref(null);
//
//
const deleteAllElements = function () {
    // open modal to true
    openModal.value = true
    // set modal standards
    typeModal.value = 'delete';
    gridColumnModal.value = 2;
    titleModal.value = `Delete all added sections`;
    descriptionModal.value = 'Are you sure you want to delete all added sections?';
    firstButtonModal.value = 'Close';
    //secondButtonModal.value = '';
    thirdButtonModal.value = 'Delete';


    // handle click
    firstModalButtonFunction.value = function () {
        // close modal
        openModal.value = false
    };
    //
    // handle click
    thirdModalButtonFunction.value = function () {
        componentsAdded.value = []
        // set state for "components added"
        store.commit('Designer/setComponentsAdded', componentsAdded.value)

        // save all current added HTML components in local storage
        saveAllComponentsInLocalstorage(componentsAdded.value)
        // close modal
        openModal.value = false
    };
};
//
const pageHistory = [
    {
        id: 1,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 2,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 3,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 4,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 5,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 6,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 6,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }, {
        id: 7,
        info: 'Velit placeat sit ducimus non sed',
        time: '1d ago',
        datetime: '2021-01-27T16:35',
    }
]

//
//
const handleHistory = function () {
    // designer history set to true
    designerHistory.value = true
    // open modal to true
    openModal.value = true
    // set modal standards
    typeModal.value = 'success';
    gridColumnModal.value = 2;
    titleModal.value = `Page history`;
    descriptionModal.value = 'Choose page history from table below';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = null;
    thirdButtonModal.value = 'Save changes';


    // handle click
    firstModalButtonFunction.value = function () {
        // set designer history
        designerHistory.value = false
        // close modal
        openModal.value = false
    };
    //
    // handle click
    thirdModalButtonFunction.value = function () {
        // set designer history
        designerHistory.value = false
        // close modal
        openModal.value = false
    };
}

// handle sign out
const handleSignout = function () {
    // set sign out
    signOutFormForModal.value = true
    // open modal to true
    openModal.value = true
    // set modal standards
    typeModal.value = 'warning';
    gridColumnModal.value = 3;
    titleModal.value = `Save changes before signing out`;
    descriptionModal.value = 'Save your changes before signing out.';
    firstButtonModal.value = 'Close';
    secondButtonModal.value = 'Discard and sign out';
    thirdButtonModal.value = 'Save and sign out';


    // handle modal click
    firstModalButtonFunction.value = function () {
        // set sign out
        signOutFormForModal.value = false
        // close modal
        openModal.value = false
    };
    //
    // handle click
    secondModalButtonFunction.value = function () {
        // set sign out
        signOutFormForModal.value = false
        // close modal
        openModal.value = false
        // sign out
        signOutForm.value.submit()
    };
    //
    // handle click
    thirdModalButtonFunction.value = function () {
        // set sign out
        signOutFormForModal.value = false
        // close modal
        openModal.value = false
        // sign out
        signOutForm.value.submit()
    };
}
</script>
