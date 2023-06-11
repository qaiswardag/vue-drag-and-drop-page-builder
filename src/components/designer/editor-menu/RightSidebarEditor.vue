<template>
  <div class="h-full w-80 bg-white">
    <div class="h-screen flex flex-col">
      <div class="flex flex-row justify-between p-4">
        <p class="font-bold text-sm">
          Editing
          <span class="lowercase">&lt;{{ elementTag }}&gt;</span>
        </p>
        <XMarkIcon
          class="shrink-0 w-5 h-5 cursor-pointer"
          @click="$emit('closeEditor')"
        ></XMarkIcon>
      </div>

      <div class="mb-4 overflow-y-scroll md:pb-24 pb-12">
        <article>
          <ImageEditor> </ImageEditor>
        </article>
        <article>
          <TextContent></TextContent>
        </article>

        <article>
          <Typography></Typography>
        </article>
        <article>
          <ColorsEditor> </ColorsEditor>
        </article>
        <article>
          <Spacing> </Spacing>
        </article>
        <article>
          <ClassEditor></ClassEditor>
        </article>
        <article>
          <DeleteElementEditor> </DeleteElementEditor>
        </article>
        <article class="min-h-[30em]"></article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import ClassEditor from '../../designer/editor-menu/editables/ClassEditor.vue';
import ImageEditor from '../../designer/editor-menu/editables/ImageEditor.vue';
import ColorsEditor from '../../designer/editor-menu/editables/ColorEditor.vue';
import TextContent from '../../designer/editor-menu/editables/TextContent.vue';
import Typography from '../../designer/editor-menu/editables/Typography.vue';
import Spacing from './editables/Spacing.vue';
import DeleteElementEditor from './editables/DeleteElement.vue';

// store
const store = useStore();
// emit
const emit = defineEmits(['closeEditor']);

// get current element tag
const getComponent = computed(() => {
  return store.getters['designer/getComponent'];
});

// Get tagName of element
const elementTag = computed(() => {
  return getComponent.value?.tagName;
});
</script>
