<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue'; // store
import Designer from '../../../../composables/Designer';

const store = useStore();
const designer = new Designer(store);

// NEW CODE - START
// text area v-model
const textContentVueModel = ref('');

watch(textContentVueModel, (newValue) => {
  store.commit('designer/setTextAreaVueModel', newValue);
  // getComponent.value.innerHTML = newValue;
});

const getTextAreaVueModel = computed(() => {
  return store.getters['designer/getTextAreaVueModel'];
});
watch(getTextAreaVueModel, (newValue) => {
  textContentVueModel.value = newValue;
});

// NEW CODE - END

// // get components added
// const allComponentsAddedToDom = computed(() => {
//   return store.getters['designer/getComponentsAdded'];
// });
// // getters: current element from store
// const getComponent = computed(() => {
//   return store.getters['designer/getComponent'];
// });

// // get outer HTML of current element
// const getComponentInnerHTML = computed(() => {
//   return getComponent?.value?.innerHTML ? getComponent?.value?.innerHTML : [];
// });

// // update editor defaults when an element is selected
// watch(getComponentInnerHTML, (newElementWatch, oldElement) => {
//   // text content
//   if (typeof newElementWatch !== 'string') {
//     return;
//   }
//   textContentVueModel.value = newElementWatch?.replaceAll('<br>', '\r\n') || '';
// });

// watch for text change
// const changeText = function () {
//   const textContentElementClone = ref(null);
//   textContentElementClone.value = textContentVueModel.value?.replaceAll(
//     /\n/g,
//     '<br>'
//   );
//   // text change
//   getComponent.value.innerHTML = textContentElementClone.value;

//   allComponentsAddedToDom.value.forEach((htmlComponent) => {});
// };
//
//
</script>

<template>
  <div class="my-2 pb-8">
    <div class="block px-4 ease-linear duration-200 bg-white">
      <label for="meta_title" class="myPrimaryInputLabel"> Text content </label>

      <textarea
        v-model="textContentVueModel"
        rows="12"
        class="myPrimaryTextArea"
        @input="designer.changeText"
      />
    </div>
  </div>
</template>
