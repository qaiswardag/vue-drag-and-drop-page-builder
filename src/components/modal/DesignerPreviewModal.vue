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
});

const emit = defineEmits(['firstDesignerPreviewModalButtonFunction']);

// first button function
const firstButton = function () {
  emit('firstDesignerPreviewModalButtonFunction');
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
              <div
                class="flex items-center justify-between h-8 pl-4 pr-2 bg-gray-200"
              >
                <p
                  class="-m-1.5 p-1.5 myPrimaryParagraph text-sm sm:text-md font-semibold text-black cursor-pointer"
                >
                  <span class="sr-only">Your Company</span>
                  myDesigner
                </p>
                <div
                  @click="firstButton"
                  class="flex items-center justify-center gap-1 cursor-pointer hover:underline"
                >
                  <span class="text-xs"> Close Preview </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="h-4 w-4 text-black self-center"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </div>
              </div>
              <slot></slot>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>
