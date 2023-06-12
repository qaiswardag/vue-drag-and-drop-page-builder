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
