<template>
  <div class="mt-8">
    <form @submit.prevent="searchUnsplash">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
        >Search</label
      >

      <div class="mysearchBarWithOptions">
        <div class="relative w-full">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="search_query"
            v-model="searchQuery"
            class="myPrimarySearchInput"
            autocomplete="off"
            placeholder="Search..."
          />
        </div>

        <button type="submit" class="myPrimaryButton">Search</button>
      </div>

      <div class="flex justify-start items-center gap-2 py-2 px-2 mt-1 mb-1">
        <button
          @click="searchByOrientation('landscape')"
          type="button"
          class="myPrimaryTag"
          :class="{
            'bg-myPrimaryBrandColor text-white': orientation === 'landscape',
            '': orientation !== 'landscape',
          }"
        >
          Landscape
        </button>
        <button
          @click="searchByOrientation('portrait')"
          type="button"
          class="myPrimaryTag"
          :class="{
            'bg-myPrimaryBrandColor text-white': orientation === 'portrait',
            '': orientation !== 'portrait',
          }"
        >
          Portrait
        </button>
        <button
          @click="searchByOrientation('squarish')"
          type="button"
          class="myPrimaryTag"
          :class="{
            'bg-myPrimaryBrandColor text-white': orientation === 'squarish',
            '': orientation !== 'squarish',
          }"
        >
          Squarish
        </button>

        <svg
          @click="searchByOrientation(null)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-4 h-4 cursor-pointer"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div v-if="error">
        <p class="primaryInputError">
          {{ error }}
        </p>
      </div>
    </form>
  </div>

  <div v-if="isPending">
    <div class="text-center mt-12">
      <div role="status">
        <svg
          class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600"
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
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>

  <div v-if="!isPending" class="mt-8 pb-16">
    <div v-if="!images">
      <p class="myPrimaryParagraph">Search any image.</p>
    </div>

    <div
      v-if="images"
      class="overflow-y-scroll md:min-h-[35rem] md:max-h-[35rem] min-h-[15rem] max-h-[15rem] pr-1 rounded"
    >
      <div
        v-if="images.length > 0"
        class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2"
      >
        <div
          v-for="image in images"
          :key="image.id"
          @click="handleImageClick(image.urls.regular)"
          class="border border-myPrimaryLightGrayColor rounded px-2 p-2 cursor-pointer bg-gray-50"
        >
          <img
            alt="image"
            class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 cursor-pointer"
            :src="image.urls.thumb"
          />
          <p class="myPrimaryParagraph text-xs py-1 italic">
            By: {{ image.user.name }}
          </p>
        </div>
      </div>

      <div v-if="images.length < 1 && !error">
        <p class="myPrimaryParagraph">
          We did not find any images. Make a new search.
        </p>
      </div>
    </div>

    <div v-if="images && searchQuery !== ''">
      <div v-if="images.length > 0">
        <nav
          class="flex items-center justify-around border-t border-gray-200 bg-white py-3 mt-4"
          aria-label="Pagination"
        >
          <div class="hidden sm:block">
            <p class="text-sm text-gray-700">
              <span class="font-medium">
                Total results
                {{ ' ' }}
              </span>

              <span class="font-semibold">
                {{ getUnsplashImagesData.total }}
              </span>

              <span class="font-medium">
                {{ ' ' }}
                — in pages
                {{ ' ' }}
              </span>

              <span class="font-semibold">
                {{ getUnsplashImagesData.total_pages }}.
              </span>
            </p>
          </div>
          <div
            class="flex flex-1 justify-between sm:justify-end items-center gap-1"
          >
            <button
              @click="previousPage(currentPage--)"
              :disabled="currentPage === 1"
              class="myPrimaryButton"
              :class="{ hidden: currentPage === 1 }"
            >
              Page
              {{
                currentPage > 0 ? `${currentPage - 1}` : `${currentPage - 1}`
              }}
            </button>
            <span class="myPrimaryTag rounded-full p-3">
              Page {{ currentPage }}
            </span>
            <button
              @click="nextPage(currentPage++)"
              :disabled="currentPage === getUnsplashImagesData.total_pages"
              class="myPrimaryButton"
              :class="{
                hidden: currentPage === getUnsplashImagesData.total_pages,
              }"
            >
              Page
              {{
                currentPage > 0 ? `${currentPage + 1}` : `${currentPage + 1}`
              }}
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

// store
const store = useStore();
const searchQuery = ref('');
const error = ref(null);
const isPending = ref(null);
const currentPage = ref(1);
const orientation = ref(null);

// getters
const getCurrentPageNumber = computed(() => {
  return store.getters['unsplash/getCurrentPageNumber'];
});
const getOrientationValue = computed(() => {
  return store.getters['unsplash/getOrientationValue'];
});
const getSearchTerm = computed(() => {
  return store.getters['unsplash/getSearchTerm'];
});
const images = computed(() => {
  return store.getters['unsplash/getUnsplashImages'];
});
// unspalsh images
const getUnsplashImages = computed(() => {
  return store.getters['unsplash/getUnsplashImages'];
});
// unsplash images data
const getUnsplashImagesData = computed(() => {
  return store.getters['unsplash/getUnsplashImagesData'];
});
// get current element from store
const getCurrentElement = computed(() => {
  return store.getters['designer/getCurrentElement'];
});
//
// get current image from store
const getCurrentImage = computed(() => {
  return store.getters['designer/getCurrentImage'];
});
//
const handleImageClick = function (file) {
  // in store - update preview image
  store.commit('designer/setCurrentPreview', file);
};
//
//
// search by orientation
const searchByOrientation = function (orientationParameter) {
  // check if search term length is more than 0
  if (
    getSearchTerm.value.length > 0 &&
    orientation.value !== orientationParameter
  ) {
    orientation.value = orientationParameter;
    currentPage.value = 1;
    searchUnsplash();
  }
};
//
// load images for previous page
const previousPage = function () {
  searchUnsplash();
};

// load images for next page
const nextPage = function () {
  searchUnsplash();
};
//
//
// search images
const searchUnsplash = async function () {
  // set value in store
  store.commit('unsplash/setSearchTerm', searchQuery.value);
  store.commit('unsplash/setCurrentPageNumber', currentPage.value);
  store.commit('unsplash/setOrientationValue', orientation.value);
  try {
    error.value = null;
    // is pending
    isPending.value = true;
    // await
    await store.dispatch('unsplash/loadUnsplashImages', {
      searchTerm: getSearchTerm.value,
      currentPage: currentPage.value,
      orientation: orientation.value,
    });
    // is pending
    isPending.value = false;
  } catch (err) {
    // is pending
    isPending.value = false;
    // error
    error.value = `${err} ${error.value ? error.value : ''}`;
  }
};

// on mounted
onMounted(() => {
  // load values from store when component is mounted
  if (getSearchTerm.value.length > 0 && searchQuery.value.length === 0) {
    searchQuery.value = getSearchTerm.value;
    currentPage.value = getCurrentPageNumber.value;
    orientation.value = getOrientationValue.value;
  }
});
</script>
