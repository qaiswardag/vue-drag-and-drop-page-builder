import { useAjax } from '../../composables/use-ajax';

export default {
  namespaced: true,

  // state
  state: {
    unsplashImages: null,
    unsplashImagesData: null,
    searchTerm: '',
    currentPageNumber: 1,
    orientationValue: null,

    // end state
  },

  // getters
  getters: {
    getUnsplashImages(state) {
      return state.unsplashImages;
    },

    getUnsplashImagesData(state) {
      return state.unsplashImagesData;
    },
    getSearchTerm(state) {
      return state.searchTerm;
    },
    getCurrentPageNumber(state) {
      return state.currentPageNumber;
    },
    getOrientationValue(state) {
      return state.orientationValue;
    },
    // end getters
  },

  // mutations
  mutations: {
    setUnsplashImages(state, payload) {
      state.unsplashImages = payload;
    },

    setUnsplashImagesData(state, payload) {
      state.unsplashImagesData = payload;
    },
    setSearchTerm(state, payload) {
      state.searchTerm = payload;
    },
    setCurrentPageNumber(state, payload) {
      state.currentPageNumber = payload;
    },
    setOrientationValue(state, payload) {
      state.orientationValue = payload;
    },
    // end mutations
  },

  // actions
  actions: {
    // load products
    async loadUnsplashImages(context, payload) {
      // use ajax
      const { loadData } = useAjax();
      // try
      try {
        // check of search term is empty
        if (payload.searchTerm === '') {
          context.commit('setUnsplashImages', []);
          throw new Error('Input field can not be empty');
        }

        // current orientation is null
        let orientationType = null;

        // check of search term is empty
        if (payload.orientation === null) {
          orientationType = '';
        }
        if (payload.orientation !== null) {
          orientationType = `&orientation=${payload.orientation}`;
        }

        const data = await loadData(
          `https://api.unsplash.com/search/photos?page=${payload.currentPage}&per_page=24&query=${payload.searchTerm}${orientationType}`,

          {
            //TODO: the api key should not be available in frontend.
            headers: {
              'Accept-Version': 'v1',
              Authorization:
                'Client-ID 5m9Y7Ewvxu686LvPcfccdUKxIEJNWhhcnI2IkO95-ao',
            },
          },
          { additionalCallTime: 0 }
        );

        // context & commit
        context.commit('setUnsplashImagesData', data);
        context.commit('setUnsplashImages', data.results);

        // catch errors
      } catch (err) {
        console.log('err:', err);
        throw err;
      }
    },
    // end action
  },
};
