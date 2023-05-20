<template>
  <div class="block px-4 ease-linear duration-200 pb-10">
    <img
      class="object-cover object-center w-full rounded-md"
      :src="getCurrentElement.src"
      @click="imageClick"
      alt="image"
    />

    <div class="mt-2">
      <button
        @click="imageClick"
        type="button"
        class="myPrimaryButton bg-violet-500 text-xs w-full"
      >
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
const emit = defineEmits(['previewCurrentDesign', 'signOutClick']);

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
// get current preview
const getCurrentPreview = computed(() => {
  return store.getters['designer/getCurrentPreview'];
});
//
// get current image from store
const getCurrentImage = computed(() => {
  return store.getters['designer/getCurrentImage'];
});
//
// array for saving existing image
const oldExistingImage = ref([]);
//
//
// use watch function to store watch new clicked element
watch(getCurrentImage, (newClickedElement) => {
  // set "old existing image" to an empty array if new element is clicked
  oldExistingImage.value = [];
});
//
// use watch function to store existing image
watch(getCurrentImage, (newImage, oldImage) => {
  // push all images into "old existing image" array. index 0 in the array is the saved image
  if (oldExistingImage.value.length === 0) {
    oldExistingImage.value.push(newImage);
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
  thirdButtonMedia.value = null;

  // handle click
  firstMediaButtonFunction.value = function () {
    // close media library modal
    openMediaModal.value = false;
  };
  //
  // handle click
  secondMediaButtonFunction.value = function () {
    // // store
    store.commit('designer/setNewImage', getCurrentPreview.value);
    //
    // // setters (mutation): current element from store
    store.commit('designer/setCurrentElement', getCurrentElement.value);

    // close media library modal
    openMediaModal.value = false;
  };
  //
  // end modal
};
</script>
