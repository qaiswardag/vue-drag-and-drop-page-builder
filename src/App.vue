<template>
  <router-view />
</template>


<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

// store
const store = useStore()

// set backend current user
store.commit('user/setUser', {
  email: 'qais@meeshop.dk',
})
// set site id
store.commit('user/setSiteId', '1')
// set site name
store.commit('user/setSiteName', { siteName: 'SpaceX' })
</script>



<style>
/* styles for designer page */

/* styles for all pages */
.tags-enter-from {
  opacity: 0.6;
  transform: translateX(50px);
}

.tags-enter-active {
  /*animation: wobble 0.5s ease;*/
  transition: all 0.2s ease;
}

.tags-leave-to {
  opacity: 0.6;
  transform: translateX(50px);
}

.tags-leave-active {
  transition: all 0.5s ease;
  position: absolute; /* for move transition after item leaves */
}

.tags-move {
  transition: all 0.5s ease;
}

@keyframes wobble {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    transform: translateY(0px);
    opacity: 1;
  }
  60% {
    transform: translateX(8px);
    opacity: 1;
  }
  70% {
    transform: translateX(-8px);
    opacity: 1;
  }
  80% {
    transform: translateX(4px);
    opacity: 1;
  }
  90% {
    transform: translateX(-4px);
    opacity: 1;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

/* fade transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* push transitions */
.push-enter-from {
  opacity: 1;
  transform: translate(30px, 0);
}

.push-enter-active {
  transition: 0.5s;
}

.push-leave-to {
  opacity: 1;
}

.push-leave-active {
  opacity: 0;
  position: absolute; /* for move transition after item leaves */
}

.push-move {
  transition: all 0.5s ease;
}

/* table transitions */
/* push transitions */
.table-enter-from {
  opacity: 1;
  transform: translate(30px, 0);
}

.table-enter-active {
  transition: 0.5s;
}

.table-leave-to {
  opacity: 1;
}

.table-leave-active {
  opacity: 0;
  position: absolute; /* for move transition after item leaves */
}

.table-move {
  transition: all 0.5s ease;
}
</style>
