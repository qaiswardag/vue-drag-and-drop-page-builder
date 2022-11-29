<template>
  <div>
    <div class="my-2">
      <div class="block px-4 ease-linear duration-200 bg-white">
        <label for="meta_title" class="primaryDesignerLabel">
          Text content
        </label>

        <textarea v-model="textContentElement" rows="12" class="primaryDesignerTextArea" @input="changeText" />

        <!-- <ckeditor-->
        <!-- v-model="textContentElement"-->
        <!-- :editor="editor"-->
        <!-- :config="editorConfig"-->
        <!-- type="text"-->
        <!-- @input="changeText">-->
        <!-- </ckeditor>-->

      </div>
    </div>
  </div>

</template>

<script setup>
import { watch } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'
import { saveAllComponentsInLocalstorage } from '../../../../composables/save-all-components-in-localstorage'
import { QuillEditor } from '@vueup/vue-quill'

// ⚠️ NOTE: We don't use @ckeditor/ckeditor5-build-classic any more!
// Since we're building CKEditor from source, we use the source version of ClassicEditor.
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

// set ckeditor
const editor = ClassicEditor
// set ckeditor
const ckeditor = CKEditor.component
// store
const store = useStore()
// text area v-model
const textContentElement = ref('')

const editorData = '<p>Content of the editor.</p>'

// config for CK-editor
const editorConfig = {}

// get components added
const allComponentsAddedToDom = computed(() => {
  return store.getters['Designer/getComponentsAdded']
})
// getters: current element from store
const getCurrentElement = computed(() => {
  return store.getters['Designer/getCurrentElement']
})
// update editor defaults when an element is selected
watch(getCurrentElement, (newElement, oldElement) => {
  // save all current added HTML components in local storage
  saveAllComponentsInLocalstorage(allComponentsAddedToDom.value)
  //
  //
  //
  console.log('Tekst ændret 1:', newElement.textContent)
  console.log('Tekst ændret 2:', textContentElement.value)
  textContentElement.value = newElement.textContent || ''
})

// watch for text change
function changeText() {
  console.log('text have been changed:', textContentElement.value)
  getCurrentElement.value.textContent = textContentElement.value

  // save all current added HTML components in local storage
  saveAllComponentsInLocalstorage(allComponentsAddedToDom.value)
  console.log('alle:', allComponentsAddedToDom.value)
}
</script>
