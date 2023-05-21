<template>
  <router-view />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

// store
const store = useStore();

// set backend current user
store.commit('user/setUser', {
  name: 'Joe Doe',
  email: 'joe@apple.com',
});
</script>
