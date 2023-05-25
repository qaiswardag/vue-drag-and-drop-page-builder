<template>
  <EditorAccordion>
    <template #title> Typography </template>
    <template #content>
      <!-- FONT SIZES -->
      <p class="myPrimaryParagraph py-0 my-4">Font sizes</p>
      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font base size
        </label>
        <select
          v-model="fontRefs.size"
          class="myPrimarySelect"
          @change="changeFontBase('size')"
        >
          <option disabled value="">Select</option>
          <option v-for="size in fontAttributes.size" :key="size">
            {{ size }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font desktop size
        </label>
        <select
          v-model="fontRefs.sizeDesktop"
          class="myPrimarySelect"
          @change="changeFontDesktop('size')"
        >
          <option disabled value="">Select</option>
          <option v-for="size in fontAttributes.size" :key="size">
            {{ size }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font tablet size
        </label>
        <select
          v-model="fontRefs.sizeTablet"
          class="myPrimarySelect"
          @change="changeFontTablet('size')"
        >
          <option disabled value="">Select</option>
          <option v-for="size in fontAttributes.size" :key="size">
            {{ size }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font mobile size
        </label>
        <select
          v-model="fontRefs.sizeMobile"
          class="myPrimarySelect"
          @change="changeFontMobile('size')"
        >
          <option disabled value="">Select</option>
          <option v-for="size in fontAttributes.size" :key="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- STOP STYLES -->
      <hr />
      <p class="myPrimaryParagraph py-0 my-4">Font styles</p>

      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font weight
        </label>
        <select
          v-model="fontRefs.weight"
          class="myPrimarySelect"
          @change="changeFontBase('weight')"
        >
          <option disabled value="">Select</option>
          <option v-for="weight in fontAttributes.weight" :key="weight">
            {{ weight }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel">
          Font family
        </label>
        <select
          v-model="fontRefs.family"
          class="myPrimarySelect"
          @change="changeFontBase('family')"
        >
          <option class="rounded-xl" disabled value="">Select</option>
          <option v-for="family in fontAttributes.family" :key="family">
            {{ family }}
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="myPrimaryInputLabel"> Font style </label>
        <select
          v-model="fontRefs.style"
          class="myPrimarySelect"
          @change="changeFontBase('style')"
        >
          <option class="rounded-xl" disabled value="">Select</option>
          <option v-for="style in fontAttributes.style" :key="style">
            {{ style }}
          </option>
        </select>
      </div>
    </template>
  </EditorAccordion>
</template>

<script setup>
import { watch, ref, computed } from 'vue';
import { useStore } from 'vuex';
import EditorAccordion from '../EditorAccordion.vue';

// store
const store = useStore();
// getter current element
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
});
// get outer HTML of current element
const getCurrentElementOuterHTML = computed(() => {
  return getCurrentElement?.value?.outerHTML
    ? getCurrentElement?.value?.outerHTML
    : [];
});
//
//
//
// reactive font values bound to v-model
const fontRefs = ref({
  // font sizes
  size: '',
  sizeDesktop: '',
  sizeTablet: '',
  sizeMobile: '',

  // font styles
  weight: '',
  family: '',
  style: '',
});
//
const fontAttributes = {
  size: [
    'xs',
    'sm',
    'base',
    'lg',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl',
    '8xl',
    '9xl',
  ],
  weight: [
    'thin',
    'extralight',
    'light',
    'normal',
    'medium',
    'semibold',
    'bold',
    'extrabold',
    'black',
  ],
  family: ['sans', 'serif', 'mono'],
  style: ['italic', 'not-italic'],
};

// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set text value
  text.value = newElement?.textContent || '';
});

// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes
  fontRefs.value.size =
    fontAttributes.size.find((size) =>
      newElement?.classList.contains(`text-${size}`)
    ) || '';
});
// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes

  fontRefs.value.sizeDesktop =
    fontAttributes.size.find((size) =>
      newElement?.classList.contains(`lg:text-${size}`)
    ) || '';
});

// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes

  fontRefs.value.sizeTablet =
    fontAttributes.size.find((size) =>
      newElement?.classList.contains(`md:text-${size}`)
    ) || '';
});
// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes

  fontRefs.value.sizeMobile =
    fontAttributes.size.find((size) =>
      newElement?.classList.contains(`sm:text-${size}`)
    ) || '';
});

// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes
  fontRefs.value.weight =
    fontAttributes.weight.find((weight) =>
      newElement?.classList.contains(`font-${weight}`)
    ) || '';
});

// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes
  fontRefs.value.family =
    fontAttributes.family.find((family) =>
      newElement?.classList.contains(`font-${family}`)
    ) || '';
});
// update editor selected and default when an element is selected
watch(getCurrentElementOuterHTML, (newElement, oldElement) => {
  // set new element back to currrent element as new element is html string
  newElement = getCurrentElement.value;
  // set font attributes
  fontRefs.value.style =
    fontAttributes.style.find((style) =>
      newElement?.classList.contains(style)
    ) || '';
});

const text = ref('');

function changeText() {
  getCurrentElement.value.textContent = text.value;
}

function changeFontBase(attr) {
  // get tailwind class prefix

  //
  const classPrefix = getFontPrefix(attr);
  // attr, example: size
  // prefix, example: text-

  // iterate through the given tailwind class category
  fontAttributes[attr].forEach((fontAttr) => {
    // fontAttr, example: xs

    // remove each tailwind class of same category
    getCurrentElement.value.classList.remove(classPrefix + fontAttr);
  });

  // add tailwind class based on input ref
  getCurrentElement.value.classList.add(classPrefix + fontRefs.value[attr]);

  // commit changes
  store.commit('designer/setCurrentElement', getCurrentElement.value);
}

function changeFontDesktop(attr) {
  //
  let classPrefix = getFontPrefix(attr);
  classPrefix = 'lg:' + classPrefix;
  // attr, example: size
  // prefix, example: text-

  // iterate through the given tailwind class category
  fontAttributes[attr].forEach((fontAttr) => {
    // fontAttr, example: xs

    // remove each tailwind class of same category
    getCurrentElement.value.classList.remove(classPrefix + fontAttr);
  });

  // add tailwind class based on input ref
  getCurrentElement.value.classList.add(
    classPrefix + fontRefs.value[attr + 'Desktop']
  );

  // commit changes
  store.commit('designer/setCurrentElement', getCurrentElement.value);
}
function changeFontTablet(attr) {
  //
  let classPrefix = getFontPrefix(attr);
  classPrefix = 'md:' + classPrefix;
  // attr, example: size
  // prefix, example: text-

  // iterate through the given tailwind class category
  fontAttributes[attr].forEach((fontAttr) => {
    // fontAttr, example: xs

    // remove each tailwind class of same category
    getCurrentElement.value.classList.remove(classPrefix + fontAttr);
  });

  // add tailwind class based on input ref
  getCurrentElement.value.classList.add(
    classPrefix + fontRefs.value[attr + 'Tablet']
  );

  // commit changes
  store.commit('designer/setCurrentElement', getCurrentElement.value);
}
function changeFontMobile(attr) {
  //
  let classPrefix = getFontPrefix(attr);
  classPrefix = 'sm:' + classPrefix;
  // attr, example: size
  // prefix, example: text-

  // iterate through the given tailwind class category
  fontAttributes[attr].forEach((fontAttr) => {
    // fontAttr, example: xs

    // remove each tailwind class of same category
    getCurrentElement.value.classList.remove(classPrefix + fontAttr);
  });

  // add tailwind class based on input ref
  getCurrentElement.value.classList.add(
    classPrefix + fontRefs.value[attr + 'Mobile']
  );

  // commit changes
  store.commit('designer/setCurrentElement', getCurrentElement.value);
}

function getFontPrefix(attr) {
  let classPrefix;

  attr === 'size' ? (classPrefix = 'text-') : classPrefix;
  attr === 'weight' ? (classPrefix = 'font-') : classPrefix;
  attr === 'family' ? (classPrefix = 'font-') : classPrefix;
  attr === 'style' ? (classPrefix = '') : classPrefix;

  return classPrefix;
}
</script>
