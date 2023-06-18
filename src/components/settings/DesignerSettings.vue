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
</script>

<template>
  <SlideOverRightParent
    :open="showAdvancedSettingsSlideOverRight"
    :title="titleSettingsSlideOverRight"
    @slideOverButton="settingsAdvancedSlideOverButton"
  >
    <AdvancedDesignerSettings></AdvancedDesignerSettings>
  </SlideOverRightParent>
  <!-- Advanced Settings - start -->
  <div class="my-8">
    <div
      class="flex items-left flex-col myPrimaryGap border-myPrimaryMediumGrayColor"
    >
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
