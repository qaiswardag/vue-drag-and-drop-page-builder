import { vueFetch } from 'use-lightweight-fetch';

// get images
const {
  handleData: handleGetComponents,
  fetchedData: fetchedComponents,
  isError: isErrorComponents,
  error: errorComponents,
  errors: errorsComponents,
  isLoading: isLoadingComponents,
  isSuccess: isSuccessComponents,
} = vueFetch();

export default {
  namespaced: true,

  // state
  state: {
    currentElementBackgroundColor: null,
    currentElement: null,
    currentImagePreview: null,
    currentClickedImage: null,
    currentPreview: null,
    componentsAdded: [],
    currentComponent: null,
    fetchedComponents: [],
  },

  // getters
  getters: {
    // current element
    getCurrentElementBackgroundColor(state) {
      return state.currentElementBackgroundColor;
    },
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
    getCurrentClickedImage(state) {
      return state.currentClickedImage;
    },
    getCurrentPreview(state) {
      return state.currentComponent;
    },
    //
    // current image
    getCurrentImagePreview(state) {
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
    getFetchedComponents(state) {
      return state.fetchedComponents;
    },
  },

  mutations: {
    // set current element
    setCurrentBackgroundColor(state, payload) {
      state.currentElementBackgroundColor = payload;
    },
    // set current element
    setCurrentElement(state, payload) {
      state.currentElement = {};
      state.currentElement = payload;
    },
    // set components added
    setComponentsAdded(state, payload) {
      state.componentsAdded = {};
      state.componentsAdded = payload;
    },
    // set current compoenent
    setCurrentComponent(state, payload) {
      state.currentComponent = payload;
    },
    setCurrentClickedImage(state, payload) {
      console.log('payload er:', payload);
      state.currentClickedImage = payload;
    },

    setCurrentImagePreview(state, payload) {
      // set clicked element (which is the image & select the image src) to equal payload
      // payload source is the new image src
      state.currentElement.src = payload;
      // set currebt image
      state.currentImagePreview = payload;
    },
    setCurrentPreview(state, payload) {
      localStorage.setItem('preview', payload);
    },
    setFetchedComponents(state, payload) {
      state.fetchedComponents = payload;
    },
  },

  // actions
  actions: {
    // load products
    loadComponents(context, payload) {
      handleGetComponents(
        '/components.json',
        {},
        {
          additionalCallTime: 300,
          abortTimeoutTime: 8000,
        }
      );

      // context & send to mutation
      context.commit('setFetchedComponents', {
        fetchedData: fetchedComponents,
        isError: isErrorComponents,
        error: errorComponents,
        errors: errorsComponents,
        isLoading: isLoadingComponents,
        isSuccess: isSuccessComponents,
      });
    },
  },
};
