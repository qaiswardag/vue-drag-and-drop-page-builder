<template>
  <div class="flex flex-col">
    <div
      class="border-t border-gray-200 flex flex-row justify-between items-center px-4 py-2 cursor-pointer duration-200 hover:bg-emerald-200"
      :class="{ 'bg-white': expanded }"
      @click="expanded = !expanded"
    >
      <p class="text-xs my-0 py-0 font-normal">
        <slot name="title" />
      </p>
      <ChevronRightIcon
        class="rotate-0 h-5 w-5 transform duration-75"
        :class="{ 'rotate-90': expanded }"
      >
      </ChevronRightIcon>
    </div>
    <div
      :class="[expanded ? 'block' : 'hidden']"
      class="px-4 ease-linear duration-75 bg-white"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ChevronRightIcon } from '@heroicons/vue/20/solid';

export default {
  components: {
    ChevronRightIcon,
  },

  setup() {
    const expanded = ref(false);

    return {
      ChevronRightIcon,
      expanded,
    };
  },
};
</script>
