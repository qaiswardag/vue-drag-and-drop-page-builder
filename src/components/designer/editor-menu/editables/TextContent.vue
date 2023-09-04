<script setup>
import { watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
import Designer from '../../../../composables/Designer';

const store = useStore();
const designer = new Designer(store);

const getTextAreaVueModel = computed(() => {
  return store.getters['designer/getTextAreaVueModel'];
});

const getElement = computed(() => {
  return store.getters['designer/getElement'];
});

const getBasePrimaryImage = computed(() => {
  return store.getters['designer/getBasePrimaryImage'];
});

// Default value for showTextArea
const showTextArea = ref(true);

// get outer HTML of current element
const getElementInnerHTML = computed(() => {
  return getElement?.value?.innerHTML ? getElement?.value?.innerHTML : [];
});

// watch and show text area based "get current element" content
// only show text area if it's include text only plus if containing <br>
watch(getElementInnerHTML, (newElementInnerHTML) => {
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
  if (containsHTML.value === true || newElementClone.value.length >= 0) {
    showTextArea.value = false;
  }
  if (containsHTML.value === false) {
    showTextArea.value = true;
  }
});

// text area v-model
const textContentVueModel = ref('');

watch(
  textContentVueModel,
  (newValue) => {
    store.commit('designer/setTextAreaVueModel', newValue);
  },
  { immediate: true }
);

watch(
  getTextAreaVueModel,
  (newValue) => {
    textContentVueModel.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="showTextArea === true && getBasePrimaryImage === null"
    class="my-2 pb-8"
  >
    <div class="block px-4 ease-linear duration-200 bg-white">
      <label class="myPrimaryInputLabel"> Text content </label>

      <textarea
        v-html="textContentVueModel"
        :value="designer.decodeHTML(textContentVueModel)"
        rows="12"
        class="myPrimaryTextArea"
        @input="designer.changeText"
      />
    </div>
  </div>
</template>
