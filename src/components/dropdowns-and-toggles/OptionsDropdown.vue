<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import {
  AdjustmentsVerticalIcon,
  ArrowUturnRightIcon,
  CheckIcon,
  ChevronDownIcon,
  EyeIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import Designer from '../../composables/Designer';
import { ref, computed } from 'vue';
import DesignerPreviewModal from '../modal/DesignerPreviewModal.vue';
import Preview from '../../views/designer/Preview.vue';
import { useStore } from 'vuex';
import DynamicModal from '../modal/DynamicModal.vue';

const store = useStore();
const designer = new Designer(store);
const emit = defineEmits(['previewCurrentDesign']);

const showModalDeleteAllComponents = ref(false);
//
// use dynamic model
const typeModal = ref('');
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

const openDesignerPreviewModal = ref(false);
const firstDesignerPreviewModalButtonFunction = ref(null);
const handleDesignerPreview = function () {
  emit('previewCurrentDesign');
  // set modal standards
  openDesignerPreviewModal.value = true;
  // handle click
  firstDesignerPreviewModalButtonFunction.value = function () {
    // set open modal
    openDesignerPreviewModal.value = false;
  };
  // end modal
};

const user = computed(() => {
  return store.getters['user/getUser'];
});

const deleteAllComponents = function () {
  // set modal standards
  showModalDeleteAllComponents.value = true;
  typeModal.value = 'delete';
  gridColumnModal.value = 2;
  titleModal.value = 'Delete Components';
  descriptionModal.value = 'Are you sure you want to delete all Components?';
  firstButtonModal.value = 'Close';
  secondButtonModal.value = null;
  thirdButtonModal.value = 'Delete';

  // handle click
  firstModalButtonFunction.value = function () {
    // set open modal
    showModalDeleteAllComponents.value = false;
  };
  //
  // handle click
  thirdModalButtonFunction.value = function () {
    designer.deleteAllComponents();
    showModalDeleteAllComponents.value = false;
  };
  // end modal
};
</script>

<template>
  <DynamicModal
    :show="showModalDeleteAllComponents"
    :type="typeModal"
    :gridColumnAmount="gridColumnModal"
    :title="titleModal"
    :description="descriptionModal"
    :firstButtonText="firstButtonModal"
    :secondButtonText="secondButtonModal"
    :thirdButtonText="thirdButtonModal"
    @firstModalButtonFunction="firstModalButtonFunction"
    @secondModalButtonFunction="secondModalButtonFunction"
    @thirdModalButtonFunction="thirdModalButtonFunction"
  >
    <header></header>
    <main></main>
  </DynamicModal>
  <Menu
    as="div"
    class="myPrimaryParagraph relative inline-block text-left"
  >
    <div>
      <MenuButton
        class="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-emerald-600"
      >
        <CheckIcon class="h-4 w-4 stroke-2"></CheckIcon>
        Options
        <ChevronDownIcon
          class="h-3 w-3 stroke-2"
          aria-hidden="true"
        />
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
        class="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
      >
        <div class="px-4 py-3">
          <p class="font-normal text-gray-900 truncate">
            Signed in as:
            {{ user.name }}
          </p>
        </div>
        <div class="py-1">
          <MenuItem
            v-slot="{ active }"
            @click="handleDesignerPreview"
          >
            <div
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2',
              ]"
            >
              <div class="flex items-center justify-left gap-2 cursor-pointer">
                <EyeIcon class="w-3 h-3 stroke-2"></EyeIcon>
                Preview page
              </div>
            </div>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <div
              @click="deleteAllComponents"
              class="cursor-pointer"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2',
              ]"
            >
              <div class="flex items-center justify-left gap-2">
                <TrashIcon class="w-3 h-3 stroke-2"></TrashIcon>
                Delete all Components
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
