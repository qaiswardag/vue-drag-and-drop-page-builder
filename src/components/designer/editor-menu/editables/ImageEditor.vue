<template>
  <div class="block px-4 ease-linear duration-200 pb-10 cursor-pointer">
    <img
      v-if="
        getCurrentDisplayedImage !== undefined &&
        getCurrentDisplayedImage !== null
      "
      class="object-cover object-center w-full rounded-md"
      :src="getCurrentDisplayedImage"
      @click="imageClick"
      alt="image"
    />

    <div
      v-if="
        getCurrentDisplayedImage !== undefined &&
        getCurrentDisplayedImage !== null
      "
      class="mt-4"
    >
      <button
        @click="imageClick"
        type="button"
        class="myPrimaryButton gap-2 items-center w-full"
      >
        <PhotoIcon class="w-4 h-4 stroke-2"></PhotoIcon>
        Update image
      </button>
    </div>
  </div>

  <MediaLibraryModal
    :open="showMediaModal"
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
import { PhotoIcon } from '@heroicons/vue/24/outline';
import Designer from '../../../../composables/Designer';

const store = useStore();
const designer = new Designer(store);

//
// use media library
const showMediaModal = ref(false);
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
//
// get current image from store
const getCurrentDisplayedImage = computed(() => {
  return store.getters['designer/getCurrentDisplayedImage'];
});
//
//
// image click
const imageClick = function () {
  // open modal to true
  showMediaModal.value = true;

  // set media library modal standards
  titleMedia.value = 'Update image';
  descriptionMedia.value = null;
  firstButtonMedia.value = 'Close';
  secondButtonMedia.value = 'Select image';

  // handle click
  firstMediaButtonFunction.value = function () {
    // close media library modal
    showMediaModal.value = false;
  };
  //
  // handle click
  secondMediaButtonFunction.value = function () {
    designer.imageClick();
    // close media library modal
    showMediaModal.value = false;
  };
  //
  // end modal
};
</script>
