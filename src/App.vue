<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import DynamicModal from './components/modal/DynamicModal.vue';
import DesignerModal from './components/modal/DesignerModal.vue';
import Designer from './views/designer/Designer.vue';
import FullWidthElement from './components/layouts/FullWidthElement.vue';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.tailwindcss.com';
});

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
      <a href="#" class="text-sm font-medium text-white">Home</a>

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
  <FullWidthElement :descriptionArea="true" class="bg-gray-50">
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
        class="grid grid-cols-1 lg:gap-x-28 gap-x-8 lg:gap-y-20 gap-y-16 lg:grid-cols-12"
      >
        <img
          class="w-full object-cover col-span-8"
          src="https://media-www.sqspcdn.com/images/pages/tour/overview-websites/customer-quote-block/adrienne-raquel-1500w.jpg"
          alt=""
        />
        <div class="lg:pt-4 col-span-4">
          <h2 class="myFourthHeader">Deploy faster</h2>
          <p class="mySecondaryHeader">A better workflow</p>
          <p class="mt-6 myPrimaryParagraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
            impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
            ratione.
          </p>
          <dl class="mt-10 max-w-xl space-y-8 myPrimaryParagraph lg:max-w-none">
            <!-- space -->
            <dd class="block mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </dd>

            <!-- space -->
            <dd class="block mt-4">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo.
            </dd>

            <!-- space -->
            <dd class="block mt-4">
              Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et
              magna sit morbi lobortis.
            </dd>
          </dl>
          <button @click="handleDesigner" class="myPrimaryButton mt-8">
            Start Designer
          </button>
        </div>
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

  <FullWidthElement :descriptionArea="true" class="bg-gray-50">
    <template #title>Frequently asked questions</template>
    <template #description>
      As new users join, they bring innovative ideas, unique skills, and diverse
      experiences that enrich our platform. Connect with them, explore their
      work, and celebrate the fresh energy they contribute to our collaborative
      space.
    </template>
    <template #content>
      <div
        class="grid grid-cols-1 lg:gap-x-28 gap-x-8 lg:gap-y-20 gap-y-16 lg:grid-cols-12"
      >
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
          src="https://media-www.sqspcdn.com/images/pages/homepage/jun-2022/showcase/meiwen-see-1500w.webp"
          alt="image"
        />
      </div>
    </template>
  </FullWidthElement>
</template>

<style>
/* styles for designer page */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
</style>
