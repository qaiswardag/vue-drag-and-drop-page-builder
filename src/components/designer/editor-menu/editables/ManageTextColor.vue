<script setup>
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
  'slate-50',
  'slate-100',
  'slate-200',
  'slate-300',
  'slate-400',
  'slate-500',
  'slate-600',
  'slate-700',
  'slate-800',
  'slate-900',

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

  'zinc-50',
  'zinc-100',
  'zinc-200',
  'zinc-300',
  'zinc-400',
  'zinc-500',
  'zinc-600',
  'zinc-700',
  'zinc-800',
  'zinc-900',

  'neutral-50',
  'neutral-100',
  'neutral-200',
  'neutral-300',
  'neutral-400',
  'neutral-500',
  'neutral-600',
  'neutral-700',
  'neutral-800',
  'neutral-900',

  'stone-50',
  'stone-100',
  'stone-200',
  'stone-300',
  'stone-400',
  'stone-500',
  'stone-600',
  'stone-700',
  'stone-800',
  'stone-900',

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

  'orange-50',
  'orange-100',
  'orange-200',
  'orange-300',
  'orange-400',
  'orange-500',
  'orange-600',
  'orange-700',
  'orange-800',
  'orange-900',

  'amber-50',
  'amber-100',
  'amber-200',
  'amber-300',
  'amber-400',
  'amber-500',
  'amber-600',
  'amber-700',
  'amber-800',
  'amber-900',

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

  'lime-50',
  'lime-100',
  'lime-200',
  'lime-300',
  'lime-400',
  'lime-500',
  'lime-600',
  'lime-700',
  'lime-800',
  'lime-900',

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

  'emerald-50',
  'emerald-100',
  'emerald-200',
  'emerald-300',
  'emerald-400',
  'emerald-500',
  'emerald-600',
  'emerald-700',
  'emerald-800',
  'emerald-900',

  'teal-50',
  'teal-100',
  'teal-200',
  'teal-300',
  'teal-400',
  'teal-500',
  'teal-600',
  'teal-700',
  'teal-800',
  'teal-900',

  'cyan-50',
  'cyan-100',
  'cyan-200',
  'cyan-300',
  'cyan-400',
  'cyan-500',
  'cyan-600',
  'cyan-700',
  'cyan-800',
  'cyan-900',

  'sky-50',
  'sky-100',
  'sky-200',
  'sky-300',
  'sky-400',
  'sky-500',
  'sky-600',
  'sky-700',
  'sky-800',
  'sky-900',

  'violet-50',
  'violet-100',
  'violet-200',
  'violet-300',
  'violet-400',
  'violet-500',
  'violet-600',
  'violet-700',
  'violet-800',
  'violet-900',

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

  'fuchsia-50',
  'fuchsia-100',
  'fuchsia-200',
  'fuchsia-300',
  'fuchsia-400',
  'fuchsia-500',
  'fuchsia-600',
  'fuchsia-700',
  'fuchsia-800',
  'fuchsia-900',

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

  'rose-50',
  'rose-100',
  'rose-200',
  'rose-300',
  'rose-400',
  'rose-500',
  'rose-600',
  'rose-700',
  'rose-800',
  'rose-900',

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
// setup code
</script>

<template>
  <div>
    <div
      class="mt-6 mb-12 px-2 pt-4 pb-8 border border-myPrimaryMediumGrayColor rounded"
    >
      <div class="mb-4">
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
        <div class="flex flex-row gap-1 items-center">
          <div
            @click="
              changeTransparency('bg');
              colorRefs.bg.transparent = true;
            "
            :class="{
              'bg-myPrimaryLightGrayColor': colorRefs.bg.transparent,
            }"
            class="rounded cursor-pointer p-2"
          >
            Remove transparency
          </div>

          <div
            @click="
              removeColor('bg');
              colorRefs.bg.none = true;
            "
            :class="{
              'bg-myPrimaryLightGrayColor': colorRefs.bg.none,
            }"
            class="rounded cursor-pointer p-2"
          >
            X icon
          </div>
          <div
            @click="colorRefs.bg.open = !colorRefs.bg.open"
            :class="{
              'bg-myPrimaryLightGrayColor': !colorRefs.bg.open,
            }"
            class="rounded cursor-pointer p-2"
          >
            Hide
          </div>
        </div>
      </div>

      <div
        :class="[colorRefs.bg.open ? 'max-h-full' : 'max-h-0']"
        class="flex flex-wrap overflow-hidden gap-1"
      >
        <span
          v-for="color in colors"
          :key="color"
          :class="'bg-' + color"
          class="inline-block cursor-pointer transform w-8 h-8 shadow-2xl border border-myPrimaryLightGrayColor"
          @click="changeColor('bg', color)"
        />
      </div>
    </div>

    <div
      class="mt-12 mb-12 px-2 pt-4 pb-8 border border-myPrimaryMediumGrayColor rounded"
    >
      <div class="mb-4">
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
        <div class="flex flex-row gap-1 items-center">
          <div
            @click="
              changeTransparency('text');
              colorRefs.text.transparent = true;
            "
            :class="{
              'bg-myPrimaryLightGrayColor': colorRefs.text.transparent,
            }"
            class="rounded cursor-pointer p-2"
          >
            Remove transparency
          </div>
          <div
            @click="
              removeColor('text');
              colorRefs.text.none = true;
            "
            :class="{
              'bg-myPrimaryLightGrayColor': colorRefs.text.none,
            }"
            class="rounded cursor-pointer p-2"
          >
            X icon
          </div>
          <div
            @click="colorRefs.text.open = !colorRefs.text.open"
            :class="{
              'bg-myPrimaryLightGrayColor': !colorRefs.text.open,
            }"
            class="rounded cursor-pointer p-2"
          >
            Hide
          </div>
        </div>
      </div>
      <div
        :class="[colorRefs.text.open ? 'max-h-full' : 'max-h-0']"
        class="flex flex-wrap overflow-hidden gap-1"
      >
        <span
          v-for="color in colors"
          :key="color"
          :class="'bg-' + color"
          class="inline-block cursor-pointer transform w-8 h-8 shadow-2xl border border-myPrimaryLightGrayColor"
          @click="changeColor('text', color)"
        />
      </div>
    </div>
  </div>
</template>
