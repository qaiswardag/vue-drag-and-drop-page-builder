<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import DynamicModal from './components/modal/DynamicModal.vue';
import DesignerModal from './components/modal/DesignerModal.vue';
import Designer from './views/designer/Designer.vue';
import FullWidthElement from './components/layouts/FullWidthElement.vue';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { CheckIcon } from '@heroicons/vue/20/solid';

const features = [
  {
    name: 'Live Drag & Drop Builder',
    description:
      'Drag-and-drop content on a page and watch your pages come to life.',
  },
  {
    name: 'Technologies and Frameworks',
    description:
      'Cutting-Edge Technologies and Frameworks. Developed with Vue 3, Vuex, Composition API, and Tailwind CSS.',
  },
  {
    name: 'Set Brand and Link Colors one place',
    description:
      'Set Brand and Link Colors once and apply them across the entire Platform with ease.',
  },
  {
    name: 'Mobile-First Approach',
    description: 'Developed with Mobile-First approach.',
  },
  {
    name: 'Media Library',
    description:
      'A beautiful and user-friendly media library that allows you to effortlessly change and update images.',
  },
  {
    name: 'Minimal and Intuitive Design',
    description:
      'Beautiful, elegant and intuitive design. Enhance user engagement with amazing visual experience.',
  },
];
const faqs = [
  {
    question: 'Live Drag & Drop Builder?',
    answer:
      'Drag-and-drop content on a page and watch your pages come to life.',
  },
  {
    question: 'Technologies and Frameworks?',
    answer:
      'Cutting-Edge Technologies and Frameworks. Developed with Vue 3, Vuex, Composition API, and Tailwind CSS.',
  },
  {
    question: 'Set Brand and Link Colors one place?',
    answer:
      'Set Brand and Link Colors once and apply them across the entire Platform with ease.',
  },
  {
    question: 'Media Library?',
    answer:
      'A beautiful and user-friendly media library that allows you to effortlessly change and update images.',
  },
  {
    question: 'Mobile-First Approach?',
    answer: 'Developed with Mobile-First approach.',
  },
  {
    question: 'Minimal and Intuitive Design?',
    answer:
      'Beautiful, elegant and intuitive design. Enhance user engagement with amazing visual experience.',
  },
];

// store
const store = useStore();

// set backend current user
store.commit('user/setUser', {
  name: 'John Doe',
  email: 'joe@apple.com',
});

