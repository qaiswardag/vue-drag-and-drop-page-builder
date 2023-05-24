<template>
  <Menu as="div" class="text-xs relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-normal text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        Options
        <ChevronDownIcon class="h-4 w-4" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="text-xs z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      >
        <div class="px-4 py-3">
          <p class="font-normal text-gray-900 truncate">
            Signed in as:
            {{ user.name }}
          </p>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }" @click="handleDesignerPreview">
            <div
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-xs',
              ]"
            >
              <div class="flex items-center justify-left gap-1 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Preview
              </div>
            </div>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <div
              @click="deleteAllElements"
              class="cursor-pointer"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-xs',
              ]"
            >
              <div class="flex items-center justify-left gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                Delete all sections
              </div>
            </div>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <div
              class="cursor-pointer"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-xs',
              ]"
            >
              <div class="flex items-center justify-left gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-3 h-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>
                History
              </div>
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <DesignerPreviewModal
    :show="openDesignerPreviewModal"
    @firstDesignerPreviewModalButtonFunction="
      firstDesignerPreviewModalButtonFunction
    "
  >
    <Preview></Preview>
  </DesignerPreviewModal>
</template>

<script setup>
import { saveAllComponentsInLocalstorage } from '../../composables/save-all-components-in-localstorage';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';
import DesignerPreviewModal from '../modal/DesignerPreviewModal.vue';
import Preview from '../../views/designer/Preview.vue';
// store
import { useStore } from 'vuex';

// store
const store = useStore();
// emit preview current design
const emit = defineEmits(['previewCurrentDesign', 'signOutClick']);

const openDesignerPreviewModal = ref(false);
// use designer model
const firstDesignerPreviewModalButtonFunction = ref(null);
//

const handleDesignerPreview = function () {
  emit('previewCurrentDesign');
  //
  // set modal standards
  openDesignerPreviewModal.value = true;

  // handle click
  firstDesignerPreviewModalButtonFunction.value = function () {
    // set open modal
    openDesignerPreviewModal.value = false;
  };
  // end modal
};
//
//
//
// const preview = function () {
//   emit('previewCurrentDesign');
// };
// current user
const user = computed(() => {
  return store.getters['user/getUser'];
});
//
//
//
// components added
const componentsAdded = ref([]);
// designer history content - default false
const designerHistory = ref(null);
//
//
const deleteAllElements = function () {
  console.log('delete all elements');
  saveAllComponentsInLocalstorage(componentsAdded.value);
};
//
//
</script>
