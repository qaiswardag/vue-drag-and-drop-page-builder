<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import DynamicModal from '../../components/modal/DynamicModal.vue';
import DesignerModal from '../../components/modal/DesignerModal.vue';
import Designer from '../designer/Designer.vue';
import FullWidthElement from '../../components/layouts/FullWidthElement.vue';
import {
  MinusCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
} from '@heroicons/vue/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
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
//
//
//
//
const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat. I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
];
</script>

<template>
  <DesignerModal
    :show="openDesignerModal"
    @firstDesignerModalButtonFunction="firstDesignerModalButtonFunction"
  >
    <Designer></Designer>
  </DesignerModal>
  <nav
    class="mx-auto flex items-center justify-between p-6 lg:px-8 bg-black"
    aria-label="Global"
  >
    <a
      href="/"
      class="-m-1.5 p-1.5 myPrimaryParagraph text-xl sm:text-md font-semibold text-white"
    >
      <span class="sr-only">Your Company</span>
      myDesigner
    </a>

    <div class="flex lg:gap-x-12 myPrimaryGap">
      <a href="#" class="text-sm font-normal text-white">Home</a>

      <p
        @click="handleDesigner"
        class="text-sm font-normal text-white flex gap-2 items-center cursor-pointer"
      >
        Start Designer
      </p>
    </div>
  </nav>

  <div class="myPrimaryMainPageHeaderParagraph">
    <h1 class="myPrimaryMainPageHeaderNotLoggedIn">
      Build Stunning Pages
      <br />
      with Easy Drag & Drop Designer
    </h1>
    <p class="myPrimaryMainPageParagraphNotLoggedIn">
      Power your vision and build impressive pages with ease using our intuitive
      drag and drop page builder to achieve stunning results.
    </p>
  </div>
  <FullWidthElement :descriptionArea="true" class="bg-myPrimaryLightGrayColor">
    <template #title>All-in-one platform</template>
    <template #description>
      Elevate your creative vision and effortlessly create pages using our
      intuitive drag and drop page builder. Break free from design limitations
      and turn your visions into reality - zero coding required.
      <br />
      Build your website pages with hundreds of ready-made componenets. Designed
      to fit your every need, fully customizable & always responsive.
    </template>
    <template #content>
      <div
        class="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start"
      >
        <div class="lg:pt-4">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
            <h2 class="myFourthHeader">Deploy faster</h2>
            <p class="mySecondaryHeader">A better workflow</p>
            <p class="mt-6 myPrimaryParagraph">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </p>
            <dl
              class="mt-10 max-w-xl space-y-8 myPrimaryParagraph lg:max-w-none"
            >
              <!-- space -->
              <dd class="block mt-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores impedit perferendis suscipit eaque, iste dolor
                cupiditate blanditiis ratione.
              </dd>

              <!-- space -->
              <dd class="block mt-4">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo.
              </dd>

              <!-- space -->
              <dd class="block mt-4">
                Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.
                Et magna sit morbi lobortis.
              </dd>
            </dl>
          </div>
          <button @click="handleDesigner" class="myPrimaryButton mt-8">
            Start Designer
          </button>
        </div>
        <div class="sm:px-6 lg:px-0">
          <img
            src="https://media-www.sqspcdn.com/images/curated-entry-points/BYOT_Promo_Image.jpg?format=1500w"
            alt=""
          />
        </div>
      </div>
    </template>
  </FullWidthElement>

  <FullWidthElement :descriptionArea="true">
    <template #title>Frequently asked questions</template>
    <template #description>
      As new users join, they bring innovative ideas, unique skills, and diverse
      experiences that enrich our platform. Connect with them, explore their
      work, and celebrate the fresh energy they contribute to our collaborative
      space.
    </template>
    <template #content>
      <dl class="divide-y divide-myPrimaryMediumGrayColor">
        <Disclosure
          as="div"
          v-for="faq in faqs"
          :key="faq.question"
          v-slot="{ open }"
        >
          <dt>
            <DisclosureButton
              class="py-6 flex w-full items-center justify-between text-left myPrimaryParagraph"
            >
              <span class="myPrimaryParagraph font-normal"
                >{{ faq.question }}
              </span>
              <span class="ml-6 flex h-7 items-center">
                <PlusIcon v-if="!open" class="h-4 w-4" aria-hidden="true" />
                <MinusIcon v-else class="h-4 w-4" aria-hidden="true" />
              </span>
            </DisclosureButton>
          </dt>
          <DisclosurePanel as="dd" class="mt-2 pr-12 pb-16">
            <p class="myPrimaryParagraph">
              {{ faq.answer }}
            </p>
          </DisclosurePanel>
        </Disclosure>
      </dl>
    </template>
  </FullWidthElement>
</template>

<style>
/* styles for designer page */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
</style>