const openDesignerModal = ref(false);
// use designer model
const firstDesignerModalButtonFunction = ref(null);
//
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
    @firstDesignerModalButtonFunction="firstDesignerModalButtonFunction"
  >
    <Designer></Designer>
  </DesignerModal>
  <nav
    class="px-6 py-6 mx-auto flex items-center justify-between bg-gray-50"
    aria-label="Global"
  >
    <a href="/">
      <img
        class="h-6"
        src="/logo-myissue.svg"
        alt="Logo"
      />
    </a>

    <div class="flex lg:gap-x-12 myPrimaryGap">
      <p
        @click="handleDesigner"
        class="text-sm font-medium text-myPrimaryDarkGrayColor flex gap-2 items-center cursor-pointer"
      >
        Start Builder
      </p>
    </div>
  </nav>

  <div class="myPrimaryMainPageHeaderParagraph">
    <h1 class="myPrimaryMainPageHeaderNotLoggedIn">
      Build stunning pages with Vue
      <br />
      using an easy interface
    </h1>
    <p class="myPrimaryMainPageParagraphNotLoggedIn">
      Power your vision and build impressive pages with ease using an intuitive
      Vue.js drag-and-drop page builder.
      <br />
      <a
        class="text-myPrimaryLinkColor"
        href="https://github.com/qaiswardag/vue-drag-and-drop-page-builder"
        target="_blank"
      >
        Visit the project's GitHub repository.
      </a>
    </p>
    <div class="flex justify-center gap-2 my-8">
      <div>
        <button
          @click="handleDesigner"
          class="myPrimaryButton"
        >
          Start Builder
        </button>
      </div>
    </div>
  </div>
  <FullWidthElement
    :descriptionArea="true"
    class="bg-red-50"
  >
    <template #title>All-in-one Page Builder</template>
    <template #description>
      <span class="block">
        Build responsive pages and manage content easily pages with ease using
        an intuitive Vue drag-and-drop page builder. Elevate your creative
        vision and effortlessly create pages using an intuitive Vue.js
        drag-and-drop Page Builder.
        <br />
        <a
          class="text-myPrimaryLinkColor"
          href="https://github.com/qaiswardag/vue-drag-and-drop-page-builder"
          target="_blank"
        >
          Visit the project's GitHub repository.
        </a>
        <br />
        Feel free to contact me with any questions. You can reach me through
        <a
          class="text-myPrimaryLinkColor"
          href="mailto:qais.wardag@outlook.com"
          >Email</a
        >
        or
        <a
          class="text-myPrimaryLinkColor"
          href="https://www.linkedin.com/in/qaiswardag/"
          target="_blank"
          >LinkedIn</a
        >.
      </span>
      <div class="flex justify-start gap-2 my-8">
        <div>
          <button
            @click="handleDesigner"
            class="myPrimaryButton"
          >
            Start Builder
          </button>
        </div>

        <div>
          <a
            class="myPrimaryButton"
            href="https://www.admin.myissue.io"
            target="_blank"
            >Try Admin Panel</a
          >
        </div>
      </div>
    </template>
    <template #content>
      <div class="grid grid-cols-1 lg:gap-16 gap-24 lg:grid-cols-3">
        <div>
          <h2 class="myTertiaryHeader">Everything you need</h2>
          <p class="mt-2 myPrimaryParagraph font-medium">
            Power your vision and build impressive pages with ease using an
            intuitive Vue drag-and-drop page builder, and achieve stunning
            results.
          </p>
        </div>
        <dl
          class="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="relative pl-9"
          >
            <dt class="myFourthHeader">
              <CheckIcon
                class="absolute left-0 top-1 h-5 w-5 text-myPrimaryBrandColor"
                aria-hidden="true"
              />
              {{ feature.name }}
            </dt>
            <dd class="mt-2 myPrimaryParagraph">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </template>
  </FullWidthElement>

  <FullWidthElement :descriptionArea="true">
    <template #title>Break free from design limitations</template>
    <template #description> Elevate your creativity to new heights.</template>
    <template #content>
      <p class="myPrimaryPragraph">
        Build your website pages with hundreds of ready-made components.
        Designed to fit your every need, fully customizable & always responsive.
        Elevate your creative vision and effortlessly create pages using an
        intuitive Vue.js drag-and-drop page builder. Break free from design
        limitations and turn your visions into reality.
      </p>
    </template>
  </FullWidthElement>

  <FullWidthElement
    :descriptionArea="true"
    class="bg-red-50"
  >
    <template #title>Frequently asked questions</template>
    <template #description>
      Power your vision and build impressive pages with ease using an intuitive
      Vue drag-and-drop page builder, and achieve stunning results.
    </template>
    <template #content>
      <div class="grid grid-cols-1 lg:gap-16 gap-24 lg:grid-cols-12">
        <dl class="divide-y divide-myPrimaryMediumGrayColor lg:col-span-4">
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
                <span class="myPrimaryParagraph font-medium"
                  >{{ faq.question }}
                </span>
                <span class="ml-6 flex h-7 items-center">
                  <PlusSmallIcon
                    v-if="!open"
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                  <MinusSmallIcon
                    v-else
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel
              as="dd"
              class="mt-2 pr-12 pb-16"
            >
              <p class="myPrimaryParagraph">
                {{ faq.answer }}
              </p>
            </DisclosurePanel>
          </Disclosure>
        </dl>
        <img
          class="w-full object-cover lg:col-span-8"
          src="/images/myissue-deisgner-cover.jpg"
          alt="image"
        />
      </div>
    </template>
  </FullWidthElement>

  <!-- Footer start -->
  <div
    class="space-y-6 mx-auto px-6 py-4 md:flex md:items-center md:justify-between lg:px-8 bg-myPrimaryLightGrayColor"
  >
    <div
      class="flex justify-center space-x-6 md:order-2 text-gray-600 hover:text-gray-700"
    >
      <p class="myPrimaryParagraph text-gray-600">
        ©
        <a
          href="https://github.com/qaiswardag"
          target="_blank"
          class="myPrimaryLink text-gray-600"
          >Qais Wardag / GitHub
        </a>
      </p>
    </div>
    <div
      class="flex justify-center space-x-6 md:order-2 text-gray-600 hover:text-gray-700"
    >
      <a
        href="https://github.com/qaiswardag"
        target="_blank"
      >
        <span class="sr-only">GitHub</span>
        <svg
          class="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  </div>
  <!-- Footer end -->
</template>

<style>
/* styles for designer page */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
</style>
