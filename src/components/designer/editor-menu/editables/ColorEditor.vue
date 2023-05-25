<template>
  <EditorAccordion>
    <template #title>Color settings</template>
    <template #content>
      <div @click="handleColorsSlideOver" class="my-2 cursor-pointer">
        <div class="flex flex-row justify-start items-center myPrimaryGap mb-8">
          <div
            :class="[
              'bg-' + colorRefs.bg.color,
              {
                border:
                  colorRefs.bg.color === 'white' || colorRefs.bg.transparent,
              },
            ]"
            class="w-8 h-8 shadow-2xl border border-gray-400"
          />

          <p class="myPrimaryParagraph">Background</p>
        </div>
      </div>

      <div @click="handleColorsSlideOver" class="mb-2 cursor-pointer">
        <div class="flex flex-row justify-start items-center myPrimaryGap mb-8">
          <div
            :class="[
              'bg-' + colorRefs.text.color,
              {
                border:
                  colorRefs.text.color === 'white' ||
                  colorRefs.text.transparent,
              },
            ]"
            class="w-8 h-8 shadow-2xl border border-gray-400"
          />
          <p class="myPrimaryParagraph">Text</p>
        </div>
      </div>
      <SlideOverRight
        :open="showColorsSlideOverRight"
        :title="titleSlideOverRight"
        @colorsSlideOverButton="colorsSlideOverButton"
      >
        <ManageColors></ManageColors>
      </SlideOverRight>
    </template>
  </EditorAccordion>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import EditorAccordion from '../EditorAccordion.vue';
import SlideOverRight from '../../../slidebars/SlideOverRight.vue';
import ManageColors from '../editables/ManageColors.vue';

import {
  XMarkIcon,
  SwatchIcon,
  CubeTransparentIcon,
} from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';

// store
const store = useStore();
const showColorsSlideOverRight = ref(false);
const titleSlideOverRight = ref(null);

// handle notifications window
const handleColorsSlideOver = function () {
  titleSlideOverRight.value = 'Manage colors';
  showColorsSlideOverRight.value = true;
};
// handle notifications window
const colorsSlideOverButton = function () {
  showColorsSlideOverRight.value = false;
};

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
