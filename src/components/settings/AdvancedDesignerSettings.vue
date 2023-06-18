<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const getElement = computed(() => {
  return store.getters['designer/getElement'];
});
const getComponent = computed(() => {
  return store.getters['designer/getComponent'];
});
const getComponents = computed(() => {
  return store.getters['designer/getComponents'];
});

const current = ref('element');

const updateCurrent = function (tab) {
  current.value = tab;
};
</script>

<template>
  <div class="my-8">
    <div
      class="flex items-left flex-col myPrimaryGap border-myPrimaryMediumGrayColor"
    >
      <h4 class="myFourthHeader">Selected HTML</h4>
      <p class="myPrimaryParagraph text-xs">
        Overview of Selected Element, Component, and Components. This section
        provides real-time updates based on your HTML selection.
      </p>

      <!-- Types - start -->
      <div>
        <h4 class="myPrimaryParagraph text-sm pb-2">Types</h4>
        <div class="text-white overflow-hidden bg-gray-900 max-w-2xl">
          <div class="flex bg-gray-800/40 ring-1 ring-white/5">
            <div
              class="-mb-px flex text-xs font-medium text-myPrimaryMediumGrayColor"
            >
              <div class="px-4 py-4 text-white">Types</div>
            </div>
          </div>
          <div class="px-4 pb-8 pt-4 text-white text-xs">
            <p
              v-if="getElement === null || getElement === undefined"
              class="text-xs pb-2"
            >
              <span
                >Element type:
                {{ JSON.stringify(getElement) }}
              </span>
            </p>
            <p
              v-if="getElement !== null && getElement !== undefined"
              class="text-xs pb-2"
            >
              <span>Element type: </span>
              <span>
                {{ typeof getElement }}
              </span>
            </p>
            <p
              v-if="getComponent === null || getComponent === undefined"
              class="text-xs pb-2"
            >
              <span>Component type: </span>
              {{ JSON.stringify(getComponent) }}
            </p>
            <p
              v-if="getComponent !== null && getComponent !== undefined"
              class="text-xs pb-2"
            >
              <span>Component type: </span>
              <span>
                {{
                  Array.isArray(getComponent) === true
                    ? 'array'
                    : typeof getComponent
                }}
              </span>
            </p>
            <p class="text-xs pb-2">
              <span>Components: </span>
              <span>
                {{
                  Array.isArray(getComponents) === true
                    ? 'array'
                    : typeof getComponents
                }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <!-- Types - end -->
      <!-- Code Block Component - start-->
      <div>
        <h4 class="myPrimaryParagraph text-sm pb-2">Content</h4>
        <div class="overflow-hidden bg-gray-900 max-w-2xl">
          <div class="flex bg-gray-800/40 ring-1 ring-white/5">
            <div
              class="-mb-px flex text-xs font-medium text-myPrimaryMediumGrayColor"
            >
              <div
                @click="updateCurrent('element')"
                class="px-4 py-4 cursor-pointer"
                :class="[current === 'element' ? 'text-white' : '']"
              >
                Element
              </div>
              <div
                @click="updateCurrent('component')"
                class="px-4 py-4 cursor-pointer"
                :class="[current === 'component' ? 'text-white' : '']"
              >
                Component
              </div>
              <div
                @click="updateCurrent('components')"
                class="px-4 py-4 cursor-pointer"
                :class="[current === 'components' ? 'text-white' : '']"
              >
                Components
                {{ Array.isArray(getComponents) && getComponents.length }}
              </div>
            </div>
          </div>
          <div class="px-4 pb-8 pt-4 text-white text-xs break-all">
            <div v-if="current === 'element'">
              <div v-if="getElement !== null || getElement !== undefined">
                <p class="whitespace-pre-line leading-5">
                  {{ getElement?.outerHTML }}
                </p>
              </div>
            </div>
            <div v-if="current === 'component'">
              <div v-if="getComponent !== null && getComponent !== undefined">
                <p class="pb-2">
                  Component ID:
                  {{ getComponent.id }}
                </p>
                <p class="pb-2">
                  Component name:
                  {{ getComponent.name }}
                </p>
                <p class="whitespace-pre-line leading-5 mt-4">
                  Component HTML:<br />
                  {{ getComponent?.html }}
                </p>
              </div>
            </div>
            <div v-if="current === 'components'">
              <div v-if="getComponents !== null && getComponents !== undefined">
                <div
                  class="border-b border-white mb-4 pb-4 last:border-none"
                  v-for="component in getComponents"
                  :key="component.id"
                >
                  <p class="pb-2">
                    Component ID:
                    {{ component.id }}
                  </p>
                  <p class="pb-2">Component name: {{ component.name }}</p>
                  <p class="whitespace-pre-line leading-5 mt-4">
                    Component HTML:<br />
                    {{ component.html }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Code Block Component - end-->
    </div>
  </div>
</template>
