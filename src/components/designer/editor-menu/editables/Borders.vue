<template>
  <EditorAccordion>
    <template #title>Borders</template>
    <template #content>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Padding</p>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Padding Y-axis:
        </label>
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
            v-for="verticalPadding in tailwindSpacing.verticalPadding"
            :key="verticalPadding"
          >
            {{ verticalPadding }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Padding X-axis:
        </label>
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
            v-for="horizontalPadding in tailwindSpacing.horizontalPadding"
            :key="horizontalPadding"
          >
            {{ horizontalPadding }}
          </option>
        </select>
      </div>
      <p class="myPrimaryParagraph font-medium py-0 my-4">Margin</p>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Margin Y-axis:
        </label>
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
            v-for="verticalMargin in tailwindSpacing.verticalMargin"
            :key="verticalMargin"
          >
            {{ verticalMargin }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label
          for="meta_title"
          class="myPrimaryInputLabel"
        >
          Margin X-axis:
        </label>
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
            v-for="horizontalMargin in tailwindSpacing.horizontalMargin"
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
import tailwindSpacing from '../../../../utils/tailwind-padding-margin';
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

const getFontVerticalPaddingCurrent = computed(() => {
  return store.getters['designer/getFontVerticalPadding'];
});
const getFontHorizontalPaddingCurrent = computed(() => {
  return store.getters['designer/getFontHorizontalPadding'];
});
const getFontVerticalMarginCurrent = computed(() => {
  return store.getters['designer/getFontVerticalMargin'];
});
const getFontHorizontalMarginCurrent = computed(() => {
  return store.getters['designer/getFontHorizontalMargin'];
});

watch(getFontVerticalPaddingCurrent, (newValue) => {
  fontVerticalPadding.value = newValue;
});
watch(getFontHorizontalPaddingCurrent, (newValue) => {
  fontHorizontalPadding.value = newValue;
});
watch(getFontVerticalMarginCurrent, (newValue) => {
  fontVerticalMargin.value = newValue;
});
watch(getFontHorizontalMarginCurrent, (newValue) => {
  fontHorizontalMargin.value = newValue;
});
</script>
