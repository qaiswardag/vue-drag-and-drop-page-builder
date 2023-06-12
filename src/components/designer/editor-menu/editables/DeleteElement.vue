<script setup>
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import {
  ArrowPathRoundedSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';
import Designer from '../../../../composables/Designer';

// store
const store = useStore();
const designer = new Designer(store);

const getRestoredElement = computed(() => {
  return store.getters['designer/getRestoredElement'];
});
</script>

<template>
  <EditorAccordion>
    <template #title>Delete or restore</template>
    <template #content>
      <div class="my-2">
        <button
          v-if="getRestoredElement !== null"
          @click="designer.handleRestoreElement"
          type="button"
          class="myPrimaryButton gap-2 items-center w-full"
        >
          <ArrowPathRoundedSquareIcon
            class="w-4 h-4 text-white stroke-2"
          ></ArrowPathRoundedSquareIcon>
          Restore Element
        </button>
        <button
          v-if="getRestoredElement === null"
          @click="designer.handleDeleteElement"
          type="button"
          class="myPrimaryDeleteButton gap-2 items-center w-full"
        >
          <TrashIcon class="w-4 h-4 text-white stroke-2"></TrashIcon>
          Delete Element
        </button>
      </div>
    </template>
  </EditorAccordion>
</template>
