<script setup>
import ManageColors from '../designer/editor-menu/editables/ManageColors.vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

import {
  XMarkIcon,
  SwatchIcon,
  CubeTransparentIcon,
} from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';

// props
const props = defineProps({
  open: {
    required: true,
  },
  title: {
    required: true,
  },
});

// emit
const emit = defineEmits(['colorsSlideOverButton']);

// button
const colorsSlideOverButton = function () {
  emit('colorsSlideOverButton');
};
</script>

<template>
  <teleport to="body">
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="relative z-30"
        @click="$emit('colorsSlideOverButton')"
      >
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 justify-end"
            >
              <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-200 sm:duration-200"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-200 sm:duration-200"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <DialogPanel class="pointer-events-auto w-80 max-w-md">
                  <div
                    class="flex h-full flex-col overflow-y-scroll bg-white pt-3 pb-6 shadow-xl"
                  >
                    <div class="px-4 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="myTertiaryHeader">
                          {{ title }}
                        </DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="focus:outline-none cursor-pointer flex gap-2 items-center rounded-full px-1.5 py-1.5 hover:ring-2 hover:ring-myPrimaryBrandColor hover:bg-gray-50 font-medium"
                            @click="$emit('colorsSlideOverButton')"
                          >
                            <span class="sr-only">Close panel</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-0 flex-1 px-4 sm:px-6">
                      <!-- Replace with your content -->
                      <slot></slot>
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
  </teleport>
</template>
