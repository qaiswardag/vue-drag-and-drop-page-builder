<script setup>
import Modal from '../modal/Modal.vue';
import { CheckIcon, XMarkIcon, BellIcon } from '@heroicons/vue/24/outline';

import {} from '@headlessui/vue';

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  disabledWhichButton: {
    type: String,
    default: '',
    required: false,
  },
  maxWidth: {
    type: String,
    required: false,
    default: '2xl',
  },
  gridColumnAmount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
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
});

const emit = defineEmits([
  'firstModalButtonFunction',
  'secondModalButtonFunction',
  'thirdModalButtonFunction',
]);

// first button function
const firstButton = function () {
  emit('firstModalButtonFunction');
};
// second button  function
const secondButton = function () {
  emit('secondModalButtonFunction');
};

// third button function
const thirdButton = function () {
  emit('thirdModalButtonFunction');
};
</script>

<template>
  <Modal :show="show" @close="firstButton" :maxWidth="maxWidth">
    <slot name="content" />

    <div
      class="px-4 relative inline-block align-bottom text-left overflow-hidden transform transition-all sm:align-middle w-full"
    >
      <div class="flex items-center border-b border-gray-200 pb-2 mb-2">
        <div class="flex-1">
          <div v-if="type === 'default'"></div>

          <div class="flex gap-2 justify-start items-center">
            <div
              v-if="type === 'success'"
              class="flex items-center justify-center h-6 w-6 rounded-full bg-green-100"
            >
              <CheckIcon
                aria-hidden="true"
                class="h-4 w-4 text-myPrimaryLinkColor"
              />
            </div>

            <div
              v-if="type === 'warning'"
              class="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-200"
            >
              <BellIcon
                aria-hidden="true"
                class="h-4 w-4 text-myPrimaryDarkGrayColor"
              />
            </div>

            <div
              v-if="type === 'delete'"
              class="flex items-center justify-center h-6 w-6 rounded-full bg-red-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-red-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>

            <div
              v-if="type === 'danger'"
              class="flex items-center justify-center h-6 w-6 rounded-full bg-red-100"
            >
              <XMarkIcon aria-hidden="true" class="h-4 w-4 text-red-600" />
            </div>

            <h3 as="h3" class="myTertiaryHeader my-0 py-0">
              {{ title }}
            </h3>
          </div>
        </div>
        <div @click="firstButton" class="flex-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            class="h-6 w-6 text-myPrimaryDarkGrayColor self-center cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
      </div>

      <div>
        <div v-html="description" class="myPrimaryParagraph mt-4 mb-6"></div>

        <slot name="header"></slot>

        <slot></slot>
      </div>
    </div>

    <div
      class="bg-gray-100 px-6 py-4 bottom-0 left-0 right-0 flex sm:justify-end justify-center"
    >
      <slot name="footer" />
      <div
        :class="{
          'sm:grid-cols-1': gridColumnAmount === 1,
          'sm:grid-cols-2': gridColumnAmount === 2,
          'sm:grid-cols-3': gridColumnAmount === 3,
        }"
        class="sm:items-end sm:justify-end flex sm:flex-row flex-col myPrimaryGap sm:w-5/6 w-full"
      >
        <button
          v-if="firstButtonText"
          ref="firstButtonRef"
          class="mySecondaryButton"
          type="button"
          @click="firstButton"
        >
          {{ firstButtonText }}
        </button>

        <div v-if="secondButtonText">
          <div v-if="disabled && disabledWhichButton === 'secondButton'">
            <button
              class="flex items-center gap-2 myPrimaryButton bg-yellow-300 hover:bg-yellow-400 text-myPrimaryDarkGrayColor hover:text-myPrimaryDarkGrayColor focus:ring-yellow-400 w-full"
              :class="{
                'opacity-25 cursor-default': disabled,
              }"
              :disabled="disabled"
              type="button"
              @click="secondButton"
            >
              <div>
                <Transition name="bounce">
                  <div role="status" class="flex items-center">
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                      stroke-width="1.5"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                </Transition>
              </div>
              <div>Loading..</div>
            </button>
          </div>

          <div v-if="!disabled || disabledWhichButton !== 'secondButton'">
            <button
              class="myPrimaryButton bg-yellow-300 hover:bg-yellow-400 text-myPrimaryDarkGrayColor hover:text-myPrimaryDarkGrayColor focus:ring-yellow-400 w-full"
              type="button"
              @click="secondButton"
            >
              {{ secondButtonText }}
            </button>
          </div>
        </div>

        <div v-if="thirdButtonText">
          <div v-if="type === 'default'">
            <div v-if="disabled && disabledWhichButton === 'thirdButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                :class="{
                  'opacity-25 cursor-default': disabled,
                }"
                :disabled="disabled"
                type="button"
              >
                <div>
                  <Transition name="bounce">
                    <div role="status" class="flex items-center">
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                        stroke-width="1.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </Transition>
                </div>
                <div>Loading..</div>
              </button>
            </div>

            <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
              <button
                class="myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                type="button"
                @click="thirdButton"
              >
                {{ thirdButtonText }}
              </button>
            </div>
          </div>
          <div v-if="type === 'success'">
            <div v-if="disabled && disabledWhichButton === 'thirdButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                :class="{
                  'opacity-25 cursor-default': disabled,
                }"
                :disabled="disabled"
                type="button"
              >
                <div>
                  <Transition name="bounce">
                    <div role="status" class="flex items-center">
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                        stroke-width="1.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </Transition>
                </div>
                <div>Loading..</div>
              </button>
            </div>

            <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
              <button
                class="myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                type="button"
                @click="thirdButton"
              >
                {{ thirdButtonText }}
              </button>
            </div>
          </div>

          <div v-if="type === 'warning'">
            <div v-if="disabled && disabledWhichButton === 'thirdButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-myPrimaryLinkColor focus-visible:ring-myPrimaryLinkColor focus:ring-myPrimaryLinkColor hover:bg-myPrimaryLinkColor w-full"
                :class="{
                  'opacity-25 cursor-default': disabled,
                }"
                :disabled="disabled"
                type="button"
              >
                <div>
                  <Transition name="bounce">
                    <div role="status" class="flex items-center">
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                        stroke-width="1.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </Transition>
                </div>
                <div>Loading..</div>
              </button>
            </div>

            <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-myPrimaryErrorColor hover:bg-red-600 text-white focus:ring-myPrimaryErrorColor w-full"
                type="button"
                @click="thirdButton"
              >
                {{ thirdButtonText }}
              </button>
            </div>
          </div>

          <div v-if="type === 'danger' || type === 'delete'">
            <div v-if="disabled && disabledWhichButton === 'thirdButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-myPrimaryErrorColor hover:bg-red-600 text-white focus:ring-myPrimaryErrorColor w-full"
                :class="{
                  'opacity-25 cursor-default': disabled,
                }"
                :disabled="disabled"
                type="button"
              >
                <div>
                  <Transition name="bounce">
                    <div role="status" class="flex items-center">
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 animate-spin text-white-600 fill-gray-800 flex items-center"
                        stroke-width="1.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </Transition>
                </div>
                <div>Loading..</div>
              </button>
            </div>

            <div v-if="!disabled || disabledWhichButton !== 'thirdButton'">
              <button
                class="flex items-center gap-2 myPrimaryButton bg-myPrimaryErrorColor hover:bg-red-600 text-white focus:ring-myPrimaryErrorColor w-full"
                type="button"
                @click="thirdButton"
              >
                {{ thirdButtonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
