<script setup>
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';
import DynamicModal from '../../../modal/DynamicModal.vue';
import Designer from '../../../../composables/Designer';
import { ref, computed } from 'vue';

const showModalDeleteComponent = ref(false);

// use dynamic model
const typeModal = ref('');
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);

const store = useStore();
const designer = new Designer(store);

// remove component
const deleteComponent = function (e) {
  // set modal standards
  showModalDeleteComponent.value = true;
  typeModal.value = 'delete';
  gridColumnModal.value = 2;
  titleModal.value = 'Delete component';
  descriptionModal.value = 'Are you sure you want to delete this component?';
  firstButtonModal.value = 'Close';
  secondButtonModal.value = null;
  thirdButtonModal.value = 'Delete';

  // handle click
  firstModalButtonFunction.value = function () {
    // set open modal
    showModalDeleteComponent.value = false;
  };
  //
  // handle click
  thirdModalButtonFunction.value = function () {
    designer.deleteComponent(e);
    // set open modal
    showModalDeleteComponent.value = false;
  };
  // end modal
};
//
</script>

<template>
  <DynamicModal
    :show="showModalDeleteComponent"
    :type="typeModal"
    :gridColumnAmount="gridColumnModal"
    :title="titleModal"
    :description="descriptionModal"
    :firstButtonText="firstButtonModal"
    :secondButtonText="secondButtonModal"
    :thirdButtonText="thirdButtonModal"
    @firstModalButtonFunction="firstModalButtonFunction"
    @secondModalButtonFunction="secondModalButtonFunction"
    @thirdModalButtonFunction="thirdModalButtonFunction"
  >
    <header></header>
    <main></main>
  </DynamicModal>
  <div
    class="mx-auto mt-4 bg-myPrimaryLightGrayColor absolute z-40 overflow-hidden left-0 right-0 top-0 text-myPrimaryDarkGrayColor border border-gray-400 duration-100 transform group-hover:block hidden max-w-[80%] rounded-full shadow-sm"
  >
    <div class="flex flex-row justify-between mx-auto py-1.5 px-3 max-w-6xl">
      <div class="flex gap-2 items-center justify-center">
        <div
          @click="deleteComponent($event)"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryErrorColor hover:text-white"
        >
          <TrashIcon class="w-4 h-4 m-2 stroke-2" />
        </div>
      </div>

      <div class="flex gap-2 items-center justify-center">
        <div
          @click="designer.moveComponent($event, 1)"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <ArrowDownIcon class="w-4 h-4 m-2 stroke-2" />
        </div>
        <div
          @click="designer.moveComponent($event, -1)"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <ArrowUpIcon class="w-4 h-4 m-2 stroke-2" />
        </div>
      </div>
    </div>
  </div>
</template>
