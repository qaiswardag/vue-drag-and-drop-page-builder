<template>
  <EditorAccordion>
    <template #title>Padding</template>
    <template #content>
      <div class="my-2">
        <label for="y_axis" class="myPrimaryInputLabel">
          Padding Y-axis:
        </label>

        <div>
          <select
            v-model="ySelected"
            @change="yPaddingChange"
            id="y_axis"
            class="myPrimarySelect"
          >
            <option
              v-for="padding in TAILWIND_NUMBER_PROPERTIES"
              :key="padding"
            >
              {{ padding }}
            </option>
          </select>
        </div>
      </div>

      <div class="my-2">
        <label for="x_axis" class="myPrimaryInputLabel">
          Padding X-axis:
        </label>
        <div>
          <select
            v-model="xSelected"
            @change="xPaddingChange"
            id="x_axis"
            class="myPrimarySelect"
          >
            <option
              v-for="padding in TAILWIND_NUMBER_PROPERTIES"
              :key="padding"
            >
              {{ padding }}
            </option>
          </select>
        </div>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import EditorAccordion from '../EditorAccordion.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { TAILWIND_NUMBER_PROPERTIES } from '../../../../config/properties';
import { useStore } from 'vuex';

// store
const store = useStore();
// getters: current element from store
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
});

const ySelected = ref('none');
const xSelected = ref('none');

// update y axis
const yPaddingChange = function () {
  // delete existing "py" padding class
  TAILWIND_NUMBER_PROPERTIES.forEach((number) => {
    getCurrentElement.value.classList.remove(`py-${number}`);
  });
  // add "py-" padding class
  getCurrentElement.value.classList.add(`py-${ySelected.value}`);

  // setters (mutation): current element from store
  store.commit('designer/setCurrentElement', getCurrentElement.value);
};
// update x axis
const xPaddingChange = function () {
  // delete existing "px" padding class
  TAILWIND_NUMBER_PROPERTIES.forEach((number) => {
    getCurrentElement.value.classList.remove(`px-${number}`);
  });
  // add "px-" padding class
  getCurrentElement.value.classList.add(`px-${xSelected.value}`);

  // setters (mutation): current element from store
  store.commit('designer/setCurrentElement', getCurrentElement.value);
};
// get current element outer HTML
const getCurrentElementOuterHTML = computed(() => {
  return getCurrentElement?.value?.outerHTML
    ? getCurrentElement?.value?.outerHTML
    : [];
});
//
// watch for any changes in "curent element"
// Update "py" and "px padding when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  newElement = getCurrentElement.value;

  if (newElement.classList === undefined) {
    return;
  }
  // define regex
  const pyPaddingRegex = /py\-[0-96]/;
  const pxPaddingRegex = /px\-[0-96]/;

  // py- padding class
  // check if py- padding class exist in current clicked html element
  const yPaddingClassExist = Array.from(newElement.classList).some(
    (singleClass) => {
      if (pyPaddingRegex.test(singleClass)) {
        return true;
      } else {
        return false;
      }
    }
  );
  // if py- padding class exist, update ySelected
  // add py- padding class to ySelected
  if (yPaddingClassExist) {
    Array.from(newElement.classList).forEach((singleClass) => {
      if (pyPaddingRegex.test(singleClass)) {
        // extract number from example py-2
        //const extractNumber = parseFloat("py-1.5");
        const extractNumber = Number(singleClass.match(/\d+((\.|,)\d+)?/)[0]);

        ySelected.value = extractNumber;
      }
    });
  }
  // add 'none' to ySelected
  if (!yPaddingClassExist) {
    ySelected.value = 'none';
  }
  // py- padding class
  // check if px- padding class exist in current clicked html element
  const xPaddingClassExist = Array.from(newElement.classList).some(
    (singleClass) => {
      if (pxPaddingRegex.test(singleClass)) {
        return true;
      } else {
        return false;
      }
    }
  );
  // if px- padding class exist, update ySelected
  // add px- padding class to ySelected
  if (xPaddingClassExist) {
    Array.from(newElement.classList).forEach((singleClass) => {
      if (pxPaddingRegex.test(singleClass)) {
        // extract number from example py-2
        const extractNumber = Number(singleClass.match(/\d+((\.|,)\d+)?/)[0]);
        xSelected.value = extractNumber;
      }
    });
  }
  // add 'none' to ySelected
  if (!xPaddingClassExist) {
    xSelected.value = 'none';
  }
});
</script>
