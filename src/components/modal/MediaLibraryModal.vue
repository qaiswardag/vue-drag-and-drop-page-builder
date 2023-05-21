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
              class="flex gap-2 justify-between items-center border-b border-gray-200"
            >
              <DialogTitle as="h3" class="tertiaryHeader my-0 py-0">
                {{ title }}
              </DialogTitle>

              <div class="flex-end">
                <XIcon
                  class="h-6 w-6 text-gray-700 self-center cursor-pointer"
                  @click="firstButton"
                ></XIcon>
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
                      <div class="mt-3 sm:mt-2">
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
                                v-for="tab in tabs"
                                :key="tab.name"
                                :aria-current="tab.current ? 'page' : undefined"
                                :class="[
                                  tab.name === selected
                                    ? 'border-emerald-500 text-emerald-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                  'py-2 px-3 my-1 text-xs rounded cursor-pointer bg-myPrimaryBrandColor text-white whitespace-nowrap',
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
                        <div v-if="true">
                          <Unsplash> </Unsplash>
                        </div>
                      </div>
                    </div>
                  </main>
                  <!-- Main content - end-->

                  <!-- Details sidebar start-->
                  <aside class="md:w-72 relative min-h-[55rem] max-h-[55rem]">
                    <div
                      class="md:w-72 h-screen overflow-y-scroll border border-gray-200 rounded"
                    >
                      <div class="pb-16 space-y-6">
                        <div v-if="getCurrentPreview">
                          <img
                            alt="preview"
                            class="mx-auto block w-full rounded-sm object-cover object-center cursor-pointer hover:shadow-sm"
                            :src="getCurrentPreview"
                          />
                        </div>

                        <div v-else>
                          <img
                            alt="preview"
                            class="mx-auto block w-full rounded-sm object-cover object-center cursor-pointer hover:shadow-sm"
                            :src="getCurrentElement.src"
                          />
                        </div>

                        <div class="md:px-3 sm:px-2">
                          <h3 class="font-medium text-gray-900">Information</h3>
                          <dl
                            class="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
                          >
                            <div
                              class="py-3 flex justify-between text-sm font-medium items-center"
                            >
                              <dt class="text-gray-500">Dimensions</dt>
                              <dd class="text-gray-900">640 x 668</dd>
                            </div>
                            <div
                              class="py-3 flex justify-between text-sm font-medium items-center"
                            >
                              <dt class="text-gray-500">Size</dt>
                              <dd class="text-gray-900">27 KB</dd>
                            </div>
                            <div
                              class="py-3 flex justify-between text-sm font-medium items-center"
                            >
                              <dt class="text-gray-500">Extension</dt>
                              <dd class="text-gray-900">jpg</dd>
                            </div>
                            <div
                              class="py-3 flex justify-between text-sm font-medium items-center"
                            >
                              <dt class="text-gray-500">Image Id</dt>
                              <dd class="text-gray-900">40</dd>
                            </div>
                            <div
                              class="py-3 flex justify-between text-sm font-medium items-center"
                            >
                              <dt class="text-gray-500">Uploaded by</dt>
                              <dd class="text-gray-900">Qais Wardag</dd>
                            </div>
                            <div
                              class="py-3 flex justify-between text-sm font-medium items-center"
                            >
                              <dt class="text-myPrimaryErrorColor">Delete</dt>
                              <dd class="text-gray-900">
                                <form>
                                  <div class="items-center">
                                    <div class="">
                                      <button
                                        type="button"
                                        class="myPrimaryButton min-w-auto myPrimaryDeleteButton py-1 px-1 bg-transparent shadow-none border-0 hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 text-myPrimaryErrorColor"
                                      >
                                        <span
                                          ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-5 h-5"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            ></path></svg></span
                                        ><span
                                          class="flex gap-2 items-center justify-center"
                                        >
                                          <!--v-if--></span
                                        >
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <div class="md:px-3 sm:px-2">
                          <div
                            class="absolute bottom-0 right-0 left-0 px-2 my-2 sm:flex justify-center sm:gap-3 grid gap-4 sm:grid-flow-row-dense md:w-full md:float-right"
                          >
                            <div v-if="firstButtonText">
                              <button
                                ref="firstButtonRef"
                                class="myPrimaryButton bg-gray-700 hover:bg-gray-800 text-white focus:ring-gray-700 text-sm w-full"
                                type="button"
                                @click="firstButton"
                              >
                                {{ firstButtonText }}
                              </button>
                            </div>

                            <div v-if="secondButtonText">
                              <button
                                class="myPrimaryButton bg-emerald-500 text-sm w-full"
                                type="button"
                                @click="secondButton"
                              >
                                {{ secondButtonText }}
                              </button>
                            </div>
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
import { CheckIcon, ExclamationIcon, BellIcon } from '@heroicons/vue/outline';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

import {
  CogIcon,
  CollectionIcon,
  HeartIcon,
  HomeIcon,
  MenuAlt2Icon,
  PhotographIcon,
  PlusSmIcon as PlusSmIconOutline,
  UserGroupIcon,
  ViewGridIcon as ViewGridIconOutline,
  XIcon,
} from '@heroicons/vue/outline';
import {
  PencilIcon,
  PlusSmIcon as PlusSmIconSolid,
  SearchIcon,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/vue/solid';
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
    MenuAlt2Icon,
    PencilIcon,
    PlusSmIconOutline,
    PlusSmIconSolid,
    SearchIcon,
    ViewGridIconSolid,
    ViewListIcon,
    XIcon,
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
    // get current preview
    const getCurrentPreview = computed(() => {
      return store.getters['designer/getCurrentPreview'];
    });
    //
    // get current element from store
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
      getCurrentPreview,
      changeSelected,
    };
  },
};
</script>
