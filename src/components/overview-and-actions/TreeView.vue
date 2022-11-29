<template>
  <div class="relative flex items-start items-center gap-2 my-4">
    <div v-if="!isOpen || !hasChildren">
      <ChevronRightIcon class="h-4 w-4 text-gray-800"></ChevronRightIcon>
    </div>
    <div v-if="isOpen && hasChildren">
      <ChevronDownIcon class="h-4 w-4 text-gray-800"></ChevronDownIcon>
    </div>
    <input @click="toggle" v-model="selected" :value="categories.name" type="checkbox" name="categories[]" class="primaryCheckbox" />
    <div>
      <label class="primaryLabel my-0 pl-3" :class="{ 'font-semibold': hasChildren }">
        {{ categories.name }}
      </label>
    </div>

  </div>

  <div class="ml-12" v-show="isOpen" v-if="hasChildren">
    <TreeView v-for="(categories, index) in categories.children" :key="index" :categories="categories" :index="index">
    </TreeView>
  </div>

</template>


<script setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/outline'

const props = defineProps({
  categories: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: false,
  },
})

const store = useStore()

const isOpen = ref(false)
const hasChildren = computed(() => {
  return props.categories.children && props.categories.children.length
})

function toggle() {
  isOpen.value = !isOpen.value
}

// selected
const selected = ref(null)

// watch is open and set all chilren to null or false
watch(isOpen, (newIsOpen) => {
  // if category have children
  if (hasChildren.value !== 'undefined') {
    // selected.value = null
  }
})

//
//
//
//
//
//
//
//
//
//
// set selected categories in store
store.commit('createProduct/setSelectedCategories', { se: 'hi' })

// from old test
// from old test
// from old test
// from old test
</script>
