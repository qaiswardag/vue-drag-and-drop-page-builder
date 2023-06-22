<script setup>
import SlideOverRightParent from '../slidebars/SlideOverRightParent.vue';
import AdvancedDesignerSettings from './AdvancedDesignerSettings.vue';
import { ref } from 'vue';

const showAdvancedSettingsSlideOverRight = ref(false);
const titleSettingsSlideOverRight = ref('');

// handle slideover window
const handleAdvancedSettingsSlideOver = function () {
  titleSettingsSlideOverRight.value = 'Advanced Settings';
  showAdvancedSettingsSlideOverRight.value = true;
};

// handle slideover window
const settingsAdvancedSlideOverButton = function () {
  showAdvancedSettingsSlideOverRight.value = false;
};

const handleDownloadPageLayout = function () {
  //
};
</script>

<template>
  <SlideOverRightParent
    :open="showAdvancedSettingsSlideOverRight"
    :title="titleSettingsSlideOverRight"
    @slideOverButton="settingsAdvancedSlideOverButton"
  >
    <AdvancedDesignerSettings></AdvancedDesignerSettings>
  </SlideOverRightParent>
  <!-- Download Layout layout - start -->
  <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
    <div class="flex items-left flex-col gap-1">
      <h3 class="myFourthHeader">Download Page HTML</h3>
      <p class="myPrimaryParagraph text-xs">Download current page layout.</p>
    </div>
    <div class="mt-4">
      <button
        @click="handleDownloadPageLayout"
        type="button"
        class="myPrimaryButton text-xs"
      >
        Download Page
      </button>
    </div>
  </div>
  <!-- Download Layout - end -->

  <!-- Advanced Settings - start -->
  <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
    <div class="flex items-left flex-col gap-1">
      <h3 class="myFourthHeader">Advanced Settings</h3>
      <p class="myPrimaryParagraph text-xs">
        Manage advanced settings here. Like an overview of Selected Element,
        Component, and Components in real-time.
      </p>
    </div>
    <div class="mt-4">
      <button
        @click="handleAdvancedSettingsSlideOver"
        type="button"
        class="myPrimaryButton text-xs"
      >
        Advanced Settings
      </button>
    </div>
  </div>
  <!-- Advanced Settings - end -->
</template>
