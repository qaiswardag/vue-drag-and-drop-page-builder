import tailwindColors from '../utils/tailwaind-colors';
import tailwindFontSizes from '../utils/tailwind-font-sizes';
import tailwindFontStyles from '../utils/tailwind-font-styles';
import tailwindSpacing from '../utils/tailwind-spacing';
import { computed } from 'vue';

class Designer {
  constructor(store) {
    this.colors = tailwindColors.backgroundColors();
    this.store = store;
    this.getComponent = computed(
      () => this.store.getters['designer/getComponent']
    );
  }
  #updateStyle(userSelectedStyle, styleArray, mutationName) {
    let currentStyle = styleArray.find((style) => {
      return this.getComponent.value.classList.contains(style);
    });

    currentStyle = currentStyle || 'none'; // set to 'none' if undefined

    this.store.commit(`designer/${mutationName}`, currentStyle);

    if (userSelectedStyle && userSelectedStyle !== 'none') {
      if (
        currentStyle &&
        this.getComponent.value.classList.contains(currentStyle)
      ) {
        this.getComponent.value.classList.remove(currentStyle);
      }

      this.getComponent.value.classList.add(userSelectedStyle);
      currentStyle = userSelectedStyle;
    } else if (userSelectedStyle === 'none' && currentStyle) {
      this.getComponent.value.classList.remove(currentStyle);
      currentStyle = userSelectedStyle;
    }

    this.store.commit(`designer/${mutationName}`, currentStyle);
    this.store.commit('designer/setComponent', this.getComponent.value);
  }
  currentClasses() {
    // convert classList to array
    let classListArray = Array.from(this.getComponent.value.classList);

    // commit array to store
    this.store.commit('designer/setCurrentClasses', classListArray);
  }

  handleAddClasses(userSelectedClass) {
    if (
      typeof userSelectedClass === 'string' &&
      userSelectedClass !== '' &&
      !userSelectedClass.includes(' ') &&
      !this.getComponent.value.classList.contains(userSelectedClass) // Check if class already exists
    ) {
      this.getComponent.value.classList.add(userSelectedClass);
      this.store.commit('designer/setComponent', this.getComponent.value);
      this.store.commit('designer/setClass', userSelectedClass);
    }
  }
  handleRemoveClasses(userSelectedClass) {
    // remove selected class from element
    if (this.getComponent.value.classList.contains(userSelectedClass)) {
      this.getComponent.value.classList.remove(userSelectedClass);
      this.store.commit('designer/setComponent', this.getComponent.value);
      this.store.commit('designer/removeClass', userSelectedClass);
    }
  }

  handleFontWeight(userSelectedFontWeight) {
    this.#updateStyle(
      userSelectedFontWeight,
      tailwindFontStyles.fontWeight,
      'setFontWeight'
    );
  }
  handleFontFamily(userSelectedFontFamily) {
    this.#updateStyle(
      userSelectedFontFamily,
      tailwindFontStyles.fontFamily,
      'setFontFamily'
    );
  }
  handleFontStyle(userSelectedFontStyle) {
    this.#updateStyle(
      userSelectedFontStyle,
      tailwindFontStyles.fontStyle,
      'setFontStyle'
    );
  }
  handleVerticalPadding(userSelectedVerticalPadding) {
    this.#updateStyle(
      userSelectedVerticalPadding,
      tailwindSpacing.verticalPadding,
      'setFontVerticalPadding'
    );
  }
  handleHorizontalPadding(userSelectedHorizontalPadding) {
    this.#updateStyle(
      userSelectedHorizontalPadding,
      tailwindSpacing.horizontalPadding,
      'setFontHorizontalPadding'
    );
  }

  handleVerticalMargin(userSelectedVerticalMargin) {
    this.#updateStyle(
      userSelectedVerticalMargin,
      tailwindSpacing.verticalMargin,
      'setFontVerticalMargin'
    );
  }
  handleHorizontalMargin(userSelectedHorizontalMargin) {
    this.#updateStyle(
      userSelectedHorizontalMargin,
      tailwindSpacing.horizontalMargin,
      'setFontHorizontalMargin'
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

    // set fonts
    this.store.commit('designer/setFontBase', fontBase);
    this.store.commit('designer/setFontDesktop', fontDesktop);
    this.store.commit('designer/setFontTablet', fontTablet);
    this.store.commit('designer/setFontMobile', fontMobile);

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
  }

  handleCustomColor(userSelectedColor, enabledCustomColor) {
    // if user is selecting a custom HEX color
    if (userSelectedColor === undefined && enabledCustomColor === undefined) {
      // Get the style property
      let bgColor = this.getComponent.value.style.backgroundColor;

      // Check for inline background color
      if (typeof bgColor === 'string' && bgColor.length !== 0) {
        this.store.commit('designer/setEnabledCustomColorBG', true);
        this.store.commit('designer/setBackgroundColorCustom', bgColor);
      }

      // Check for inline background color
      if (typeof bgColor === 'string' && bgColor.length === 0) {
        this.store.commit('designer/setEnabledCustomColorBG', false);
        this.store.commit('designer/setBackgroundColorCustom', null);
      }
    }
    //
    //
    //
    //
    // if user is selecting a custom HEX color
    if (enabledCustomColor === true) {
      // this.getComponent.value.classList.add(`bg-[${userSelectedColor}]`);

      this.getComponent.value.style.backgroundColor = userSelectedColor;
      // this.store.commit('designer/setBackgroundColor', userSelectedColor);
      this.store.commit('designer/setComponent', this.getComponent.value);
      return;
    }
  }
  removeCustomColor() {
    this.getComponent.value.style.removeProperty('background-color');
    this.store.commit('designer/setEnabledCustomColorBG', null);
    this.store.commit('designer/setBackgroundColorCustom', null);
    this.store.commit('designer/setComponent', this.getComponent.value);
  }
  handleColor(userSelectedColor) {
    this.#updateStyle(userSelectedColor, this.colors, 'setBackgroundColor');
  }

  saveAllComponentsInLocalstorage(allComponentsAddedToDom) {
    //
    // wait for components to be added to DOM
    setTimeout(() => {
      // save design
      localStorage.setItem(
        'savedCurrentDesign',
        JSON.stringify(allComponentsAddedToDom)
      );
    }, 100);
  }
}

const designer = new Designer();

export default Designer;
