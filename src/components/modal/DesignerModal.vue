<script setup>
import Modal from '../modal/Modal.vue';
import { CheckIcon, ExclamationIcon, BellIcon } from '@heroicons/vue/outline';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import {} from '@headlessui/vue';

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['firstDesignerModalButtonFunction']);

// first button function
const firstButton = function () {
  emit('firstDesignerModalButtonFunction');
};
</script>

<template>
  <teleport to="body">
    <TransitionRoot :show="show" as="template">
      <Dialog
        as="div"
        class="fixed z-30 inset-0 overflow-y-auto"
        @close="firstButton"
      >
        <div
          class="flex items-end justify-center pb-20 text-center sm:block sm:p-0 bg-white"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 bg-white bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span
            aria-hidden="true"
            class="hidden sm:inline-block sm:align-middle sm:h-screen"
            >&#8203;</span
          >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle w-full"
            >
              <slot></slot>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>
