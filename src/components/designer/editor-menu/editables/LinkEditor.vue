<template>
  <EditorAccordion>
    <template #title>Link</template>
    <template #content>
      <div class="my-3 py-3">
        <div class="flex items-center justify-between gap-2 w-full">
          <p class="myPrimaryParagraph">Enable URL</p>
          <!-- Toggle start -->
          <Switch
            v-model="elementHasActiveLink"
            :class="[
              elementHasActiveLink ? 'bg-myPrimaryLinkColor' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-myPrimaryLinkColor focus:ring-offset-2',
            ]"
          >
            <span class="sr-only">Use setting</span>
            <span
              :class="[
                elementHasActiveLink ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              ]"
            >
              <span
                :class="[
                  elementHasActiveLink
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
                  elementHasActiveLink
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
      <div
        v-if="elementHasActiveLink === true"
        class="my-3 py-3"
      >
        <div
          class="relative flex items-center w-full border myPrimaryInput py-0 p-0"
        >
          <input
            v-model="urlInput"
            type="text"
            placeholder="URL.."
            autocomplete="off"
            class="myPrimaryInput border-none rounded-r-none ml-0 w-full"
            @keydown.enter.tab.prevent="handleCustomURL()"
          />
          <div
            class="border border-gray-200 border-none rounded flex items-center justify-center h-full w-8"
          >
            <kbd class="myPrimaryParagraph text-gray-400 border-none"> ⏎ </kbd>
          </div>
        </div>

        <p
          v-if="getCustomURlSuccessMessage !== null"
          class="myPrimaryParagraph text-myPrimarySuccesColor mt-1"
        >
          {{ getCustomURlSuccessMessage }}
        </p>
        <p
          v-if="getCustomURlValidation !== null"
          class="myPrimaryParagraphError mt-1"
        >
          {{ getCustomURlValidation }}
        </p>

        <div class="my-3 py-3">
          <div class="flex items-center justify-between gap-2 w-full">
            <p class="myPrimaryParagraph">Open in new tab</p>
            <!-- Toggle start -->
            <Switch
              v-model="openLinkInNewTab"
              :class="[
                openLinkInNewTab ? 'bg-myPrimaryLinkColor' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-myPrimaryLinkColor focus:ring-offset-2',
              ]"
            >
              <span class="sr-only">Use setting</span>
              <span
                :class="[
                  openLinkInNewTab ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                ]"
              >
                <span
                  :class="[
                    openLinkInNewTab
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
                    openLinkInNewTab
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
    </template>
  </EditorAccordion>
</template>

<script setup>
import Designer from '../../../../composables/Designer';
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import { CheckIcon, SwatchIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { Switch } from '@headlessui/vue';

const store = useStore();

const designer = new Designer(store);

const elementHasActiveLink = ref(false);
const urlInput = ref(null);
const openLinkInNewTab = ref(false);

const getCustomURlSuccessMessage = computed(() => {
  return store.getters['designer/getCustomURlSuccessMessage'];
});
const getCustomURlValidation = computed(() => {
  return store.getters['designer/getCustomURlValidation'];
});
const getCustomURLInput = computed(() => {
  return store.getters['designer/getCustomURLInput'];
});
const getElementHasActiveLink = computed(() => {
  return store.getters['designer/getElementHasActiveLink'];
});
const getOpenLinkInNewTab = computed(() => {
  return store.getters['designer/getOpenLinkInNewTab'];
});

watch(
  getCustomURLInput,
  (newValue) => {
    urlInput.value = newValue;
  },
  { immediate: true }
);
watch(
  getElementHasActiveLink,
  (newValue) => {
    elementHasActiveLink.value = newValue;
  },
  { immediate: true }
);
watch(
  getOpenLinkInNewTab,
  (newValue) => {
    openLinkInNewTab.value = newValue;
  },
  { immediate: true }
);

watch(elementHasActiveLink, (newValue) => {
  designer.handleCustomURL(newValue, urlInput.value);
});

const handleCustomURL = function () {
  designer.handleCustomURL(elementHasActiveLink.value, urlInput.value);
};
</script>
