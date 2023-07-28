<template>
  <EditorAccordion>
    <template #title>Color & Opacity settings</template>
    <template #content>
      <!-- Background color - start -->
      <div class="mb-2">
        <div class="my-3 py-3">
          <label class="myPrimaryInputLabel"> Background color </label>
          <div
            @click="handleBackgroundColorsSlideOver"
            class="flex flex-row justify-between items-center myPrimaryGap py-2.5 px-3 cursor-pointer hover:border-transparent hover:ring-2 hover:ring-myPrimaryBrandColor focus:bg-white rounded-md border border-myPrimaryMediumGrayColor focus:outline-none focus:ring-2 focus:ring-myPrimaryBrandColor focus:border-transparent"
          >
            <div class="relative flex items-center w-full py-0 p-0">
              <div class="flex items-center gap-2 justify-start">
                <div
                  v-if="
                    getBackgroundColor !== null && getBackgroundColor !== 'none'
                  "
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
      <!-- Text color - start -->
      <div class="mb-2">
        <div class="my-3 py-3">
          <label class="myPrimaryInputLabel"> Text color </label>
          <div
            @click="handleTextColorsSlideOver"
            class="flex flex-row justify-between items-center myPrimaryGap py-2.5 px-3 cursor-pointer hover:border-transparent hover:ring-2 hover:ring-myPrimaryBrandColor focus:bg-white rounded-md border border-myPrimaryMediumGrayColor focus:outline-none focus:ring-2 focus:ring-myPrimaryBrandColor focus:border-transparent"
          >
            <div class="relative flex items-center w-full py-0 p-0">
              <div class="flex items-center gap-2 justify-start">
                <div
                  v-if="getTextColor !== null && getTextColor !== 'none'"
                  class="myPrimaryColorPreview w-6 h-6 cursor-pointer"
                  :class="[getTextColor?.replace('text', 'bg')]"
                  :style="{ backgroundColor: getTextColorCustom }"
                ></div>
                <div
                  v-if="getTextColor === 'none'"
                  class="w-6 h-6 cursor-default"
                >
                  <div
                    class="myPrimaryColorPreview bg-gray-50"
                    :style="{ color: getTextColorCustom }"
                  >
                    <XMarkIcon
                      v-if="
                        getTextColorCustom === null ||
                        getTextColorCustom.length === 0
                      "
                      class="text-myPrimaryErrorColor stroke-2"
                    ></XMarkIcon>
                  </div>
                </div>
                <p
                  v-if="getTextColorCustom"
                  class="myPrimaryParagraph"
                >
                  {{ getTextColorCustomHex }}
                </p>
                <p
                  v-if="!getTextColorCustom"
                  class="myPrimaryParagraph"
                >
                  {{ getTextColor === 'none' ? 'None' : getTextColor }}
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
      <!-- Text color - end -->

      <ManageOpacity></ManageOpacity>
      <ManageBackgroundOpacity></ManageBackgroundOpacity>

      <SlideOverRight
        :open="showBackgroundColorsSlideOverRight"
        :title="titleBackgroundColorsSlideOverRight"
        @slideOverButton="backgroundColorsSlideOverButton"
      >
        <ManageBackgroundColor></ManageBackgroundColor>
      </SlideOverRight>
      <SlideOverRight
        :open="showTextColorsSlideOverRight"
        :title="titleTextColorsSlideOverRight"
        @slideOverButton="textColorsSlideOverButton"
      >
        <ManageTextColor></ManageTextColor>
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
import ManageTextColor from './ManageTextColor.vue';
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
const showBackgroundColorsSlideOverRight = ref(false);
const showTextColorsSlideOverRight = ref(false);
const titleBackgroundColorsSlideOverRight = ref(null);
const titleTextColorsSlideOverRight = ref(null);

// handle slideover window
const handleBackgroundColorsSlideOver = function () {
  titleBackgroundColorsSlideOverRight.value = 'Background color';
  showBackgroundColorsSlideOverRight.value = true;
};
// handle slideover window
const handleTextColorsSlideOver = function () {
  titleTextColorsSlideOverRight.value = 'Text color';
  showTextColorsSlideOverRight.value = true;
};
// handle slideover window
const backgroundColorsSlideOverButton = function () {
  showBackgroundColorsSlideOverRight.value = false;
};
const textColorsSlideOverButton = function () {
  showTextColorsSlideOverRight.value = false;
};

const getBackgroundColor = computed(() => {
  return store.getters['designer/getBackgroundColor'];
});
const getTextColor = computed(() => {
  return store.getters['designer/getTextColor'];
});
const getBackgroundColorCustom = computed(() => {
  return store.getters['designer/getBackgroundColorCustom'];
});
const getTextColorCustom = computed(() => {
  return store.getters['designer/getTextColorCustom'];
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
const getTextColorCustomHex = computed(() => {
  let rgbValues = getTextColorCustom.value.match(/\d+/g).map(Number);
  return rgbToHex(...rgbValues);
});
</script>
