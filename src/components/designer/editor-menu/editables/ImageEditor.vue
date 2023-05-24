<template>
  <div class="block px-4 ease-linear duration-200 pb-10">
    <img
      v-if="getCurrentImagePreview !== undefined"
      class="object-cover object-center w-full rounded-md"
      :src="getCurrentImagePreview"
      @click="imageClick"
      alt="image"
    />

    <div class="mt-2">
      <button @click="imageClick" type="button" class="myPrimaryButton w-full">
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
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
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
  secondButtonMedia.value = 'Save changes';

  // handle click
  firstMediaButtonFunction.value = function () {
    // close media library modal
    openMediaModal.value = false;
  };
  //
  // handle click
  secondMediaButtonFunction.value = function () {
    if (getCurrentClickedImage.value === null) {
      store.commit('designer/setCurrentImagePreview', oldExistingImage.value);
    }
    if (getCurrentClickedImage.value !== null) {
      store.commit(
        'designer/setCurrentImagePreview',
        getCurrentClickedImage.value
      );
    }

    // close media library modal
    openMediaModal.value = false;
  };
  //
  // end modal
};
</script>
