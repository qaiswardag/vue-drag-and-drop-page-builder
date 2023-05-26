<script setup>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import config from '../../../../utils/tailwaind-colors';
import Designer from '../../../../composables/Designer';

// store
const store = useStore();

// sort colors
const colors = config.backgroundColors.sort(function (a, b) {
  return (
    config.backgroundColors.indexOf(a) - config.backgroundColors.indexOf(b)
  );
});

const getCurrentElementBackgroundColor = computed(() => {
  return store.getters['designer/getCurrentElementBackgroundColor'];
});
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
});

// // handle color click
Designer.handleColor(color);
// const handleColor = function (color) {
//   // iterate over each color in the colors array
//   for (let singleColor of colors) {
//     // check if the current element has CSS color class
//     if (getCurrentElement.value.classList.contains(singleColor) === true) {
//       // remove color
//       getCurrentElement.value.classList.remove(singleColor);
//     }

//     // check if the current element does not have CSS color class
//     if (getCurrentElement.value.classList.contains(singleColor) === false) {
//       // add color
//       getCurrentElement.value.classList.add(color);

//       // update the current element in the store
//       store.commit('designer/setCurrentElementBackgroundColor', color);
//       store.commit('designer/setCurrentElement', getCurrentElement.value);
//     }
//   }
// };
</script>

<template>
  <div
    class="mt-6 mb-12 px-2 pt-4 pb-8 border border-myPrimaryMediumGrayColor rounded"
  >
    <div class="pt-0 pb-0 mb-6 border-b border-myPrimaryLightGrayColor">
      <div class="flex flex-row justify-start items-center myPrimaryGap mb-8">
        <div
          class="w-8 h-8 shadow-2xl border border-gray-400"
          :class="[
            getCurrentElementBackgroundColor !== null
              ? getCurrentElementBackgroundColor
              : '',
          ]"
        ></div>
        <p class="myPrimaryParagraph font-medium">Background</p>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-1">
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="color in colors.slice(0, 2)"
          :key="color"
          @click="handleColor(color)"
          class="myPrimaryColorPreview"
          :class="color"
        ></div>
      </div>
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="color in colors.slice(2)"
          :key="color"
          @click="handleColor(color)"
          class="myPrimaryColorPreview"
          :class="color"
        ></div>
      </div>
    </div>
  </div>
</template>
