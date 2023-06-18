<template>
  <div
    class="w-full inset-x-0 h-[94vh] lg:pt-0 pt-0-z-10 overflow-x-scroll bg-white"
  >
    <div v-html="htmlPage"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// router
// const router = useRouter();
// preview content
const htmlPage = ref('');
// get preview item from local storage
htmlPage.value = localStorage.getItem('preview');
// parse
htmlPage.value = JSON.parse(htmlPage.value);
// join
htmlPage.value = htmlPage.value.join('');
</script>
