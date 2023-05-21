<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import DynamicModal from '../../components/modal/DynamicModal.vue';
import DesignerModal from '../../components/modal/DesignerModal.vue';
import Designer from '../designer/Designer.vue';
import DefaultElement from '../../components/layouts/DefaultElement.vue';
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

  <DefaultElement :descriptionArea="true" class="bg-gray-100">
    <template #title>Number four</template>
    <template #description>
      As new users join, they bring innovative ideas, unique skills, and diverse
      experiences that enrich our platform. Connect with them, explore their
      work, and celebrate the fresh energy they contribute to our collaborative
      space.
    </template>
    <template #content>
      <p class="myPrimaryParagraph">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
        suscipit adipisci mollitia odit dolore voluptate voluptatibus eum libero
        explicabo, optio nostrum perspiciatis enim tenetur? Nobis inventore
        minus provident eveniet quidem natus quae possimus quam soluta, vitae,
        reprehenderit delectus eaque ab iste, voluptas enim debitis veritatis
        deserunt assumenda nisi.
      </p>
      <br />
      <p class="myPrimaryParagraph">
        Qui, quidem, expedita itaque harum dolores enim autem recusandae atque
        cumque accusamus delectus obcaecati corporis in reiciendis cum.
        Perferendis cupiditate porro at libero asperiores officiis explicabo?
        Sit dicta id ipsum aliquam quasi. Dolor repudiandae minus laborum
        recusandae quaerat nam sed debitis harum accusantium necessitatibus
        neque omnis, ut impedit? Unde dolorum maxime asperiores.
      </p>
      <button @click="handleDesigner" class="myPrimaryButton mt-8">
        Handle Designer
      </button>
    </template>
  </DefaultElement>
</template>

<style>
/* styles for designer page */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
</style>
