<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue'; // store
import Designer from '../../../../composables/Designer';

const store = useStore();
const designer = new Designer(store);

const getTextAreaVueModel = computed(() => {
  return store.getters['designer/getTextAreaVueModel'];
});

const getComponent = computed(() => {
  return store.getters['designer/getComponent'];
});

// Default value for showTextArea
const showTextArea = ref(true);

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

// text area v-model
const textContentVueModel = ref('');

watch(textContentVueModel, (newValue) => {
  store.commit('designer/setTextAreaVueModel', newValue);
});

watch(getTextAreaVueModel, (newValue) => {
  textContentVueModel.value = newValue;
});
</script>

<template>
  <div v-if="showTextArea === true" class="my-2 pb-8">
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
