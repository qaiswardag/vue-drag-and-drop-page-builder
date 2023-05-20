<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import DynamicModal from '../../components/modal/DynamicModal.vue';
import DesignerModal from '../../components/modal/DesignerModal.vue';
import Designer from '../designer/Designer.vue';

// store
const store = useStore();

// set backend current user
store.commit('user/setUser', {
  name: 'Joe Doe',
  email: 'joe@apple.com',
});

const openDesignerModal = ref(false);
// use designer model
const firstDesignerModalButtonFunction = ref(null);
//

const handleDesigner = function () {
  // set modal standards
  openDesignerModal.value = true;

  // handle click
  firstDesignerModalButtonFunction.value = function () {
    // set open modal
    openDesignerModal.value = false;
  };
  // end modal
};
</script>

<template>
  <DesignerModal
    :show="openDesignerModal"
    :title="titleModal"
    @firstDesignerModalButtonFunction="firstDesignerModalButtonFunction"
  >
    <main>
      <Designer></Designer>
    </main>
  </DesignerModal>
  <div class="flex min-h-full flex-col bg-white pt-16 pb-12">
    <main
      class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8"
    >
      <div class="flex flex-shrink-0 justify-center">
        <a href="/" class="inline-flex">
          <span class="sr-only">meeshop.dk</span>
          <img
            class="h-12 w-auto"
            src="https://www.meeshop.dk/zeus-assets/images//Logo-gron.svg"
            alt=""
          />
        </a>
      </div>
      <div class="py-16">
        <div class="text-center">
          <p
            class="text-xs font-semibold text-gray-500 mt-12 mb-0 tracking-wider"
          >
            Welcome to our platform
          </p>
          <h1
            class="text-4xl font-bold text-gray-900 sm:text-5xl tracking-normal"
          >
            Designer
          </h1>
          <p class="mt-12 text-base text-gray-500 tracking-normal">
            Visit our Vue 3 website drag and drop page builder designer.
          </p>

          <div
            @click="handleDesigner"
            class="text-2xl font-medium text-emerald-500 hover:text-emerald-600"
          >
            Handle Designer
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
/* styles for designer page */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
</style>
