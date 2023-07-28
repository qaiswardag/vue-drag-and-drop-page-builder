<script setup>
import tailwindBorderStyleWidthPlusColor from '../../../../utils/tailwind-border-style-width-color';
import Designer from '../../../../composables/Designer';
import EditorAccordion from '../EditorAccordion.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const store = useStore();

const designer = new Designer(store);

const borderStyle = ref(null);
const borderWidth = ref(null);
const borderColor = ref(null);

const getBorderStyle = computed(() => {
  return store.getters['designer/getBorderStyle'];
});
const getBorderWidth = computed(() => {
  return store.getters['designer/getBorderWidth'];
});
const getBorderColor = computed(() => {
  return store.getters['designer/getBorderColor'];
});

watch(
  getBorderStyle,
  (newValue) => {
    borderStyle.value = newValue;
  },
  { immediate: true }
);
watch(
  getBorderWidth,
  (newValue) => {
    borderWidth.value = newValue;
  },
  { immediate: true }
);
watch(
  getBorderColor,
  (newValue) => {
    borderColor.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <EditorAccordion>
    <template #title>Border Style, Width & Color</template>
    <template #content>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Style </label>
        <select
          v-model="borderStyle"
          class="myPrimarySelect"
          @change="designer.handleBorderStyle(borderStyle)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderStyle in tailwindBorderStyleWidthPlusColor.borderStyle"
            :key="borderStyle"
          >
            {{ borderStyle }}
          </option>
        </select>
      </div>
      <div class="my-3 py-3">
        <label class="myPrimaryInputLabel"> Border Width </label>
        <select
          v-model="borderWidth"
          class="myPrimarySelect"
          @change="designer.handleBorderWidth(borderWidth)"
        >
          <option
            disabled
            value=""
          >
            Select
          </option>
          <option
            v-for="borderWidth in tailwindBorderStyleWidthPlusColor.borderWidth"
            :key="borderWidth"
          >
            {{ borderWidth }}
          </option>
        </select>
      </div>

      <label class="myPrimaryInputLabel"> Border Color </label>
      <Listbox
        as="div"
        v-model="borderColor"
      >
        <div class="relative mt-2">
          <ListboxButton class="myPrimarySelect">
            <span class="flex items-center">
              <div
                v-if="borderColor !== 'none'"
                class="aspect-square w-6 h-6"
                :class="`bg-${borderColor?.replace('border-', '')}`"
              ></div>
              <span
                class="block truncate"
                :class="[borderColor !== 'none' ? 'ml-3' : '']"
                >{{ borderColor }}</span
              >
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="color in tailwindBorderStyleWidthPlusColor.borderColor"
                @click="designer.handleBorderColor(borderColor)"
                :key="color"
                :value="color"
                v-slot="{ active, borderColor }"
              >
                <li
                  :class="[
                    active
                      ? 'bg-myPrimaryLinkColor text-white'
                      : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <div class="flex items-center">
                    <div
                      class="aspect-square w-6 h-6"
                      :class="`bg-${color.replace('border-', '')}`"
                    ></div>
                    <span class="ml-3">{{ color }}</span>
                  </div>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </template>
  </EditorAccordion>
</template>
