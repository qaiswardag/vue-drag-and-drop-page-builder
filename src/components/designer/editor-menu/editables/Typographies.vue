<template>
  <EditorAccordion>
    <template #title> Typographies </template>
    <template #content>
      <!-- FONT SIZES -->
      <p class="myPrimaryParagraph py-0 my-4">Font sizes</p>
      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel"> Font Base </label>
        <select
          v-model="fontBase"
          class="myPrimarySelect"
          @change="designer.handleFontSize(fontBase)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="fontSize in tailwindFontSizes.fontBase"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font desktop size
        </label>
        <select
          v-model="fontDesktop"
          class="myPrimarySelect"
          @change="designer.handleFontSize(fontDesktop)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="fontSize in tailwindFontSizes.fontDesktop"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font tablet size
        </label>
        <select
          v-model="fontTablet"
          class="myPrimarySelect"
          @change="designer.handleFontSize(fontTablet)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="fontSize in tailwindFontSizes.fontTablet"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font mobile size
        </label>
        <select
          v-model="fontMobile"
          class="myPrimarySelect"
          @change="designer.handleFontSize(fontMobile)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="fontSize in tailwindFontSizes.fontMobile"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
      <hr />
      <p class="myPrimaryParagraph py-0 my-4">Font styles</p>
      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font mobile size
        </label>
        <select
          v-model="fontMobile"
          class="myPrimarySelect"
          @change="designer.handleFontSize(fontMobile)"
        >
          <option disabled value="">Select</option>
          <option
            v-for="fontSize in tailwindFontSizes.fontMobile"
            :key="fontSize"
          >
            {{ fontSize }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import Designer from '../../../../composables/Designer';
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import tailwindFontSizes from '../../../../utils/tailwind-font-sizes';
import { computed, ref, watch } from 'vue';

const store = useStore();

const designer = new Designer(store);

const fontBase = ref(null);
const fontDesktop = ref(null);
const fontTablet = ref(null);
const fontMobile = ref(null);

const getFontBase = computed(() => {
  return store.getters['designer/getFontBase'];
});
const getFontDesktop = computed(() => {
  return store.getters['designer/getFontDesktop'];
});
const getFontTablet = computed(() => {
  return store.getters['designer/getFontTablet'];
});
const getFontMobile = computed(() => {
  return store.getters['designer/getFontMobile'];
});

watch(getFontBase, (newValue) => {
  fontBase.value = newValue;
});
watch(getFontDesktop, (newValue) => {
  fontDesktop.value = newValue;
});
watch(getFontTablet, (newValue) => {
  fontTablet.value = newValue;
});
watch(getFontMobile, (newValue) => {
  fontMobile.value = newValue;
});
</script>
