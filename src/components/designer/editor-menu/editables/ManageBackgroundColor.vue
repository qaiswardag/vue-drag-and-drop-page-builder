<script setup>
import { useStore } from 'vuex';
import { computed, onMounted, watch } from 'vue';
import tailwindColors from '../../../../utils/tailwaind-colors';
import Designer from '../../../../composables/Designer';
import { CheckIcon, SwatchIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';

const customColorInput = ref(null);
const enabledCustomColor = ref(false);
const selectedHEXColor = ref([]);
const error = ref(null);

const handleCustomBackgroundColor = function () {
  const isHexColor = /^#([0-9A-Fa-f]{3}){1,2}$/.test(customColorInput.value);
  if (isHexColor === false) {
    error.value = 'Invalid HEX color. Remember to add #';
    return;
  }
  if (enabledCustomColor.value === false) {
    error.value = 'Please enable use of custom color.';
    return;
  }

  selectedHEXColor.value = [customColorInput.value];
  designer.handleCustomBackgroundColor(
    customColorInput.value,
    enabledCustomColor.value
  );

  customColorInput.value = '';
  error.value = null;
};
const handleRemoveTag = function () {
  customColorInput.value = '';
  selectedHEXColor.value = [];
  error.value = null;
};

watch(enabledCustomColor, (newValue) => {
  // remove inline custom style color
  if (newValue === true) {
    handleCustomBackgroundColor();
  }
  if (newValue === false) {
    designer.removeCustomColor();
  }
});

const store = useStore();
const colors = tailwindColors.backgroundColors();

const getBackgroundColor = computed(() => {
  return store.getters['designer/getBackgroundColor'];
});
const getBackgroundColorCustom = computed(() => {
  return store.getters['designer/getBackgroundColorCustom'];
});

const getEnabledCustomColorBackground = computed(() => {
  return store.getters['designer/getEnabledCustomColorBackground'];
});

watch(getEnabledCustomColorBackground, (newValue) => {
  // remove inline custom style color
  if (newValue === true) {
    enabledCustomColor.value = true;
  }
  if (newValue === false) {
    enabledCustomColor.value = false;
  }
});

const rgbToHex = function rgbToHex(r, g, b) {
  return (
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  );
};

onMounted(() => {
  if (
    typeof getEnabledCustomColorBackground.value === 'boolean' &&
    getEnabledCustomColorBackground.value === true
  ) {
    enabledCustomColor.value = getEnabledCustomColorBackground.value;
    // Extract the numbers from the RGB string
    let rgbValues = getBackgroundColorCustom.value.match(/\d+/g).map(Number);
    let hexColor = rgbToHex(...rgbValues); // Spread array values
    customColorInput.value = hexColor;
    error.value = null;
  }
});

const getBackgroundColorCustomHex = computed(() => {
  let rgbValues = getBackgroundColorCustom.value.match(/\d+/g).map(Number);
  return rgbToHex(...rgbValues);
});

const designer = new Designer(store);
</script>

<template>
  <div class="my-3 py-3">
    <label
      for="meta_title"
      class="myPrimaryInputLabel"
    >
      Current Background
    </label>
    <div
      class="flex flex-row hover:outline hover:outline-offset-0 hover:outline-myPrimaryBrandColor justify-between items-center myPrimaryGap py-2.5 px-3 cursor-default focus:bg-white rounded-md border border-myPrimaryMediumGrayColor focus:outline-none focus:ring-2 focus:ring-myPrimaryBrandColor focus:border-transparent"
    >
      <div class="relative flex items-center w-full py-0 p-0">
        <div class="flex items-center gap-2 justify-start">
          <div
            v-if="getBackgroundColor !== 'none'"
            class="myPrimaryColorPreview w-6 h-6 cursor-default"
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
            {{ getBackgroundColor === 'none' ? 'None' : getBackgroundColor }}
          </p>
        </div>
      </div>
      <div
        class="border-none rounded flex items-center justify-center h-full w-8"
      >
        <div class="myPrimaryParagraph text-myPrimaryDarkGrayColor border-none">
          <SwatchIcon class="h-5 w-5"></SwatchIcon>
        </div>
      </div>
    </div>

    <!-- Custom color - start -->
    <!-- Error - end -->
    <div class="flex gap-2 flex-col items-center justify-around">
      <div class="pb-4 mb-6 border-myPrimaryLightGrayColor w-full">
        <!-- Error - start -->
        <div class="min-h-[3.5rem] flex items-center mt-4">
          <div>
            <p
              v-if="error !== null"
              class="myPrimaryInputError my-0 py-0"
            >
              {{ error }}
            </p>
            <p
              v-if="
                enabledCustomColor === true && selectedHEXColor.length === 0
              "
              class="myPrimaryInputError my-0 py-0"
            >
              Using Custom Color? Please input a valid HEX code.
            </p>
          </div>
          <div>
            <div
              v-if="
                selectedHEXColor.length !== 0 &&
                error === null &&
                enabledCustomColor === true
              "
              @click="handleRemoveTag"
              class="flex flex-wrap justify-center items-center gap-2 myPrimaryTag py-3 my-0 w-full hover:bg-red-500 cursor-pointer text-center"
            >
              <template
                v-for="color in selectedHEXColor"
                :key="color"
              >
                <div
                  :data-color="color"
                  class="flex flex-wrap justify-center items-center gap-2"
                >
                  <p
                    class="w-full text-xs"
                    :data-color="color"
                  >
                    {{ color }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Custom HEX
        </label>
        <div class="flex items-center justify-start gap-2 w-full">
          <div
            class="relative flex items-center w-full border myPrimaryInput py-0 p-0"
          >
            <input
              v-model="customColorInput"
              type="text"
              placeholder="Custom background color.."
              autocomplete="off"
              class="myPrimaryInput border-none rounded-r-none ml-0 w-full"
              @keydown.enter.tab.prevent="handleCustomBackgroundColor()"
            />
            <div
              class="border border-gray-200 border-none rounded flex items-center justify-center h-full w-8"
            >
              <kbd class="myPrimaryParagraph text-gray-400 border-none">
                ⏎
              </kbd>
            </div>
          </div>

          <!-- Toggle start -->
          <Switch
            v-model="enabledCustomColor"
            :class="[
              enabledCustomColor ? 'bg-myPrimaryLinkColor' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-myPrimaryLinkColor focus:ring-offset-2',
            ]"
          >
            <span class="sr-only">Use setting</span>
            <span
              :class="[
                enabledCustomColor ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              ]"
            >
              <span
                :class="[
                  enabledCustomColor
                    ? 'opacity-0 ease-out duration-100'
                    : 'opacity-100 ease-in duration-200',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                ]"
                aria-hidden="true"
              >
                <svg
                  class="h-3 w-3 text-gray-400"
                  fill="none"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span
                :class="[
                  enabledCustomColor
                    ? 'opacity-100 ease-in duration-200'
                    : 'opacity-0 ease-out duration-100',
                  'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                ]"
                aria-hidden="true"
              >
                <svg
                  class="h-3 w-3 text-myPrimaryLinkColor"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path
                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                  />
                </svg>
              </span>
            </span>
          </Switch>
          <!-- Toggle end -->
        </div>
      </div>
    </div>
    <!-- Custom color - end -->
    <div class="grid grid-cols-1 gap-1">
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="color in colors.slice(1, 3)"
          :key="color"
          @click="designer.handleColor(color)"
          class="myPrimaryColorPreview flex justify-center items-center"
          :class="[color === getBackgroundColor ? '' : '', color]"
        >
          <template v-if="color === getBackgroundColor">
            <!-- Display the checkmark icon or any other indicator -->
            <CheckIcon
              class="w-6 h-6 text-white bg-black bg-opacity-50 rounded-full"
            >
            </CheckIcon>
          </template>
        </div>
        <div
          @click="designer.handleColor('none')"
          class="myPrimaryColorPreview relative bg-gray-100"
          :class="[getBackgroundColor === null ? 'rounded-full' : '']"
        >
          <XMarkIcon class="text-myPrimaryErrorColor stroke-2"></XMarkIcon>
        </div>
      </div>
      <div class="grid grid-cols-10 gap-1">
        <div
          v-for="color in colors.slice(3)"
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
