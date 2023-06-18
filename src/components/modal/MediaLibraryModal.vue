<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot
    :show="open"
    as="template"
  >
    <Dialog
      as="div"
      class="fixed z-30 inset-0 overflow-y-auto"
      @close="firstButton"
    >
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          aria-hidden="true"
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full sm:p-6"
          >
            <div
              class="flex gap-2 justify-between items-center border-b border-gray-200 pb-2"
            >
              <DialogTitle
                as="h3"
                class="tertiaryHeader my-0 py-0"
              >
                {{ title }}
              </DialogTitle>

              <div class="flex-end">
                <XMarkIcon
                  class="h-6 w-6 text-gray-700 self-center cursor-pointer"
                  @click="firstButton"
                ></XMarkIcon>
              </div>
            </div>

            <div class="flex items-center pb-2 mb-2">
              <div class="flex-1">
                <!--content media library - start-->
                <div
                  class="h-full flex md:flex-row flex-col myPrimaryGap mt-2 p-2 overflow-y-scroll"
                >
                  <!-- Main content - start-->
                  <main class="flex-1 relativ">
                    <div class="pb-4 max-w-7xl mx-auto">
                      <!-- Tabs -->
                      <div class="mb-2">
                        <!-- Tabs Mobile -->
                        <div class="sm:hidden">
                          <label
                            for="tabs"
                            class="sr-only"
                            >Select a tab</label
                          >
                          <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->

                          <select
                            v-model="selected"
                            id="tabs"
                            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-myPrimaryLinkColor focus:border-myPrimaryLinkColor sm:text-sm rounded-md"
                          >
                            <option>Unsplash</option>
                          </select>
                        </div>
                        <div class="hidden sm:block">
                          <div
                            class="flex items-center border border-gray-200 py-1 px-2 rounded"
                          >
                            <nav
                              class="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                              aria-label="Tabs"
                            >
                              <div
                                @click="changeSelectedMenuTab(tab.name)"
                                v-for="tab in tabs"
                                :key="tab.name"
                                :aria-current="tab.current ? 'page' : undefined"
                                class="py-2 px-3 my-1 text-xs cursor-pointer"
                                :class="[
                                  tab.name === selected
                                    ? 'myPrimaryButton'
                                    : 'text-gray-500 hover:text-gray-700 ',
                                  'whitespace-nowrap',
                                ]"
                              >
                                {{ tab.name }}
                              </div>
                            </nav>
                          </div>
                        </div>
                      </div>

                      <div v-if="selected === 'Unsplash'">
                        <Unsplash> </Unsplash>
                      </div>
                    </div>
                  </main>
                  <!-- Main content - end-->

                  <!-- Details sidebar start-->
                  <aside class="md:w-72 relative min-h-[62rem] max-h-[62rem]">
                    <div
                      class="md:w-72 md:min-h-[56.5rem] md:max-h-[56.5rem] min-h-[15rem] max-h-[15rem] overflow-y-scroll bg-white border border-gray-200 rounded"
                    >
                      <div class="pb-6 space-y-6">
                        <div
                          v-if="
                            getHighlightedImage &&
                            getHighlightedImage.file !== null
                          "
                          class="pb-6 space-y-6"
                        >
                          <img
                            alt="preview"
                            class="mx-auto block w-full rounded-t-sm object-cover object-center cursor-pointer hover:shadow-sm"
                            :src="getHighlightedImage.file"
                          />

                          <div class="md:px-2 px-2">
                            <h3 class="font-normal text-gray-900">
                              Information
                            </h3>
                            <dl
                              class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
                            >
                              <div
                                class="py-3 flex justify-between text-sm font-normal items-center"
                              >
                                <dt class="text-gray-500">Dimensions</dt>
                                <dd class="text-gray-900">
                                  {{ getHighlightedImage?.imageDetails?.width }}
                                  x
                                  {{
                                    getHighlightedImage?.imageDetails?.height
                                  }}
                                </dd>
                              </div>
                              <div
                                class="py-3 flex justify-between text-sm font-normal items-center"
                              >
                                <dt class="text-gray-500">By</dt>
                                <dd class="text-gray-900">
                                  {{
                                    getHighlightedImage?.imageDetails?.user
                                      ?.name
                                  }}
                                </dd>
                              </div>

                              <div
                                class="py-3 flex justify-between text-sm font-normal items-center"
                              >
                                <dt class="text-gray-500">Image ID</dt>
                                <dd class="text-gray-900">
                                  {{
                                    getHighlightedImage.imageDetails &&
                                    getHighlightedImage.imageDetails?.id
                                  }}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                        <div
                          v-if="
                            (getElement &&
                              getElement.src !== undefined &&
                              getHighlightedImage === null) ||
                            getHighlightedImage?.file === null
                          "
                        >
                          <img
                            alt="preview"
                            class="mx-auto block w-full rounded-t-sm object-cover object-center cursor-pointer hover:shadow-sm"
                            :src="getElement.src"
                          />
                        </div>

                        <div class="md:px-2 px-2">
                          <div
                            class="absolute bottom-0 right-0 left-0 px-2 my-2 flex justify-end gap-2"
                          >
                            <template v-if="firstButtonText">
                              <button
                                ref="firstButtonRef"
                                class="mySecondaryButton"
                                type="button"
                                @click="firstButton"
                              >
                                {{ firstButtonText }}
                              </button>
                            </template>

                            <template v-if="secondButtonText">
                              <button
                                class="myPrimaryButton"
                                type="button"
                                @click="secondButton"
                              >
                                {{ secondButtonText }}
                              </button>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </aside>
                  <!-- Details sidebar end-->
                </div>
                <!--content media library - end-->
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import {
  BellIcon,
  CheckIcon,
  Square3Stack3DIcon,
  HeartIcon,
  HomeIcon,
  Bars2Icon,
  PhotoIcon,
  PlusIcon,
  UserGroupIcon,
  XMarkIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  RectangleStackIcon,
  QueueListIcon,
} from '@heroicons/vue/24/outline';

