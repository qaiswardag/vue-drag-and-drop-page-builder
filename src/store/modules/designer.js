import { useAjax } from '../../composables/use-ajax';

export default {
  namespaced: true,

  // state
  state: {
    currentElement: null,
    currentImage: null,
    currentPreview: null,
    componentsAdded: [],
    currentComponent: null,
    media: [],
  },

  // getters
  getters: {
    // current element
    getCurrentElement(state) {
      return state.currentElement;
    },
    // current element
    getComponentsAdded(state) {
      return state.componentsAdded;
    },
    // current components added
    getCurrentComponent(state) {
      return state.currentComponent;
    },
    //
    // current image
    getCurrentImage(state) {
      // create a new HTML div
      let currentImage = document.createElement('div');
      // set the new HTML div equal to state and current element
      currentImage.innerHTML = state.currentElement?.outerHTML;

      // check now if the new HTML contains any images
      if (currentImage.getElementsByTagName('img').length === 0) {
        // return null since there is zero image
        return null;
      }
      // return true if current element contains exactly one image
      if (currentImage.getElementsByTagName('img').length === 1) {
        currentImage = currentImage.getElementsByTagName('img')[0].src;
        // return clicked image
        return currentImage;
      }
      if (currentImage.getElementsByTagName('img').length > 1) {
        // return null since there is more than one image
        return null;
      }
    },
    //
    // current preview
    getCurrentPreview(state) {
      return state.currentPreview;
    },
    // get media
    getMedia(state) {
      return state.media;
    },
  },

  mutations: {
    // set current element
    setCurrentElement(state, payload) {
      state.currentElement = {};
      state.currentElement = payload;
    },
    // set current element
    setComponentsAdded(state, payload) {
      state.componentsAdded = {};
      state.componentsAdded = payload;
    },
    // set current element
    setCurrentComponent(state, payload) {
      state.currentComponent = payload;
    },
    // set new image
    setNewImage(state, payload) {
      // set clicked element (which is the image & select the image src) to equal payload
      // payload source is the new image src
      state.currentElement.src = payload;
      // set currebt image
      state.currentImage = payload;
    },

    // set current preview
    setCurrentPreview(state, payload) {
      localStorage.setItem('preview', payload);
      state.currentPreview = payload;
    },
    // set media
    setMedia(state, payload) {
      state.media = payload;
    },
  },

  // actions
  actions: {
    // load media library images
    async loadMediaLibrary(context, page) {
      // use ajax
      const { loadData } = useAjax();
      // try
      try {
        const data = await loadData(
          `/api/media-library?page=${page}`,
          {},
          { additionalCallTime: 0 }
        );
        // context & send to mutation
        context.commit('setMedia', data);

        // catch errors
      } catch (err) {
        throw err;
      }
    },
  },
};
