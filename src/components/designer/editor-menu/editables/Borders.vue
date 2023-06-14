<template>
  <EditorAccordion>
    <template #title>Border Style, Width & Color</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Border Style</p>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Border Style:
        </label>
        <select
          v-model="borderStyle"
          class="myPrimarySelect"
          @change="designer.handleBorderStyle(borderStyle)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderStyle in tailwindBorderStyleWidthPlusColor.borderStyle"
            :key="borderStyle"
          >
            {{ borderStyle }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Border Width</p>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Border Width:
        </label>
        <select
          v-model="borderWidth"
          class="myPrimarySelect"
          @change="designer.handleBorderWidth(borderWidth)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderWidth in tailwindBorderStyleWidthPlusColor.borderWidth"
            :key="borderWidth"
          >
            {{ borderWidth }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Border Color</p>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Border Color:
        </label>
        <select
          v-model="borderColor"
          class="myPrimarySelect"
          @change="designer.handleBorderColor(borderColor)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderColor in tailwindBorderStyleWidthPlusColor.borderColor"
            :key="borderColor"
          >
            {{ borderColor }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import tailwindBorderStyleWidthPlusColor from '../../../../utils/tailwind-border-style-width-color';
import Designer from '../../../../composables/Designer';
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

const store = useStore();

const designer = new Designer(store);

const borderStyle = ref(null);
const borderWidth = ref(null);
const borderColor = ref(null);

const getBorderStyle = computed(() => {
  return store.getters['designer/getBorderStyle'];
});
const getBorderWidth = computed(() => {
  return store.getters['designer/getBorderWidth'];
});
const getBorderColor = computed(() => {
  return store.getters['designer/getBorderColor'];
});

watch(getBorderStyle, (newValue) => {
  borderStyle.value = newValue;
});
watch(getBorderWidth, (newValue) => {
  borderWidth.value = newValue;
});
watch(getBorderColor, (newValue) => {
  borderColor.value = newValue;
});
</script>
