import tailwindColors from '../utils/tailwaind-colors';
import tailwindFontSizes from '../utils/tailwind-font-sizes';
import { computed } from 'vue';

class Designer {
  constructor(store) {
    this.colors = tailwindColors.backgroundColors();
    this.store = store;
    this.getComponent = computed(
      () => this.store.getters['designer/getComponent']
    );
  }
  handleFontSize(userSelectedFontSize) {
    let fontBase = tailwindFontSizes.fontBase.find((size) => {
      return this.getComponent.value.classList.contains(size);
    });
    if (fontBase === undefined) {
      fontBase = 'base:none';
    }

    let fontDesktop = tailwindFontSizes.fontDesktop.find((size) => {
      return this.getComponent.value.classList.contains(size);
    });
    if (fontDesktop === undefined) {
      fontDesktop = 'lg:none';
    }

    let fontTablet = tailwindFontSizes.fontTablet.find((size) => {
      return this.getComponent.value.classList.contains(size);
    });
    if (fontTablet === undefined) {
      fontTablet = 'md:none';
    }

    let fontMobile = tailwindFontSizes.fontMobile.find((size) => {
      return this.getComponent.value.classList.contains(size);
    });
    if (fontMobile === undefined) {
      fontMobile = 'sm:none';
    }
    //
    // set fonts
    this.store.commit('designer/setFontBase', fontBase);
    this.store.commit('designer/setFontDesktop', fontDesktop);
    this.store.commit('designer/setFontTablet', fontTablet);
    this.store.commit('designer/setFontMobile', fontMobile);
    //
    //
    //
    //
    //
    const getFontBase = computed(() => {
      return this.store.getters['designer/getFontBase'];
    });
    const getFontDesktop = computed(() => {
      return this.store.getters['designer/getFontDesktop'];
    });
    const getFontTablet = computed(() => {
      return this.store.getters['designer/getFontTablet'];
    });
    const getFontMobile = computed(() => {
      return this.store.getters['designer/getFontMobile'];
    });

    if (userSelectedFontSize !== undefined) {
      if (
        !userSelectedFontSize.includes('sm:') &&
        !userSelectedFontSize.includes('md:') &&
        !userSelectedFontSize.includes('lg:')
      ) {
        this.getComponent.value.classList.remove(getFontBase.value);
        if (!userSelectedFontSize.includes('base:none')) {
          this.getComponent.value.classList.add(userSelectedFontSize);
        }

        this.store.commit('designer/setFontBase', userSelectedFontSize);
      }
      if (userSelectedFontSize.includes('lg:')) {
        this.getComponent.value.classList.remove(getFontDesktop.value);
        if (!userSelectedFontSize.includes('lg:none')) {
          this.getComponent.value.classList.add(userSelectedFontSize);
        }

        this.store.commit('designer/setFontDesktop', userSelectedFontSize);
      }
      if (userSelectedFontSize.includes('md:')) {
        this.getComponent.value.classList.remove(getFontTablet.value);
        if (!userSelectedFontSize.includes('md:none')) {
          this.getComponent.value.classList.add(userSelectedFontSize);
        }

        this.store.commit('designer/setFontTablet', userSelectedFontSize);
      }
      if (userSelectedFontSize.includes('sm:')) {
        this.getComponent.value.classList.remove(getFontMobile.value);
        if (!userSelectedFontSize.includes('sm:none')) {
          this.getComponent.value.classList.add(userSelectedFontSize);
        }

        this.store.commit('designer/setFontMobile', userSelectedFontSize);
      }

      this.store.commit('designer/setComponent', this.getComponent.value);
    }
    //
    //
    //
    //
  }
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  handleColor(userColorFromPalette) {
    // Iterate over each color in the colors array
    for (let singleColor of this.colors) {
      // has color
      const hasColor = this.getComponent.value.classList.contains(singleColor);

      // check if user whan to remove color
      if (hasColor === true && userColorFromPalette === 'removeColor') {
        this.getComponent.value.classList.remove(singleColor);
        this.store.commit('designer/setBackgroundColor', null);
        return;
      }
      // Check if the current element has the CSS color class
      // and check of user color from palette is undefined
      if (
        hasColor === true &&
        userColorFromPalette === undefined &&
        userColorFromPalette !== 'removeColor'
      ) {
        // If color is undefined as user have not clicked on any color from color palette
        this.store.commit('designer/setBackgroundColor', singleColor);
        return;
      }
      //
      if (
        hasColor === false &&
        userColorFromPalette === undefined &&
        userColorFromPalette !== 'removeColor'
      ) {
        this.store.commit('designer/setBackgroundColor', null);
      }
      // Check if the current element has the CSS color class
      if (hasColor === true && userColorFromPalette !== 'removeColor') {
        // Remove class
        this.getComponent.value.classList.remove(singleColor);
      }
      // Check if the current element does not have the CSS color class
      if (
        hasColor === false &&
        userColorFromPalette !== undefined &&
        userColorFromPalette !== 'removeColor'
      ) {
        // Add class
        this.getComponent.value.classList.add(userColorFromPalette);

        // Update the current element in the store
        this.store.commit('designer/setBackgroundColor', userColorFromPalette);
        this.store.commit('designer/setComponent', this.getComponent.value);
      }
    }
  }
}

const designer = new Designer();

export default Designer;
