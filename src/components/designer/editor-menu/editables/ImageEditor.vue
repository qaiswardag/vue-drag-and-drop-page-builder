<template>
  <div class="block px-4 ease-linear duration-200 pb-10 cursor-pointer">
    <img
      v-if="getCurrentImagePreview !== undefined"
      class="object-cover object-center w-full rounded-md"
      :src="getCurrentImagePreview"
      @click="imageClick"
      alt="image"
    />

    <div class="mt-4">
      <button
        @click="imageClick"
        type="button"
        class="myPrimaryButton gap-2 items-center w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Update image
      </button>
    </div>
  </div>

  <MediaLibraryModal
    :open="openMediaModal"
    :title="titleMedia"
    :description="descriptionMedia"
    :firstButtonText="firstButtonMedia"
    :secondButtonText="secondButtonMedia"
    :thirdButtonText="thirdButtonMedia"
    @firstMediaButtonFunction="firstMediaButtonFunction"
    @secondMediaButtonFunction="secondMediaButtonFunction"
    @thirdMediaButtonFunction="thirdMediaButtonFunction"
  >
  </MediaLibraryModal>
</template>

<script setup>
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';
import EditorAccordion from '../EditorAccordion.vue';
import MediaLibraryModal from '../../../modal/MediaLibraryModal.vue';

// store
const store = useStore();
// emit
const emit = defineEmits(['previewCurrentDesign']);

//
// use media library
const openMediaModal = ref(false);
// modal content
const titleMedia = ref('');
const descriptionMedia = ref('');
const firstButtonMedia = ref('');
const secondButtonMedia = ref(null);
const thirdButtonMedia = ref(null);
// set dynamic modal handle functions
const firstMediaButtonFunction = ref(null);
const secondMediaButtonFunction = ref(null);
const thirdMediaButtonFunction = ref(null);
//
//
// get current element from store
const getComponent = computed(() => {
  return store.getters['designer/getComponent'];
});
//
//
//
// get current image from store
const getCurrentImagePreview = computed(() => {
  return store.getters['designer/getCurrentImagePreview'];
});
const getCurrentClickedImage = computed(() => {
  return store.getters['designer/getCurrentClickedImage'];
});
//
// array for saving existing image
const oldExistingImage = ref(null);
//
//
// use watch function to store watch new clicked element
watch(getCurrentImagePreview, (newClickedElement) => {
  // set "old existing image" to an empty array if new element is clicked
  oldExistingImage.value = newClickedElement;
});
//
// use watch function to store existing image
watch(getCurrentImagePreview, (newImage, oldImage) => {
  // push all images into "old existing image" array. index 0 in the array is the saved image
  if (oldExistingImage.value !== null) {
    oldExistingImage.value = newImage;
  }
});
//
// image click
const imageClick = function () {
  // open modal to true
  openMediaModal.value = true;

  // set media library modal standards
  titleMedia.value = 'Update image';
  descriptionMedia.value = null;
  firstButtonMedia.value = 'Close';
  secondButtonMedia.value = 'Select image';

  // handle click
  firstMediaButtonFunction.value = function () {
    // close media library modal
    openMediaModal.value = false;
  };
  //
  // handle click
  secondMediaButtonFunction.value = function () {
    if (
      getCurrentClickedImage.value &&
      getCurrentClickedImage.value.file === null
    ) {
      store.commit('designer/setCurrentImagePreview', oldExistingImage.value);
    }
    if (
      getCurrentClickedImage.value &&
      getCurrentClickedImage.value.file !== null
    ) {
      store.commit(
        'designer/setCurrentImagePreview',
        getCurrentClickedImage.value.file
      );
    }

    // close media library modal
    openMediaModal.value = false;
  };
  //
  // end modal
};
</script>
