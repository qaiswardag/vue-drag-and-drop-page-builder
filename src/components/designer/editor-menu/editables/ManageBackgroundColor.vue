<script setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import config from '../../../../utils/tailwaind-colors';
import Designer from '../../../../composables/Designer';
import { XMarkIcon } from '@heroicons/vue/24/outline';

// store
const store = useStore();

const colors = config.backgroundColors();

const getCurrentElementBackgroundColor = computed(() => {
  return store.getters['designer/getCurrentElementBackgroundColor'];
});

const designer = new Designer(store);
</script>

<template>
  <div class="mt-6 pt-4 pb-8">
    <div class="flex flex-row justify-start items-center myPrimaryGap mb-8">
      <div
        v-if="getCurrentElementBackgroundColor !== null"
        class="myPrimaryColorPreview w-8 h-8 cursor-default"
        :class="[getCurrentElementBackgroundColor]"
      ></div>
      <div
        v-if="getCurrentElementBackgroundColor === null"
        class="myPrimaryColorPreview w-8 h-8 cursor-default"
        :class="[getCurrentElementBackgroundColor]"
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
          class="myPrimaryColorPreview"
          :class="color"
        ></div>
        <div
          @click="designer.handleColor('removeColor')"
          class="myPrimaryColorPreview bg-gray-50"
        >
          <XMarkIcon class="text-myPrimaryErrorColor stroke-2"></XMarkIcon>
        </div>
      </div>
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="color in colors.slice(2)"
          :key="color"
          @click="designer.handleColor(color)"
          class="myPrimaryColorPreview"
          :class="color"
        ></div>
      </div>
    </div>
  </div>
</template>
