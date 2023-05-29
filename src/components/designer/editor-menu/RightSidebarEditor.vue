<template>
  <div class="h-full w-80 bg-white">
    <div class="h-screen flex flex-col">
      <div class="flex flex-row justify-between p-4">
        <p class="font-bold text-sm">
          Editing
          <span class="lowercase">&lt;{{ elementTag }}&gt;</span>
        </p>
        <XMarkIcon
          class="h-6 w-6 text-gray-500 self-center cursor-pointer"
          @click.esc="$emit('closeEditor')"
        ></XMarkIcon>
      </div>

      <div class="mb-4 overflow-y-scroll md:pb-24 pb-12">
        <article v-show="getCurrentImagePreview">
          <ImageEditor> </ImageEditor>
        </article>
        <article v-show="!getCurrentImagePreview && showTextArea !== false">
          <TextContent></TextContent>
        </article>

        <article v-show="textEditable">
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
import DeleteElementEditor from './editables/DeleteElementEditor.vue';

// store
const store = useStore();
// emit
const emit = defineEmits([
  'previewCurrentDesign',
  'signOutClick',
  'closeEditor',
]);

const showTextArea = ref(false);

// getters: current element from store
const getCurrentImagePreview = computed(() => {
  return store.getters['designer/getCurrentImagePreview'];
});

// get current element tag
const getComponent = computed(() => {
  return store.getters['designer/getComponent'];
});

// get outer HTML of current element
const getComponentInnerHTML = computed(() => {
  return getComponent?.value?.innerHTML ? getComponent?.value?.innerHTML : [];
});

// watch and show text area based "get current element" content
// only show text area if it's include text only plus if containing <br>
watch(getComponentInnerHTML, (newElementInnerHTML, oldElement) => {
  // stop execution if
  if (typeof newElementInnerHTML !== 'string') {
    return;
  }

  const newElementClone = ref(newElementInnerHTML);

  // check for br tags and replace br tags with empty space
  newElementClone.value = newElementClone.value.replace(/<br\s*\/?>/gi, '');
  newElementClone.value = newElementClone.value?.replaceAll('<br>', '');
  newElementClone.value = newElementClone.value?.replaceAll('<br/>', '');
  newElementClone.value = newElementClone.value?.replaceAll('<br />', '');

  // check for any html
  // if test return true, the element is containing html
  const containsHTML = ref(/<\/?[a-z][\s\S]*>/i.test(newElementClone.value));

  // if test return true, the element is containing html
  if (containsHTML.value === true) {
    showTextArea.value = false;
  }
  if (containsHTML.value === false) {
    showTextArea.value = true;
  }
});

// text tags
const textTags = [
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'A',
  'BUTTON',
  'SPAN',
];
// Get tagName of element
const elementTag = computed(() => {
  return getComponent.value?.tagName;
});
// Check if text is editable
const textEditable = computed(() => {
  return textTags.includes(elementTag.value);
});
</script>
