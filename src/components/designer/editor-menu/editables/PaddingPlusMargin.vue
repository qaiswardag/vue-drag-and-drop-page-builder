<template>
  <EditorAccordion>
    <template #title>Padding & Margin</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Padding</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Padding Y-axis </label>
        <select
          v-model="fontVerticalPadding"
          class="myPrimarySelect"
          @change="designer.handleVerticalPadding(fontVerticalPadding)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="verticalPadding in tailwindPaddingPlusMargin.verticalPadding"
            :key="verticalPadding"
          >
            {{ verticalPadding }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Padding X-axis </label>
        <select
          v-model="fontHorizontalPadding"
          class="myPrimarySelect"
          @change="designer.handleHorizontalPadding(fontHorizontalPadding)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="horizontalPadding in tailwindPaddingPlusMargin.horizontalPadding"
            :key="horizontalPadding"
          >
            {{ horizontalPadding }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Margin</p>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Margin Y-axis </label>
        <select
          v-model="fontVerticalMargin"
          class="myPrimarySelect"
          @change="designer.handleVerticalMargin(fontVerticalMargin)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="verticalMargin in tailwindPaddingPlusMargin.verticalMargin"
            :key="verticalMargin"
          >
            {{ verticalMargin }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Margin X-axis </label>
        <select
          v-model="fontHorizontalMargin"
          class="myPrimarySelect"
          @change="designer.handleHorizontalMargin(fontHorizontalMargin)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="horizontalMargin in tailwindPaddingPlusMargin.horizontalMargin"
            :key="horizontalMargin"
          >
            {{ horizontalMargin }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import tailwindPaddingPlusMargin from '../../../../utils/tailwind-padding-margin';
import Designer from '../../../../composables/Designer';
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';

const store = useStore();

const designer = new Designer(store);

const fontVerticalPadding = ref(null);
const fontHorizontalPadding = ref(null);
const fontVerticalMargin = ref(null);
const fontHorizontalMargin = ref(null);

const getFontVerticalPadding = computed(() => {
  return store.getters['designer/getFontVerticalPadding'];
});
const getFontHorizontalPadding = computed(() => {
  return store.getters['designer/getFontHorizontalPadding'];
});
const getFontVerticalMargin = computed(() => {
  return store.getters['designer/getFontVerticalMargin'];
});
const getFontHorizontalMargin = computed(() => {
  return store.getters['designer/getFontHorizontalMargin'];
});

watch(
  getFontVerticalPadding,
  (newValue) => {
    fontVerticalPadding.value = newValue;
  },
  { immediate: true }
);
watch(
  getFontHorizontalPadding,
  (newValue) => {
    fontHorizontalPadding.value = newValue;
  },
  { immediate: true }
);
watch(
  getFontVerticalMargin,
  (newValue) => {
    fontVerticalMargin.value = newValue;
  },
  { immediate: true }
);
watch(
  getFontHorizontalMargin,
  (newValue) => {
    fontHorizontalMargin.value = newValue;
  },
  { immediate: true }
);
</script>
