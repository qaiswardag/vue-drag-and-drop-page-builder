<template>
  <EditorAccordion>
    <template #title>Color settings</template>
    <template #content>
      <div @click="handleColorsSlideOver" class="mb-2 cursor-pointer">
        <div class="pt-0 pb-0 mb-6 border-b border-myPrimaryLightGrayColor">
          <div
            class="flex flex-row justify-start items-center myPrimaryGap mb-8"
          >
            <div
              class="myPrimaryColorPreview w-8 h-8"
              :class="[
                getCurrentElementBackgroundColor !== null
                  ? getCurrentElementBackgroundColor
                  : '',
              ]"
            ></div>
            <p class="myPrimaryParagraph font-medium">Background</p>
          </div>
        </div>
      </div>
      <SlideOverRight
        :open="showColorsSlideOverRight"
        :title="titleSlideOverRight"
        @colorsSlideOverButton="colorsSlideOverButton"
      >
        <!-- Content start -->
        <ManageBackgroundColors></ManageBackgroundColors>
        <!-- Content end -->
      </SlideOverRight>
    </template>
  </EditorAccordion>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import EditorAccordion from '../EditorAccordion.vue';
import SlideOverRight from '../../../slidebars/SlideOverRight.vue';
import ManageBackgroundColors from '../editables/ManageBackgroundColors.vue';

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

const getCurrentElementBackgroundColor = computed(() => {
  return store.getters['designer/getCurrentElementBackgroundColor'];
});
</script>
