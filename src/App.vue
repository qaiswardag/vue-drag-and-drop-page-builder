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
    name: 'Invite team members',
    description:
      'Rerum repellat labore necessitatibus reprehenderit molestiae praesentium.',
  },
  {
    name: 'Teamwork & collaboration',
    description:
      'Corporis asperiores ea nulla temporibus asperiores non tempore assumenda aut.',
  },
  {
    name: 'Keyboard shortcuts',
    description:
      'In sit qui aliquid deleniti et. Ad nobis sunt omnis. Quo sapiente dicta laboriosam.',
  },
  {
    name: 'Calendars',
    description:
      'Sed rerum sunt dignissimos ullam. Iusto iure occaecati voluptate eligendi fugiat sequi.',
  },
  {
    name: 'Notifications',
    description:
      'Quos inventore harum enim nesciunt. Aut repellat rerum omnis adipisci.',
  },
  {
    name: 'Boards',
    description:
      'Quae sit sunt excepturi fugit veniam voluptatem ipsum commodi.',
  },
  {
    name: 'Reporting',
    description:
      'Eos laudantium repellat sed architecto earum unde incidunt. Illum sit dolores voluptatem.',
  },
  {
    name: 'Mobile app',
    description:
      'Nulla est saepe accusamus nostrum est est. Fugit voluptatum omnis quidem voluptatem.',
  },
];

// store
const store = useStore();

// set backend current user
store.commit('user/setUser', {
  name: 'Joe Doe',
  email: 'joe@apple.com',
});

// set backend current user
store.commit('user/setUser', {
  name: 'Joe Doe',
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
      class="-m-1.5 p-1.5 myPrimaryParagraph text-2xl sm:text-3xl font-semibold text-white"
    >
      <span class="sr-only">myself</span>
      myself
    </a>

    <div class="flex lg:gap-x-12 myPrimaryGap">
      <p
        @click="handleDesigner"
        class="text-sm font-medium text-white flex gap-2 items-center cursor-pointer"
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
  <FullWidthElement :descriptionArea="true" class="bg-red-50">
    <template #title>All-in-one platform</template>
    <template #description>
      <span class="block">
        Minimalist app empowered with advanced team management capabilities and
        a state-of-the-art media library, it offers unrivaled control and
        efficiency. Seamlessly manage and organize your media assets. Take your
        administrative prowess to new heights with this powerful solution
        designed to streamline your operations and enhance productivity.
      </span>
      <p @click="handleDesigner" class="myPrimaryButton my-8">Start Designer</p>
    </template>
    <template #content>
      <div class="grid grid-cols-1 lg:gap-16 gap-24 lg:grid-cols-3">
        <div>
          <h2 class="myTertiaryHeader">Everything you need</h2>
          <p class="mt-2 myPrimaryParagraph font-medium">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
            ratione.
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
                class="absolute left-0 top-1 h-5 w-5 text-indigo-500"
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
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        obcaecati veniam consectetur ullam nobis quasi, sed dolorum odit
        voluptas pariatur quos.
        <br />
        Natus, animi eaque! Ipsam magni dolorum rem, incidunt excepturi aliquid
        quis consectetur, obcaecati distinctio quas fugit officiis animi
        delectus, enim fugiat aliquam explicabo eum consequuntur adipisci.
        Labore facere vitae nam, illo distinctio explicabo hic illum omnis amet
        doloremque autem quidem reprehenderit totam, inventore commodi!
        <br />
        <br />
        Accusamus asperiores libero, earum quos illum excepturi necessitatibus
        unde sapiente? Hic ipsum quam, enim minus earum exercitationem odit
        fugiat magnam, sit veritatis facilis consectetur numquam incidunt in?
        Officiis impedit porro laborum! Distinctio minus earum commodi.
      </div>
    </template>
  </FullWidthElement>

  <FullWidthElement :descriptionArea="true" class="bg-red-50">
    <template #title>Frequently asked questions</template>
    <template #description>
      As new users join, they bring innovative ideas, unique skills, and diverse
      experiences that enrich our platform. Connect with them, explore their
      work, and celebrate the fresh energy they contribute to our collaborative
      space.
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
                  <MinusSmallIcon v-else class="h-5 w-5" aria-hidden="true" />
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
        <img
          class="w-full object-cover lg:col-span-8"
          src="https://static.wixstatic.com/media/ea1602_193267bbb2eb4bbf90bd566f2e5406ab~mv2.png/v1/fill/w_1920,h_1076,al_c,q_95,enc_auto/respo_main.png"
          alt="image"
        />
      </div>
    </template>
  </FullWidthElement>

  <!-- Footer start -->
  <div
    class="mx-auto px-6 py-4 md:flex md:items-center md:justify-between lg:px-8 bg-myPrimaryLightGrayColor"
  >
    <div
      class="flex justify-center space-x-6 md:order-2 text-gray-600 hover:text-gray-700"
    >
      <a href="https://github.com/qaiswardag" target="_blank">
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
    <div class="mt-8 md:order-1 md:mt-0">
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
  </div>
  <!-- Footer end -->
</template>

<style>
/* styles for designer page */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
</style>
