<template xmlns="http://www.w3.org/1999/html">
  <div class="w-full inset-x-0 h-screen lg:pt-0 pt-0-z-10 overflow-x-scroll">
    <div class="relative h-full flex">
      <aside
        aria-label="sidebar"
        :class="{
          'w-0': !MenuRight,
          'w-60': !MenuRight,
          'rounded-r-[0rem]': MenuPreview,
        }"
        class="h-full duration-300 flex-shrink-0 shadow-2xl rounded-r-2xl overflow-hidden mr-4"
        @mouseleave="MenuPreview = false"
      >
        <div class="sticky h-full w-60 overflow-hidden">
          <nav aria-label="Sidebar" class="h-full bg-white">
            <ul
              class="flex flex-col gap-4 p-4 font-semibold h-full overflow-y-scroll"
            >
              <li class="font-semibold text-xs">Components</li>
              <li
                v-for="category in categories"
                :key="category"
                :class="{
                  'bg-gray-100 text-gray-900':
                    activeLibrary === category && MenuPreview === true,
                }"
                class="text-xs text-gray-900 p-2 capitalize cursor-pointer font-medium rounded-md"
                @mouseover="
                  activeLibrary = category;
                  MenuPreview = true;
                "
              >
                {{ category }}
              </li>
            </ul>
          </nav>
        </div>

        <!--preview - start-->
        <aside
          aria-label="saidebar"
          :class="[!MenuPreview ? '-left-[30rem]' : 'left-60']"
          class="absolute z-10 w-[30rem] h-full duration-200 top-0 rounded-r-2xl shadow-2xl bg-gray-50"
        >
          <div class="flex flex-col gap-4 p-4 h-full font-semibold">
            <p class="font-semibold text-xs capitalize">{{ activeLibrary }}</p>
            <draggable
              :clone="cloneComponent"
              :group="{ name: 'components', pull: 'clone', put: false }"
              :list="componentsMenu"
              :sort="false"
              class="flex flex-col gap-4 pr-4 overflow-y-auto"
              item-key="id"
            >
              <template #item="{ element }">
                <div v-if="element">
                  <img
                    :alt="element.name"
                    :src="element.imageSrc"
                    class="border-2 border-myPrimaryLightGrayColor hover:border-myPrimaryBrandColor rounded-md cursor-grab duration-200"
                  />
                </div>
              </template>
            </draggable>
          </div>
        </aside>
      </aside>
      <!--preview - end-->

      <main
        class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl"
      >
        <div
          class="flex items-center justify-between primary-gap rounded-t-2xl bg-gray-200 py-2 px-4"
        >
          <div>
            <div class="flex gap-2">
              <span class="w-2 h-2 rounded-full bg-red-400"></span>
              <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span class="w-2 h-2 rounded-full bg-green-400"></span>
            </div>
          </div>
          <div class="flex myPrimaryGap">
            <OptionsDropdown
              @previewCurrentDesign="previewCurrentDesign"
            ></OptionsDropdown>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <p class="text-xs cursor-pointer">unsaved changes</p>
            </div>
            <SaveDesign @click="saveCurrentDesignInDB"> </SaveDesign>
          </div>
        </div>

        <Draggable
          id="pagebuilder"
          :list="allComponentsAddedToDom"
          animation="200"
          class="bg-white grow overflow-y-auto"
          drag-class="opacity-0"
          group="components"
          handle=".cursor-grab"
          item-key="id"
          :onDrop="onDrop"
          @change="addEditorListener"
        >
          <template #item="{ element }">
            <div class="relative overflow-hidden group" id="min-designer">
              <div
                class="absolute z-10 overflow-hidden w-full top-0 bg-emerald-500 text-white duration-100 transform -translate-y-full group-hover:translate-y-0"
              >
                <div
                  class="flex flex-row justify-between mx-auto p-3 max-w-6xl"
                >
                  <div>
                    <PencilIcon
                      class="inline-block h-6 w-6 mx-2 cursor-pointer"
                    />
                    <TrashIcon
                      class="inline-block h-6 w-6 mx-2 cursor-pointer"
                      @click="removeComponent($event)"
                    />
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="inline-block h-6 w-6 mx-2 cursor-grab"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                      />
                    </svg>
                    <ArrowDownIcon
                      class="inline-block h-6 w-6 cursor-pointer"
                      @click="moveComponent($event, 1)"
                    />
                    <ArrowUpIcon
                      class="inline-block h-6 w-6 cursor-pointer"
                      @click="moveComponent($event, -1)"
                    />
                  </div>
                </div>
              </div>
              <section v-html="element.html"></section>
            </div>
          </template>
        </Draggable>

        <div class="h-8 bg-gray-200 flex-shrink-0 rounded-b-2xl"></div>
      </main>

      <aside
        aria-label="Menu"
        :class="{ 'w-0': !MenuRight, 'w-80 ml-4': MenuRight }"
        class="h-full duration-300 z-20 flex-shrink-0 overflow-hidden shadow-2xl rounded-l-2xl bg-white"
      >
        <RightSidebarEditor @closeEditor="MenuRight = null">
        </RightSidebarEditor>
      </aside>
    </div>
    <Spinner
      v-if="
        getFetchedComponents &&
        getFetchedComponents.isLoading === true &&
        getFetchedComponents.isError === false
      "
    >
    </Spinner>
    <DynamicModal
      :show="openModal"
      :type="typeModal"
      :gridColumnAmount="gridColumnModal"
      :title="titleModal"
      :description="descriptionModal"
      :firstButtonText="firstButtonModal"
      :secondButtonText="secondButtonModal"
      :thirdButtonText="thirdButtonModal"
      @firstModalButtonFunction="firstModalButtonFunction"
      @secondModalButtonFunction="secondModalButtonFunction"
      @thirdModalButtonFunction="thirdModalButtonFunction"
    >
      <header></header>
      <main></main>
    </DynamicModal>
  </div>
