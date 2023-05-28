import tailwindColors from '../utils/tailwaind-colors';
import tailwindFontSizes from '../utils/tailwind-font-sizes';
import tailwindFontStyles from '../utils/tailwind-font-styles';
import { computed } from 'vue';

class Designer {
  constructor(store) {
    this.colors = tailwindColors.backgroundColors();
    this.store = store;
    this.getComponent = computed(
      () => this.store.getters['designer/getComponent']
    );
  }
  handleFontStyle(userSelectedFontStyle) {
    let fontStyle = tailwindFontStyles.fontStyle.find((style) => {
      return this.getComponent.value.classList.contains(style);
    });

    if (fontStyle === undefined) {
      fontStyle = 'none';
      this.store.commit('designer/setFontStyle', fontStyle);
    }
    if (fontStyle !== undefined) {
      this.store.commit('designer/setFontStyle', fontStyle);
    }

    if (
      userSelectedFontStyle !== undefined &&
      userSelectedFontStyle !== 'none'
    ) {
      if (
        fontStyle !== undefined &&
        this.getComponent.value.classList.contains(fontStyle)
      ) {
        this.getComponent.value.classList.remove(fontStyle);
      }

      this.getComponent.value.classList.add(userSelectedFontStyle);
      fontStyle = userSelectedFontStyle; // Update fontStyle
      this.store.commit('designer/setFontStyle', fontStyle); // Commit updated fontStyle
      this.store.commit('designer/setComponent', this.getComponent.value);
    }

    // Handle the case where the user selects 'none'
    if (userSelectedFontStyle === 'none' && fontStyle !== undefined) {
      this.getComponent.value.classList.remove(fontStyle);
      fontStyle = userSelectedFontStyle; // Update fontStyle
      this.store.commit('designer/setFontStyle', fontStyle); // Commit updated fontStyle
      this.store.commit('designer/setComponent', this.getComponent.value);
    }
  }
  handleFontFamily(userSelectedFontFamily) {
    let fontFamily = tailwindFontStyles.fontFamily.find((family) => {
      return this.getComponent.value.classList.contains(family);
    });

    if (fontFamily === undefined) {
      fontFamily = 'none';
      this.store.commit('designer/setFontFamily', fontFamily);
    }
    if (fontFamily !== undefined) {
      this.store.commit('designer/setFontFamily', fontFamily);
    }

    if (
      userSelectedFontFamily !== undefined &&
      userSelectedFontFamily !== 'none'
    ) {
      if (
        fontFamily !== undefined &&
        this.getComponent.value.classList.contains(fontFamily)
      ) {
        this.getComponent.value.classList.remove(fontFamily);
      }

      this.getComponent.value.classList.add(userSelectedFontFamily);
      fontFamily = userSelectedFontFamily; // Update fontFamily
      this.store.commit('designer/setFontFamily', fontFamily); // Commit updated fontFamily
      this.store.commit('designer/setComponent', this.getComponent.value);
    }

    // Handle the case where the user selects 'none'
    if (userSelectedFontFamily === 'none' && fontFamily !== undefined) {
      this.getComponent.value.classList.remove(fontFamily);
      fontFamily = userSelectedFontFamily; // Update fontFamily
      this.store.commit('designer/setFontFamily', fontFamily); // Commit updated fontFamily
      this.store.commit('designer/setComponent', this.getComponent.value);
    }
  }
  //
  //
  //
  //
  handleFontWeight(userSelectedFontWeight) {
    let fontWeight = tailwindFontStyles.fontWeight.find((weight) => {
      return this.getComponent.value.classList.contains(weight);
    });

    if (fontWeight === undefined) {
      fontWeight = 'none';
      this.store.commit('designer/setFontWeight', fontWeight);
    }
    if (fontWeight !== undefined) {
      this.store.commit('designer/setFontWeight', fontWeight);
    }

    if (
      userSelectedFontWeight !== undefined &&
      userSelectedFontWeight !== 'none'
    ) {
      if (
        fontWeight !== undefined &&
        this.getComponent.value.classList.contains(fontWeight)
      ) {
        this.getComponent.value.classList.remove(fontWeight);
      }

      this.getComponent.value.classList.add(userSelectedFontWeight);
      fontWeight = userSelectedFontWeight; // Update fontWeight
      this.store.commit('designer/setFontWeight', fontWeight); // Commit updated fontWeight
      this.store.commit('designer/setComponent', this.getComponent.value);
    }

    // Handle the case where the user selects 'none'
    if (userSelectedFontWeight === 'none' && fontWeight !== undefined) {
      this.getComponent.value.classList.remove(fontWeight);
      fontWeight = userSelectedFontWeight; // Update fontWeight
      this.store.commit('designer/setFontWeight', fontWeight); // Commit updated fontWeight
      this.store.commit('designer/setComponent', this.getComponent.value);
    }
  }

  //
  //
  //
  //
  //
  //
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