import Unsplash from '../designer/editor-menu/media-library-components/Unsplash.vue';

const selected = ref('Unsplash');

const tabs = [
  {
    name: 'Unsplash',
    href: '#',
    current: false,
  },
];

export default {
  components: {
    Unsplash,
    Dialog,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    HeartIcon,
    Bars2Icon,
    PencilIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    RectangleStackIcon,
    QueueListIcon,
    XMarkIcon,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      required: true,
    },
    firstButtonText: {
      type: String,
    },
    secondButtonText: {
      type: String,
    },
    thirdButtonText: {
      type: String,
    },
    open: {
      required: true,
    },
  },

  setup(props, context) {
    //
    // store
    const store = useStore();
    //
    //
    const getHighlightedImage = computed(() => {
      return store.getters['designer/getHighlightedImage'];
    });
    const getBasePrimaryImage = computed(() => {
      return store.getters['designer/getBasePrimaryImage'];
    });
    //
    const getElement = computed(() => {
      return store.getters['designer/getElement'];
    });
    //
    //
    // first button function
    const firstButton = function () {
      context.emit('firstMediaButtonFunction');
    };

    // second button  function
    const secondButton = function () {
      context.emit('secondMediaButtonFunction');
    };

    // third button function
    const thirdButton = function () {
      context.emit('thirdMediaButtonFunction');
    };
    //
    //
    const changeSelectedMenuTab = function (clicked) {
      selected.value = clicked;
    };
    //
    //
    return {
      firstButton,
      secondButton,
      thirdButton,
      tabs,
      selected,
      getElement,
      getBasePrimaryImage,
      changeSelectedMenuTab,
      getHighlightedImage,
    };
  },
};
</script>