</template>

<script setup>
import Draggable from 'vuedraggable';
import { onBeforeMount, ref, onUpdated } from 'vue';
import { computed } from 'vue';
import { watch } from 'vue';
import { saveAllComponentsInLocalstorage } from '../../composables/save-all-components-in-localstorage';
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  ArrowDownIcon,
  MenuIcon,
  TrashIcon,
} from '@heroicons/vue/outline';

import { onMounted } from 'vue';
import { useStore } from 'vuex';

import { useAjax } from '../../composables/use-ajax';
import { usePromise } from '../../composables/use-promise';

import OptionsDropdown from '../../components/dropdowns-and-toggles/OptionsDropdown.vue';
import RightSidebarEditor from '../../components/designer/editor-menu/RightSidebarEditor.vue';
import Spinner from '../../components/loaders/Spinner.vue';
import SaveDesign from '../../components/dropdowns-and-toggles/SaveDesign.vue';
import DynamicModal from '../../components/modal/DynamicModal.vue';
//
// store
const store = useStore();
//
//
const openModal = ref(false);
//
// use dynamic model
const typeModal = ref('');
const gridColumnModal = ref(Number(1));
const titleModal = ref('');
const descriptionModal = ref('');
const firstButtonModal = ref('');
const secondButtonModal = ref(null);
const thirdButtonModal = ref(null);
// set dynamic modal handle functions
const firstModalButtonFunction = ref(null);
const secondModalButtonFunction = ref(null);
const thirdModalButtonFunction = ref(null);
//
//
//
//
//
// menu right
const MenuRight = ref(null);
// menu preview
const MenuPreview = ref(null);
// categories
const categories = ref(null);
// categories value
categories.value = [
  'forms',
  'teams',
  'posts',
  'features',
  'headers',
  'testimonials',
];
// current active library
const activeLibrary = ref('forms');
// current clicked element
const currentElement = ref({});
//
// get current element from store
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
});
//
//
// get components added
const allComponentsAddedToDom = computed(() => {
  return store.getters['designer/getComponentsAdded'];
});
//
// set state for "components added"
store.commit('designer/setComponentsAdded', allComponentsAddedToDom.value);
//
//
// save current design in local storage
const saveCurrentDesignInDB = function () {
  console.log('save current design in DB method');
};
//

// for each on all added html componenets
const addEditorListener = function () {
  document.querySelectorAll('[render-html] *').forEach((el) => {
    // single element
    el.addEventListener('mouseover', (e) => {
      // stop propagation
      e.stopPropagation();

      document.querySelector('[hovered]')?.removeAttribute('hovered');
      el.setAttribute('hovered', '');
    });

    // add event listener on clicked element
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      // set menu right to true
      MenuRight.value = true;
      //
      document.querySelector('[selected]')?.removeAttribute('selected');
      e.currentTarget.removeAttribute('hovered');
      e.currentTarget.setAttribute('selected', '');

      // current clicked element
      currentElement.value = e.currentTarget;
      // update state setCurrentElement
      store.commit('designer/setCurrentElement', currentElement.value);
    });
  });
};

// clone component
const cloneComponent = function (comp) {
  // Hide slider and right menu
  MenuPreview.value = false;
  MenuRight.value = false;

  // Deep clone component
  const clonedComp = { ...comp };

  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  // set id of clone to timestamp giving it a unique id
  clonedComp.id = timestamp;

  // return to the cloned element to be dropped
  return clonedComp;
};

