<template>
  <div class="my-2 pb-8">
    <div class="block px-4 ease-linear duration-200 bg-white">
      <label for="meta_title" class="myPrimaryInputLabel"> Text content </label>

      <textarea
        v-model="textContentElement"
        rows="12"
        class="myPrimaryTextArea"
        @input="changeText"
      />
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue'; // store

// store
const store = useStore();
// text area v-model
const textContentElement = ref('');

// get components added
const allComponentsAddedToDom = computed(() => {
  return store.getters['designer/getComponentsAdded'];
});
// getters: current element from store
const getComponent = computed(() => {
  return store.getters['designer/getComponent'];
});

// get outer HTML of current element
const getComponentInnerHTML = computed(() => {
  return getComponent?.value?.innerHTML ? getComponent?.value?.innerHTML : [];
});

// update editor defaults when an element is selected
watch(getComponentInnerHTML, (newElementWatch, oldElement) => {
  // text content
  if (typeof newElementWatch !== 'string') {
    return;
  }
  textContentElement.value = newElementWatch?.replaceAll('<br>', '\r\n') || '';
});

// watch for text change
const changeText = function () {
  const textContentElementClone = ref(null);
  textContentElementClone.value = textContentElement.value?.replaceAll(
    /\n/g,
    '<br>'
  );
  // text change
  getComponent.value.innerHTML = textContentElementClone.value;

  allComponentsAddedToDom.value.forEach((htmlComponent) => {});
};
//
//
</script>
