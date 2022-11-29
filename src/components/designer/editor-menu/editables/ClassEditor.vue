<template>
  <EditorAccordion>
    <template #title>Classes</template>
    <template #content>

      <div class="flex flex-row flex-wrap gap-2 mt-2 mb-4">
        <p v-for="className in currentClasses" :key="className" class="inline-block bg-emerald-500 text-white hover:bg-emerald-700 text-xs px-3 py-1 cursor-pointer rounded-2xl duration-200" @click="removeClass($event)">
          <span class="mr-1">
            {{ className }}
          </span>
        </p>
      </div>

      <div class="flex flex-row justify-between gap-2 mb-4">
        <input v-model="inputClass" type="text" class="primaryDesignerInput" placeholder="Type class" @keydown="addClass">
        <button class="myPrimaryButton text-xs" @click="addClass">
          Add
        </button>
      </div>
      <p :class="[containsSpace ? 'max-h-5' : 'max-h-0']" class="text-red-500 text-sm mb-4 overflow-hidden duration-200">Class may not contain
        spaces*</p>
    </template>
  </EditorAccordion>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import EditorAccordion from '../EditorAccordion.vue'

// store
const store = useStore()
// getters: current element from store
const getCurrentElement = computed(() => {
  return store.getters['Designer/getCurrentElement']
})

// get current class
const currentClasses = computed(() => {
  return getCurrentElement.value?.classList
})

// input class
const inputClass = ref('')
// check if input contains spaces
const containsSpace = computed(() => {
  return inputClass.value.includes(' ')
})

//
//
const removeClass = function (e) {
  // remove clicked class name from selected element
  getCurrentElement.value.classList.remove(e.currentTarget.textContent)
  // setters (mutation): current element from store
  store.commit('Designer/setCurrentElement', getCurrentElement.value)
}
//

// add class
const addClass = function (e) {
  if (
    inputClass.value !== '' &&
    !containsSpace.value &&
    !inputClass.value.includes(' ') &&
    (e.keyCode === 13 || e.type === 'click')
  ) {
    // add input field value as class
    getCurrentElement.value.classList.add(inputClass.value)
    // reset input value
    inputClass.value = ''
  }
}
</script>
