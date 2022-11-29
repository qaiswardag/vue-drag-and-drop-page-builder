<template>
  <div class="h-full w-80 bg-white">
    <div class="h-full flex flex-col">
      <div class="flex flex-row justify-between p-4">
        <p class="font-semibold text-sm">Editing <span class="lowercase">&lt;{{ elementTag }}&gt;</span>
        </p>
        <XIcon class="h-6 w-6 text-gray-500 self-center cursor-pointer" @click.esc="$emit('closeEditor')"></XIcon>
      </div>

      <div class="mb-4 overflow-y-auto h-full">
        <article>
          <ImageEditor>
          </ImageEditor>
        </article>

        <article>
          <TextContent></TextContent>
        </article>

        <article v-show="textEditable">
          <Typography></Typography>
        </article>
        <article>
          <ClassEditor></ClassEditor>
        </article>
        <article>
          <ColorEditor>
          </ColorEditor>
        </article>
        <article>
          <PaddingEditor>
          </PaddingEditor>
        </article>
        <article>
          <DeleteElementEditor>
          </DeleteElementEditor>
        </article>
      </div>
    </div>
  </div>
</template>


<script setup>
import { XIcon } from '@heroicons/vue/outline'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ClassEditor from '../../designer/editor-menu/editables/ClassEditor.vue'
import ImageEditor from '../../designer/editor-menu/editables/ImageEditor.vue'
import ColorEditor from '../../designer/editor-menu/editables/ColorEditor.vue'
import TextContent from '../../designer/editor-menu/editables/TextContent.vue'
import Typography from '../../designer/editor-menu/editables/Typography.vue'
import PaddingEditor from './editables/PaddingEditor.vue'
import DeleteElementEditor from './editables/DeleteElementEditor.vue'

// store
const store = useStore()
// emit
const emit = defineEmits([
  'previewCurrentDesign',
  'signOutClick',
  'closeEditor',
])
// get current element tag
const getCurrentElement = computed(() => {
  return store.getters['Designer/getCurrentElement']
})

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
]
// Get tagName of element
const elementTag = computed(() => {
  return getCurrentElement.value?.tagName
})
// Check if text is editable
const textEditable = computed(() => {
  return textTags.includes(elementTag.value)
})
</script>
