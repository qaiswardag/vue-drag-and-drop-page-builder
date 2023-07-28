<template>
  <EditorAccordion>
    <template #title>Border Radius</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Global</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius </label>
        <select
          v-model="borderRadiusGlobal"
          class="myPrimarySelect"
          @change="designer.handleBorderRadiusGlobal(borderRadiusGlobal)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusGlobal in tailwindBorderRadius.roundedGlobal"
            :key="borderRadiusGlobal"
          >
            {{ borderRadiusGlobal }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Specific</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius top left </label>
        <select
          v-model="borderRadiusTopLeft"
          class="myPrimarySelect"
          @change="designer.handleBorderRadiusTopLeft(borderRadiusTopLeft)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusTopLeft in tailwindBorderRadius.roundedTopLeft"
            :key="borderRadiusTopLeft"
          >
            {{ borderRadiusTopLeft }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius top right </label>
        <select
          v-model="borderRadiusTopRight"
          class="myPrimarySelect"
          @change="designer.handleBorderRadiusTopRight(borderRadiusTopRight)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusTopRight in tailwindBorderRadius.roundedTopRight"
            :key="borderRadiusTopRight"
          >
            {{ borderRadiusTopRight }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius bottom left </label>
        <select
          v-model="borderRadiusBottomleft"
          class="myPrimarySelect"
          @change="
            designer.handleBorderRadiusBottomleft(borderRadiusBottomleft)
          "
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusBottomleft in tailwindBorderRadius.roundedBottomLeft"
            :key="borderRadiusBottomleft"
          >
            {{ borderRadiusBottomleft }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Radius bottom right </label>
        <select
          v-model="borderRadiusBottomRight"
          class="myPrimarySelect"
          @change="
            designer.handleBorderRadiusBottomRight(borderRadiusBottomRight)
          "
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderRadiusBottomRight in tailwindBorderRadius.roundedBottomRight"
            :key="borderRadiusBottomRight"
          >
            {{ borderRadiusBottomRight }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import tailwindBorderRadius from '../../../../utils/tailwind-border-radius';
import Designer from '../../../../composables/Designer';
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

const store = useStore();

const designer = new Designer(store);

const borderRadiusGlobal = ref(null);
const borderRadiusTopLeft = ref(null);
const borderRadiusTopRight = ref(null);
const borderRadiusBottomleft = ref(null);
const borderRadiusBottomRight = ref(null);

const getBorderRadiusGlobal = computed(() => {
  return store.getters['designer/getBorderRadiusGlobal'];
});
const getBorderRadiusTopLeft = computed(() => {
  return store.getters['designer/getBorderRadiusTopLeft'];
});
const getBorderRadiusTopRight = computed(() => {
  return store.getters['designer/getBorderRadiusTopRight'];
});
const getBorderRadiusBottomleft = computed(() => {
  return store.getters['designer/getBorderRadiusBottomleft'];
});
const getBorderRadiusBottomRight = computed(() => {
  return store.getters['designer/getBorderRadiusBottomRight'];
});

watch(
  getBorderRadiusGlobal,
  (newValue) => {
    borderRadiusGlobal.value = newValue;
  },
  { immediate: true }
);
watch(
  getBorderRadiusTopLeft,
  (newValue) => {
    borderRadiusTopLeft.value = newValue;
  },
  { immediate: true }
);
watch(
  getBorderRadiusTopRight,
  (newValue) => {
    borderRadiusTopRight.value = newValue;
  },
  { immediate: true }
);
watch(
  getBorderRadiusBottomleft,
  (newValue) => {
    borderRadiusBottomleft.value = newValue;
  },
  { immediate: true }
);
watch(
  getBorderRadiusBottomRight,
  (newValue) => {
    borderRadiusBottomRight.value = newValue;
  },
  { immediate: true }
);
</script>