// move component
// runs when html componenets are rearranged
const moveComponent = function (e, dir) {
  // Get index of component
  const currentIndex = getCurrentIndex(e.currentTarget);
  // Return if moving first element backwards or last element forwards
  if (
    (currentIndex === 0 && dir === -1) ||
    (currentIndex === allComponentsAddedToDom.value.length - 1 && dir === 1)
  )
    return;
  // Store chosen component
  const currentComponent = allComponentsAddedToDom.value[currentIndex];
  // Remove current object
  // Move it forwards if negative dir or forward if positive dir
  allComponentsAddedToDom.value.splice(currentIndex, 1);
  allComponentsAddedToDom.value.splice(
    currentIndex + 1 * dir,
    0,
    currentComponent
  );
  // Follow element to new location
  document
    .querySelector('#pagebuilder')
    .children[currentIndex + 1 * dir].scrollIntoView({ behavior: 'smooth' });
  //
  // save all current added HTML components in local storage
  saveAllComponentsInLocalstorage(allComponentsAddedToDom.value);
  //
  // end of method "moveComponent"
};
//
// remove component
// delete singular component on trach icon click
const removeComponent = function (e) {
  const currentIndex = getCurrentIndex(e.currentTarget);

  // set modal standards
  openModal.value = true;
  typeModal.value = 'delete';
  gridColumnModal.value = 2;
  titleModal.value = 'Delete component';
  descriptionModal.value = 'Are you sure you want to delete this component?';
  firstButtonModal.value = 'Close';
  secondButtonModal.value = null;
  thirdButtonModal.value = 'Delete';

  // handle click
  firstModalButtonFunction.value = function () {
    // set open modal
    openModal.value = false;
  };
  //
  // handle click
  thirdModalButtonFunction.value = function () {
    // remove component from array
    allComponentsAddedToDom.value.splice(currentIndex, 1);

    // hide right menu if last component was removed
    if (allComponentsAddedToDom.value.length === 0) MenuRight.value = false;

    // set open modal
    openModal.value = false;
  };
  // end modal
};
//
// watch "menu preview"
watch(MenuPreview, () => {
  // hide  right menu
  MenuRight.value = false;
});
//
const removeSelected = function () {
  document.querySelector('[selected]');
  document.querySelector('[selected]')?.removeAttribute('selected');
};
const removeHovered = function () {
  document.querySelector('[hovered]')?.removeAttribute('hovered');
};
const getCurrentIndex = function (component) {
  // Declare container of components and current component
  const allComponents = document.querySelector('#pagebuilder').children;
  const currentComponent = component.closest('div[data-draggable="true"]');
  // Get index of chosen component
  const currentIndex = Array.from(allComponents).indexOf(currentComponent);
  return currentIndex;
};
//
//
//
//
//
//
//
//
// locally added html components array
const addedHtmlComponents = ref([]);
//
// preview current design in external browser tab
const previewCurrentDesign = function () {
  // iterate over each component
  document.querySelectorAll('[render-html]').forEach((html) => {
    // push outer html into the array
    addedHtmlComponents.value.push(html.outerHTML);
  });
  // stringify added html components
  addedHtmlComponents.value = JSON.stringify(addedHtmlComponents.value);

  // commit
  store.commit('designer/setCurrentPreview', addedHtmlComponents.value);
  // set added html components back to empty array

  addedHtmlComponents.value = [];
};
//
//
//
//
// when HTML component is dropped into the DOM
const onDrop = function () {
  // save all current added HTML components in local storage
  saveAllComponentsInLocalstorage(allComponentsAddedToDom.value);
};
//
// get current element outer HTML
const getCurrentElementOuterHTML = computed(() => {
  return getCurrentElement?.value?.outerHTML;
});
//
//TODO: watch any change. Even text change
// watch for any changes in "curent element"
watch(getCurrentElementOuterHTML, (newElement) => {
  //console.log('getCurrentElementOuterHTML er:', newGetCurrentElementOuterHTML)
  // run "add editor listener - so when saved design is loaded from localstorage it's get rerendered"
  //
  //
  //
  //
  //
});
//
// set all components add on before mount
// On before mount
onBeforeMount(async () => {
  if (localStorage.getItem('savedCurrentDesign')) {
    store.commit(
      'designer/setComponentsAdded',
      JSON.parse(localStorage.getItem('savedCurrentDesign'))
    );
  }
});

// get fetched components
const getFetchedComponents = computed(() => {
  return store.getters['designer/getFetchedComponents'];
});
// menu for fetched components filtered after category
const componentsMenu = computed(() => {
  return getFetchedComponents.value?.fetchedData?.filter((comp) => {
    return comp.category === activeLibrary.value;
  });
});
//
// on mounted
onMounted(async () => {
  // run "add editor listener - so when saved design is loaded from localstorage it's get rerendered"
  addEditorListener();

  // load all HTML components
  store.dispatch('designer/loadComponents');
  // end get componenets
});
</script>

<style>
#pagebuilder [hovered],
#pagebuilder [selected] {
  outline: #10b981 dashed 3px;
  outline-offset: -2px;
}

.sortable-ghost {
  display: flex;
  justify-content: center;
}

.sortable-ghost > * {
  width: 100%;
}
</style>
