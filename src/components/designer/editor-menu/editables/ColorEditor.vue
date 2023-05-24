<template>
  <EditorAccordion>
    <template #title>Color settings</template>
    <template #content>
      <div class="my-2">
        <div class="flex flex-row justify-between mb-2">
          <div class="flex flex-row gap-2 items-center">
            <div
              :class="[
                'bg-' + colorRefs.bg.color,
                {
                  border:
                    colorRefs.bg.color === 'white' || colorRefs.bg.transparent,
                },
              ]"
              class="w-6 h-6 border-black rounded-md cursor-pointer"
              @click="colorRefs.bg.open = !colorRefs.bg.open"
            />
            <p class="text-md">Background</p>
          </div>
          <div class="flex flex-row gap-1 items-center">
            <div
              @click="colorRefs.bg.open = !colorRefs.bg.open"
              :class="{ 'bg-gray-200': colorRefs.bg.open }"
              class="rounded cursor-pointer p-2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
            </div>
            <div
              @click="
                changeTransparency('bg');
                colorRefs.bg.transparent = true;
              "
              :class="{ 'bg-gray-200': colorRefs.bg.transparent }"
              class="rounded cursor-pointer p-2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <div
              @click="
                removeColor('bg');
                colorRefs.bg.none = true;
              "
              :class="{ 'bg-gray-200': colorRefs.bg.none }"
              class="rounded cursor-pointer p-2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          :class="[colorRefs.bg.open ? 'max-h-96' : 'max-h-0']"
          class="flex flex-wrap gap-x-2 overflow-hidden duration-200"
        >
          <span
            v-for="color in colors"
            :key="color"
            :class="'bg-' + color"
            class="inline-block w-5 h-5 my-1 rounded-md cursor-pointer duration-200 transform hover:scale-125"
            @click="changeColor('bg', color)"
          />
        </div>
      </div>

      <div class="mb-2">
        <div class="flex flex-row justify-between mb-2">
          <div class="flex flex-row gap-2 items-center">
            <div
              :class="[
                'bg-' + colorRefs.text.color,
                {
                  border:
                    colorRefs.text.color === 'white' ||
                    colorRefs.text.transparent,
                },
              ]"
              class="w-6 h-6 border-black rounded-md cursor-pointer"
              @click="colorRefs.text.open = !colorRefs.text.open"
            />
            <p class="text-md">Text</p>
          </div>
          <div class="flex flex-row gap-1 items-center">
            <div
              @click="colorRefs.text.open = !colorRefs.text.open"
              :class="{ 'bg-gray-200': colorRefs.text.open }"
              class="rounded cursor-pointer p-2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
            </div>
            <div
              @click="
                changeTransparency('text');
                colorRefs.text.transparent = true;
              "
              :class="{ 'bg-gray-200': colorRefs.text.transparent }"
              class="rounded cursor-pointer p-2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <div
              @click="
                removeColor('text');
                colorRefs.text.none = true;
              "
              :class="{ 'bg-gray-200': colorRefs.text.none }"
              class="rounded cursor-pointer p-2"
            >
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          :class="[colorRefs.text.open ? 'max-h-96' : 'max-h-0']"
          class="flex flex-wrap gap-x-2 overflow-hidden duration-200"
        >
          <span
            v-for="color in colors"
            :key="color"
            :class="'bg-' + color"
            class="inline-block w-5 h-5 my-1 rounded-md cursor-pointer duration-200 transform hover:scale-125"
            @click="changeColor('text', color)"
          />
        </div>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import EditorAccordion from '../EditorAccordion.vue';

import {
  XMarkIcon,
  SwatchIcon,
  CubeTransparentIcon,
} from '@heroicons/vue/20/solid';
import { ref, watch } from 'vue';

// store
const store = useStore();
// getters: current element from store
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
});

// Update editor defaults when an element is selected
watch(getCurrentElement, (newElement, oldElement) => {
  colorRefs.value.bg.color =
    colors.find((color) => newElement.classList.contains(`bg-${color}`)) || '';
  colorRefs.value.bg.transparent = newElement.classList.contains(
    'bg-transparent'
  )
    ? true
    : false;
  colorRefs.value.bg.none =
    colorRefs.value.bg.color === '' && colorRefs.value.bg.transparent === false
      ? true
      : false;

  colorRefs.value.text.color =
    colors.find((color) => newElement.classList.contains(`text-${color}`)) ||
    '';
  colorRefs.value.text.transparent = newElement.classList.contains(
    'text-transparent'
  )
    ? true
    : false;
  colorRefs.value.text.none =
    colorRefs.value.text.color === '' &&
    colorRefs.value.text.transparent === false
      ? true
      : false;
});
const colorRefs = ref({
  bg: {
    color: '',
    transparent: false,
    none: false,
    open: true,
  },
  text: {
    color: '',
    transparent: false,
    none: false,
    open: true,
  },
});
const colors = [
  'gray-50',
  'gray-100',
  'gray-200',
  'gray-300',
  'gray-400',
  'gray-500',
  'gray-600',
  'gray-700',
  'gray-800',
  'gray-900',
  'red-50',
  'red-100',
  'red-200',
  'red-300',
  'red-400',
  'red-500',
  'red-600',
  'red-700',
  'red-800',
  'red-900',
  'yellow-50',
  'yellow-100',
  'yellow-200',
  'yellow-300',
  'yellow-400',
  'yellow-500',
  'yellow-600',
  'yellow-700',
  'yellow-800',
  'yellow-900',
  'green-50',
  'green-100',
  'green-200',
  'green-300',
  'green-400',
  'green-500',
  'green-600',
  'green-700',
  'green-800',
  'green-900',
  'blue-50',
  'blue-100',
  'blue-200',
  'blue-300',
  'blue-400',
  'blue-500',
  'blue-600',
  'blue-700',
  'blue-800',
  'blue-900',
  'indigo-50',
  'indigo-100',
  'indigo-200',
  'indigo-300',
  'indigo-400',
  'indigo-500',
  'indigo-600',
  'indigo-700',
  'indigo-800',
  'indigo-900',
  'purple-50',
  'purple-100',
  'purple-200',
  'purple-300',
  'purple-400',
  'purple-500',
  'purple-600',
  'purple-700',
  'purple-800',
  'purple-900',
  'pink-50',
  'pink-100',
  'pink-200',
  'pink-300',
  'pink-400',
  'pink-500',
  'pink-600',
  'pink-700',
  'pink-800',
  'pink-900',
  'white',
  'black',
];

function changeColor(type, color) {
  // Remove any existing colors
  removeColor(type);
  // Add tailwind class of type based on passed color
  getCurrentElement.value.classList.add(`${type}-${color}`);

  colorRefs.value[type].color = color;
}

function changeTransparency(type) {
  // Remove any existing colors
  removeColor(type);
  if (colorRefs.value[type].transparent) {
    // Remove transparency class
    getCurrentElement.value.classList.remove(`${type}-transparent`);
  } else {
    // Add transparency class
    getCurrentElement.value.classList.add(`${type}-transparent`);
  }
}

function removeColor(type) {
  // Iterate through all tailwind color class names
  colors.forEach((color) => {
    // Remove any tailwind color class of same type
    getCurrentElement.value.classList.remove(`${type}-${color}`);
  });
  // Remove transparency class
  getCurrentElement.value.classList.remove(`${type}-transparent`);
  // setters (mutation): set current element in store
  store.commit('designer/setCurrentElement', getCurrentElement.value);
}
</script>
