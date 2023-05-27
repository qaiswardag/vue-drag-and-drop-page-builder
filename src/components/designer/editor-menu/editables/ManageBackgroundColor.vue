<script setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import config from '../../../../utils/tailwaind-colors';
import Designer from '../../../../composables/Designer';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline';

// store
const store = useStore();

const colors = config.backgroundColors();

const getBackgroundColor = computed(() => {
  return store.getters['designer/getBackgroundColor'];
});

const designer = new Designer(store);
</script>

<template>
  <div class="mt-6 pt-4 pb-8">
    <div class="flex flex-row justify-start items-center myPrimaryGap mb-8">
      <div
        v-if="getBackgroundColor !== null"
        class="myPrimaryColorPreview w-8 h-8 cursor-default"
        :class="[getBackgroundColor]"
      ></div>
      <div
        v-if="getBackgroundColor === null"
        class="w-8 h-8 cursor-default"
        :class="[getBackgroundColor]"
      >
        <div class="myPrimaryColorPreview bg-gray-50">
          <XMarkIcon class="text-myPrimaryErrorColor stroke-2"></XMarkIcon>
        </div>
      </div>
      <p class="myPrimaryParagraph font-medium">Current Background</p>
    </div>
    <div class="grid grid-cols-1 gap-1">
      <div class="grid grid-cols-9 gap-1">
        <div
          v-for="color in colors.slice(0, 2)"
          :key="color"
          @click="designer.handleColor(color)"
          class="myPrimaryColorPreview flex justify-center items-center"
          :class="[color === getBackgroundColor ? '' : '', color]"
        >
          <template v-if="color === getBackgroundColor">
            <!-- Display the checkmark icon or any other indicator -->
            <CheckIcon
              class="w-6 h-6 text-white bg-black bg-opacity-50 rounded-full"
            ></CheckIcon>
          </template>
        </div>
        <div
          @click="designer.handleColor('removeColor')"
          class="myPrimaryColorPreview relative bg-gray-100"
          :class="[getBackgroundColor === null ? 'rounded-full' : '']"
        >
          <XMarkIcon class="text-myPrimaryErrorColor stroke-2"></XMarkIcon>
        </div>
      </div>
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="color in colors.slice(2)"
          :key="color"
          @click="designer.handleColor(color)"
          class="myPrimaryColorPreview flex justify-center items-center"
          :class="[color === getBackgroundColor ? '' : '', color]"
        >
          <template v-if="color === getBackgroundColor">
            <!-- Display the checkmark icon or any other indicator -->
            <CheckIcon
              class="w-6 h-6 text-white bg-black bg-opacity-50 rounded-full"
            ></CheckIcon>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
