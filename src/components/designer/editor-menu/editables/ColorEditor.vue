<template>
  <EditorAccordion>
    <template #title>Color settings</template>
    <template #content>
      <div @click="handleColorsSlideOver" class="mb-2">
        <div class="pt-0 pb-0 mb-6 border-b border-myPrimaryLightGrayColor">
          <label for="meta_title" class="myPrimaryInputLabel">
            Background:
          </label>
          <div
            class="flex flex-row justify-start items-center myPrimaryGap mt-4 py-3 px-2 cursor-pointer focus:bg-white rounded-md py-3 px-3 border border-myPrimaryMediumGrayColor shadow-sm focus:outline-none focus:ring-2 focus:ring-myPrimaryBrandColor focus:border-transparent"
          >
            <div
              v-if="getBackgroundColor !== 'none'"
              class="myPrimaryColorPreview w-8 h-8"
              :class="[getBackgroundColor]"
              :style="{ backgroundColor: getBackgroundColorCustom }"
            ></div>
            <div
              v-if="getBackgroundColor === 'none'"
              class="w-8 h-8 cursor-default"
            >
              <div
                class="myPrimaryColorPreview bg-gray-50"
                :style="{ backgroundColor: getBackgroundColorCustom }"
              >
                <XMarkIcon
                  v-if="
                    getBackgroundColorCustom === null ||
                    getBackgroundColorCustom.length === 0
                  "
                  class="text-myPrimaryErrorColor stroke-2"
                ></XMarkIcon>
              </div>
            </div>
            <p v-if="getBackgroundColorCustom" class="myPrimaryParagraph">
              {{ getBackgroundColorCustomHex }}
            </p>
            <p v-if="!getBackgroundColorCustom" class="myPrimaryParagraph">
              {{ getBackgroundColor === 'none' ? 'None' : getBackgroundColor }}
            </p>
          </div>
        </div>
      </div>
      <SlideOverRight
        :open="showColorsSlideOverRight"
        :title="titleSlideOverRight"
        @slideOverButton="colorsSlideOverButton"
      >
        <ManageBackgroundColor></ManageBackgroundColor>
      </SlideOverRight>
    </template>
  </EditorAccordion>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import EditorAccordion from '../EditorAccordion.vue';
import SlideOverRight from '../../../slidebars/SlideOverRight.vue';
import ManageBackgroundColor from './ManageBackgroundColor.vue';

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

// handle slideover window
const handleColorsSlideOver = function () {
  titleSlideOverRight.value = 'Manage colors';
  showColorsSlideOverRight.value = true;
};
// handle slideover window
const colorsSlideOverButton = function () {
  showColorsSlideOverRight.value = false;
};

const getBackgroundColor = computed(() => {
  return store.getters['designer/getBackgroundColor'];
});
const getBackgroundColorCustom = computed(() => {
  return store.getters['designer/getBackgroundColorCustom'];
});

const rgbToHex = function rgbToHex(r, g, b) {
  return (
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

const getBackgroundColorCustomHex = computed(() => {
  let rgbValues = getBackgroundColorCustom.value.match(/\d+/g).map(Number);
  return rgbToHex(...rgbValues);
});
</script>
