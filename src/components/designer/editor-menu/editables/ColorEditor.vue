<template>
  <EditorAccordion>
    <template #title>Color & Opacity settings</template>
    <template #content>
      <!-- Background color - start -->
      <div
        @click="handleColorsSlideOver"
        class="mb-2"
      >
        <div class="my-3 py-3">
          <label
            for="meta_title"
            class="myPrimaryInputLabel"
          >
            Background color
          </label>
          <div
            class="flex flex-row justify-between items-center myPrimaryGap py-2.5 px-3 cursor-pointer focus:bg-white rounded-md border border-myPrimaryMediumGrayColor focus:outline-none focus:ring-2 focus:ring-myPrimaryBrandColor focus:border-transparent"
          >
            <div class="relative flex items-center w-full py-0 p-0">
              <div class="flex items-center gap-2 justify-start">
                <div
                  v-if="getBackgroundColor !== 'none'"
                  class="myPrimaryColorPreview w-6 h-6 cursor-pointer"
                  :class="[getBackgroundColor]"
                  :style="{ backgroundColor: getBackgroundColorCustom }"
                ></div>
                <div
                  v-if="getBackgroundColor === 'none'"
                  class="w-6 h-6 cursor-default"
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
                <p
                  v-if="getBackgroundColorCustom"
                  class="myPrimaryParagraph"
                >
                  {{ getBackgroundColorCustomHex }}
                </p>
                <p
                  v-if="!getBackgroundColorCustom"
                  class="myPrimaryParagraph"
                >
                  {{
                    getBackgroundColor === 'none' ? 'None' : getBackgroundColor
                  }}
                </p>
              </div>
            </div>
            <div
              class="border-none rounded flex items-center justify-center h-full w-8"
            >
              <div
                class="myPrimaryParagraph text-myPrimaryDarkGrayColor border-none"
              >
                <SwatchIcon class="h-5 w-5"></SwatchIcon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Background color - end -->

      <ManageOpacity></ManageOpacity>
      <ManageBackgroundOpacity></ManageBackgroundOpacity>

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
import ManageBackgroundOpacity from './ManageBackgroundOpacity.vue';
import ManageOpacity from './ManageOpacity.vue';

import {
  XMarkIcon,
  SwatchIcon,
  CubeTransparentIcon,
} from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';
import Designer from '../../../../composables/Designer';

// store
const store = useStore();
const designer = new Designer(store);
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
