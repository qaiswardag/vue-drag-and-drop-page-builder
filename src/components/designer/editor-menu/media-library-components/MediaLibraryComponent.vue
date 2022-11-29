<template>
  <div>
    <div class="mt-8">
      <form @submit.prevent="searchMedia">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>

        <div class="relative">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white dark:bg-gray-700" autocomplete="off" placeholder="Search images...">
          <div class="absolute right-2.5 bottom-2.5 flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <button type="submit" class="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-100 font-medium rounded-lg text-sm px-4 py-2">
              Search
            </button>
          </div>
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
          <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div v-if="images?.media?.data && images?.media?.data.length > 0 && !isPending">
      <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
        <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <li v-for="file in images.media.data" :key="file.id" class="relative">
            <div class="rounded-lg bg-gray-100']">
              <div @click="handleImageClick(file)">
                <img :src="`/storage/images/site-${siteId}/${file.name}`" :alt="file.name" class="lg:h-48 xl:w-full h-48 w-full rounded-md object-cover">
              </div>
            </div>
            <div class="mt-1">
              <p class="pointer-events-none block text-xs text-gray-800 break-words">
                {{ (file.size / 1000).toFixed(2) }} KB
              </p>
            </div>
          </li>
        </ul>
      </section>

      <TailwindPagination :data="images.media" @pagination-change-page="getResultsForPage" />
    </div>

    <div v-if="images?.media?.data.length < 1 && images?.media?.total < 1 && !isPending">
      <div>
        <p class="primaryParagraph">
          Media library is empty. Upload your first image.
        </p>
      </div>
    </div>

  </div>
</template>


<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'

// store
const store = useStore()

// error
const error = ref(null)
const isPending = ref(null)

// images for gallary
const images = computed(() => {
  return store.getters['Designer/getMedia']
})
//
//
// site id
const siteId = computed(() => {
  return store.getters['user/getSiteId']
})

// search media method
const searchMedia = function () {
  console.log('media library search form submitted')
}
//image click method
const handleImageClick = function (file) {
  // in store - update preview image
  store.commit(
    'Designer/setCurrentPreview',
    '/storage/images/site-' + siteId.value + '/' + file.name
  )
}

//
// get result for "laravel pagination" package
const getResultsForPage = async (page = 1) => {
  loadImages(page)
}
//
// load images
const loadImages = async function (page) {
  try {
    // is pending
    isPending.value = true
    await store.dispatch('Designer/loadMediaLibrary', page)
    // is pending
    isPending.value = false
  } catch (err) {
    // is pending
    isPending.value = false
    // error
    error.value = err
  }
}

// load product iamges
onMounted(async () => {
  loadImages(1)
})
</script>
