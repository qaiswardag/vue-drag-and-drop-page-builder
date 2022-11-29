<template>
  <EditorAccordion>
    <template #title>
      Typography
    </template>
    <template #content>
      <div class="mb-2">
        <label for="meta_title" class="primaryDesignerLabel">
          Font base size
        </label>
        <select v-model="fontRefs.size" class="primaryDesignerSelect" @change="changeFont('size')">
          <option disabled value="">Select</option>
          <option v-for="size in fontAttributes.size" :key="size">{{ size }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="primaryDesignerLabel">
          Font mobile size
        </label>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="primaryDesignerLabel">
          Font tablet size
        </label>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="primaryDesignerLabel">
          Font desktop size
        </label>
      </div>

      <hr>
      <p class="mt-2">
        Font styles
      </p>

      <div class="mb-2">
        <label for="meta_title" class="primaryDesignerLabel">
          Font weight
        </label>
        <select v-model="fontRefs.weight" class="primaryDesignerSelect" @change="changeFont('weight')">
          <option disabled value="">Select</option>
          <option v-for="weight in fontAttributes.weight" :key="weight">{{ weight }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="primaryDesignerLabel">
          Font family
        </label>
        <select v-model="fontRefs.family" class="primaryDesignerSelect" @change="changeFont('family')">
          <option class="rounded-xl" disabled value="">Select</option>
          <option v-for="family in fontAttributes.family" :key="family">{{ family }}</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="meta_title" class="primaryDesignerLabel">
          Font style
        </label>
        <select v-model="fontRefs.style" class="primaryDesignerSelect" @change="changeFont('style')">
          <option class="rounded-xl" disabled value="">Select</option>
          <option v-for="style in fontAttributes.style" :key="style">{{ style }}</option>
        </select>
      </div>

    </template>
  </EditorAccordion>
</template>

<script setup>
import { watch } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import EditorAccordion from '../EditorAccordion.vue'

// store
const store = useStore()
// getters: current element from store
const getCurrentElement = computed(() => {
  return store.getters['Designer/getCurrentElement']
})

// Update editor defaults when an element is selected
watch(getCurrentElement, (newElement, oldElement) => {
  fontRefs.value.size =
    fontAttributes.size.find((size) =>
      newElement.classList.contains(`text-${size}`)
    ) || ''
  fontRefs.value.weight =
    fontAttributes.weight.find((weight) =>
      newElement.classList.contains(`font-${weight}`)
    ) || ''
  fontRefs.value.family =
    fontAttributes.family.find((family) =>
      newElement.classList.contains(`font-${family}`)
    ) || ''
  fontRefs.value.style =
    fontAttributes.style.find((style) =>
      newElement.classList.contains(style)
    ) || ''

  text.value = newElement.textContent || ''
})

const text = ref('')

function changeText() {
  getCurrentElement.value.textContent = text.value
}

// Reactive font values bound to v-model
const fontRefs = ref({
  size: '',
  weight: '',
  family: '',
  style: '',
  fontBaseZize: '',
})

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
}

function changeFont(attr) {
  // Get tailwind class prefix
  const classPrefix = getFontPrefix(attr)

  // Iterate through the given tailwind class category
  fontAttributes[attr].forEach((fontAttr) => {
    // Remove each tailwind class of same category
    getCurrentElement.value.classList.remove(classPrefix + fontAttr)
  })

  // Add tailwind class based on input ref
  getCurrentElement.value.classList.add(classPrefix + fontRefs.value[attr])

  // Emit change to update reactive
  // setters (mutation): current element from store
  store.commit('Designer/setCurrentElement', getCurrentElement.value)
}

function getFontPrefix(attr) {
  let classPrefix

  attr === 'size' ? (classPrefix = 'text-') : classPrefix
  attr === 'weight' ? (classPrefix = 'font-') : classPrefix
  attr === 'family' ? (classPrefix = 'font-') : classPrefix
  attr === 'style' ? (classPrefix = '') : classPrefix

  return classPrefix
}
</script>
