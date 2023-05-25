<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot :show="open" as="template">
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
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full sm:p-6"
          >
            <div
              class="flex gap-2 justify-between items-center border-b border-gray-200 pb-2"
            >
              <DialogTitle as="h3" class="tertiaryHeader my-0 py-0">
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
                <div class="flex-1 flex items-stretch overflow-hidden mt-2">
                  <!-- Main content - start-->
                  <main class="flex-1 overflow-y-auto">
                    <div class="max-w-7xl mx-auto px-4 sm:pr-6 lg:pr-8">
                      <!-- Tabs -->
                      <div class="sm:hidden">
                        <label for="tabs" class="sr-only">Select a tab</label>
                        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->

                        <select
                          v-model="selected"
                          @change="yPaddingChange"
                          id="tabs"
                          class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                        >
                          <option>Unsplash.com</option>
                        </select>

                        <div class="hidden sm:block">
                          <div
                            class="flex items-center border border-gray-200 py-1 px-2 rounded"
                          >
                            <nav
                              class="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                              aria-label="Tabs"
                            >
                              <div
                                v-for="tab in tabs"
                                :key="tab.name"
                                :aria-current="tab.current ? 'page' : undefined"
                                :class="[
                                  tab.name === selected
                                    ? 'text-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                  'py-2 px-3 my-1  rounded cursor-pointer bg-myPrimaryBrandColor text-white whitespace-nowrap',
                                ]"
                              >
                                <span
                                  class="cursor-pointer"
                                  @click="changeSelected(tab.name)"
                                >
                                  {{ tab.name }}
                                </span>
                              </div>
                            </nav>
                          </div>
                        </div>
                      </div>

                      <div v-if="selected === 'Unsplash.com'">
                        <Unsplash> </Unsplash>
                      </div>
                    </div>
                  </main>
                  <!-- Main content - end-->

                  <!-- Details sidebar start-->
                  <aside class="md:w-72 relative min-h-[58rem] max-h-[58rem]">
                    <div
                      class="md:w-72 md:min-h-[53rem] md:max-h-[53rem] min-h-[15rem] max-h-[15rem] overflow-y-scroll bg-white border border-gray-200 rounded"
                    >
                      <div class="pb-6 space-y-6">
                        <div
                          v-if="
                            getCurrentClickedImage &&
                            getCurrentClickedImage.file !== null
                          "
                          class="pb-6 space-y-6"
                        >
                          <img
                            alt="preview"
                            class="mx-auto block w-full rounded-sm object-cover object-center cursor-pointer hover:shadow-sm"
                            :src="getCurrentClickedImage.file"
                          />

                          <div class="md:px-3 sm:px-2">
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
                                  {{
                                    getCurrentClickedImage?.imageDetails?.width
                                  }}
                                  x
                                  {{
                                    getCurrentClickedImage?.imageDetails?.height
                                  }}
                                </dd>
                              </div>
                              <div
                                class="py-3 flex justify-between text-sm font-normal items-center"
                              >
                                <dt class="text-gray-500">By</dt>
                                <dd class="text-gray-900">
                                  {{
                                    getCurrentClickedImage?.imageDetails?.user
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
                                    getCurrentClickedImage.imageDetails &&
                                    getCurrentClickedImage.imageDetails?.id
                                  }}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                        <div
                          v-if="
                            (getCurrentElement &&
                              getCurrentElement.src !== undefined &&
                              getCurrentClickedImage === null) ||
                            getCurrentClickedImage.file === null
                          "
                        >
                          <img
                            alt="preview"
                            class="mx-auto block w-full rounded-sm object-cover object-center cursor-pointer hover:shadow-sm"
                            :src="getCurrentElement.src"
                          />
                        </div>

                        <div class="md:px-3 sm:px-2">
                          <div
                            class="absolute bottom-0 right-0 left-0 px-2 my-2 sm:flex justify-between sm:gap-3 grid gap-4 sm:grid-flow-row-dense md:w-full md:float-right"
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

const selected = ref('Unsplash.com');

const tabs = [
  {
    name: 'Unsplash.com',
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
    const getCurrentClickedImage = computed(() => {
      return store.getters['designer/getCurrentClickedImage'];
    });
    const getCurrentImagePreview = computed(() => {
      return store.getters['designer/getCurrentImagePreview'];
    });
    //
    const getCurrentElement = computed(() => {
      return store.getters['designer/getCurrentElement'];
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
    const changeSelected = function (clicked) {
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
      getCurrentElement,
      getCurrentImagePreview,
      changeSelected,
      getCurrentClickedImage,
    };
  },
};
</script>
