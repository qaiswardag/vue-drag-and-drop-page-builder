import tailwindColors from '../utils/tailwaind-colors';
import tailwindFontSizes from '../utils/tailwind-font-sizes';
import tailwindFontStyles from '../utils/tailwind-font-styles';
import tailwindPaddingAndMargin from '../utils/tailwind-padding-margin';
import tailwindBorderRadius from '../utils/tailwind-border-radius';
import tailwindBorderStyleWidthPlusColor from '../utils/tailwind-border-style-width-color';
import { computed, ref } from 'vue';

class Designer {
  constructor(store) {
    // Create a new WeakSet to keep track of elements with event listeners
    this.elementsWithListeners = new WeakSet();

    this.colors = tailwindColors.backgroundColors();
    this.store = store;
    this.getTextAreaVueModel = computed(
      () => this.store.getters['designer/getTextAreaVueModel']
    );

    this.getCurrentClickedImage = computed(
      () => this.store.getters['designer/getCurrentClickedImage']
    );

    this.getComponent = computed(
      () => this.store.getters['designer/getComponent']
    );
    this.getComponents = computed(
      () => this.store.getters['designer/getComponents']
    );
    this.getNextSibling = computed(
      () => this.store.getters['designer/getNextSibling']
    );
    this.getParentElement = computed(
      () => this.store.getters['designer/getParentElement']
    );
    this.getRestoredElement = computed(
      () => this.store.getters['designer/getRestoredElement']
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

  handleDeleteElement() {
    const element = this.getComponent.value; // Get the element to be deleted

    this.store.commit('designer/setParentElement', element.parentNode); // Store the parent of the deleted element
    this.store.commit('designer/setRestoredElement', element.outerHTML); // Store the outerHTML of the deleted element
    this.store.commit('designer/setNextSibling', element.nextSibling); // Store the next sibling of the deleted element
    this.store.commit('designer/setComponent', null);

    element.remove(); // Remove the element from the DOM
  }
  handleRestoreElement() {
    // Get the stored deleted element and its parent
    if (this.getRestoredElement !== null && this.getParentElement !== null) {
      // Create a new element from the stored outerHTML
      const newElement = document.createElement('div');
      newElement.innerHTML = this.getRestoredElement.value;

      // Append the restored element to its parent
      // Insert the restored element before its next sibling in its parent
      this.getParentElement.value.insertBefore(
        newElement.firstChild,
        this.getNextSibling.value
      );
    }

    // Clear
    this.store.commit('designer/setRestoredElement', null);
    this.store.commit('designer/setParentElement', null);
    this.store.commit('designer/setComponent', null);
    this.attachElementEventListeners();
  }

  handleClearRestoreElement() {
    this.store.commit('designer/setRestoredElement', null);
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
      tailwindPaddingAndMargin.verticalPadding,
      'setFontVerticalPadding'
    );
  }
  handleHorizontalPadding(userSelectedHorizontalPadding) {
    this.#updateStyle(
      userSelectedHorizontalPadding,
      tailwindPaddingAndMargin.horizontalPadding,
      'setFontHorizontalPadding'
    );
  }

  handleVerticalMargin(userSelectedVerticalMargin) {
    this.#updateStyle(
      userSelectedVerticalMargin,
      tailwindPaddingAndMargin.verticalMargin,
      'setFontVerticalMargin'
    );
  }
  handleHorizontalMargin(userSelectedHorizontalMargin) {
    this.#updateStyle(
      userSelectedHorizontalMargin,
      tailwindPaddingAndMargin.horizontalMargin,
      'setFontHorizontalMargin'
    );
  }

  // border style & width / start
  handleBorderStyle(borderStyle) {
    this.#updateStyle(
      borderStyle,
      tailwindBorderStyleWidthPlusColor.borderStyle,
      'setBorderStyle'
    );
  }
  handleBorderWidth(borderWidth) {
    this.#updateStyle(
      borderWidth,
      tailwindBorderStyleWidthPlusColor.borderWidth,
      'setBorderWidth'
    );
  }
  handleBorderColor(borderColor) {
    this.#updateStyle(
      borderColor,
      tailwindBorderStyleWidthPlusColor.borderColor,
      'setBorderColor'
    );
  }
  // border style & width / end

  // border radius / start
  handleBorderRadiusGlobal(borderRadiusGlobal) {
    this.#updateStyle(
      borderRadiusGlobal,
      tailwindBorderRadius.roundedGlobal,
      'setBorderRadiusGlobal'
    );
  }
  handleBorderRadiusTopLeft(borderRadiusTopLeft) {
    this.#updateStyle(
      borderRadiusTopLeft,
      tailwindBorderRadius.roundedTopLeft,
      'setBorderRadiusTopLeft'
    );
  }
  handleBorderRadiusTopRight(borderRadiusTopRight) {
    this.#updateStyle(
      borderRadiusTopRight,
      tailwindBorderRadius.roundedTopRight,
      'setBorderRadiusTopRight'
    );
  }
  handleBorderRadiusBottomleft(borderRadiusBottomleft) {
    this.#updateStyle(
      borderRadiusBottomleft,
      tailwindBorderRadius.roundedBottomLeft,
      'setBorderRadiusBottomleft'
    );
  }
  handleBorderRadiusBottomRight(borderRadiusBottomRight) {
    this.#updateStyle(
      borderRadiusBottomRight,
      tailwindBorderRadius.roundedBottomRight,
      'setBorderRadiusBottomRight'
    );
  }
  // border radius / end

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

  saveAllComponentsInLocalstorage(components) {
    //
    // wait for components to be added to DOM
    setTimeout(() => {
      // save design
      localStorage.setItem('savedCurrentDesign', JSON.stringify(components));
    }, 100);
  }

  // DOM Event listener
  // for each on all added html componenets
  /**
   * The attachElementEventListeners function is responsible for dynamically adding event listeners
   * to elements within the [section *'] component in the Vue template.
   */
  attachElementEventListeners = () => {
    // Iterate over all direct child elements of the 'section' element
    document.querySelectorAll('section *').forEach((el) => {
      // If the WeakSet already contains this element, it means that event listeners
      // are already attached to this element. In this case, we should skip this element
      // to prevent multiple instances of the same listener being attached.
      if (!this.elementsWithListeners.has(el)) {
        // Add the element to the WeakSet to indicate that this element now has event listeners attached
        this.elementsWithListeners.add(el);

        this.attachElementListeners(el);
      }
    });
  };

  attachElementListeners = (el) => {
    el.addEventListener('mouseover', (e) => {
      e.stopPropagation();

      // If there is an element with the 'hovered' attribute, remove this attribute
      document.querySelector('[hovered]')?.removeAttribute('hovered');

      // Set the 'hovered' attribute on the currently hovered element
      el.setAttribute('hovered', '');
    });

    el.addEventListener('click', (e) => {
      if (this.getComponent.value !== null) {
        this.handleDesignerMethods();
      }

      e.stopPropagation();

      // Set menu right to true. This likely triggers the display of a contextual menu
      this.store.commit('designer/setMenuRight', true);

      // If there is an element with the 'selected' attribute, remove this attribute
      document.querySelector('[selected]')?.removeAttribute('selected');

      // Remove the 'hovered' attribute from the clicked element (if it exists)
      e.currentTarget.removeAttribute('hovered');

      // Set the 'selected' attribute on the clicked element
      e.currentTarget.setAttribute('selected', '');

      // Commit the selected component state to the Vuex store
      this.store.commit('designer/setComponent', e.currentTarget);
    });
  };

  deleteAllComponents() {
    this.store.commit('designer/setComponents', []);
    this.saveAllComponentsInLocalstorage([]);
  }

  getCurrentIndex(event) {
    // Declare container of components and current event
    const allComponents = document.querySelector('#pagebuilder').children;
    const currentComponent = event.target.closest('div[data-draggable="true"]');
    // Get index of chosen event
    const currentIndex = Array.from(allComponents).indexOf(currentComponent);
    return currentIndex;
  }

  deleteComponent(event) {
    const currentIndex = this.getCurrentIndex(event);
    // remove component from array
    this.getComponents.value.splice(currentIndex, 1);
    this.store.commit('designer/setComponents', this.getComponents.value);

    this.saveAllComponentsInLocalstorage(this.getComponents.value);
  }

  // move component
  // runs when html components are rearranged
  moveComponent(event, dir) {
    // Get index of component
    const currentIndex = this.getCurrentIndex(event);
    // Return if moving first element backwards or last element forwards
    if (
      (currentIndex === 0 && dir === -1) ||
      (currentIndex === this.getComponents.value.length - 1 && dir === 1)
    )
      return;
    // Store chosen component
    const currentComponent = this.getComponents.value[currentIndex];
    // Remove current object
    // Move it forwards if negative dir or forward if positive dir
    this.getComponents.value.splice(currentIndex, 1);
    this.getComponents.value.splice(
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
    this.saveAllComponentsInLocalstorage(this.getComponents.value);
    //
    // end of method "moveComponent"
  }

  handleTextAreaContent() {
    // text content
    if (typeof this.getComponent.value.innerHTML !== 'string') {
      return;
    }

    if (typeof this.getComponent.value.innerHTML === 'string') {
      const textContentElementClone =
        this.getComponent.value.innerHTML.replaceAll('<br>', '\r\n') || '';

      this.store.commit(
        'designer/setTextAreaVueModel',
        textContentElementClone
      );
    }
  }
  changeText() {
    if (this.getTextAreaVueModel.value !== null) {
      const textContentElementClone = this.getTextAreaVueModel.value.replaceAll(
        /\n/g,
        '<br>'
      );
      // text change
      this.getComponent.value.innerHTML = textContentElementClone;
      this.store.commit('designer/setComponent', this.getComponent.value);
    }
  }

  cloneComponent(componenet) {
    // Hide slider and right menu
    this.store.commit('designer/setMenuPreview', false);

    this.store.commit('designer/setMenuRight', false);

    // Deep clone component
    const clonedComponent = { ...componenet };

    const currentDate = new Date();
    const timestamp = currentDate.getTime();

    // set id of clone to timestamp giving it a unique id
    clonedComponent.id = timestamp;

    // return to the cloned element to be dropped
    return clonedComponent;
  }

  previewCurrentDesign() {
    const addedHtmlComponents = ref([]);
    // preview current design in external browser tab

    // iterate over each top-level section component
    document
      .querySelectorAll('section:not(section section)')
      .forEach((section) => {
        // push outer html into the array
        addedHtmlComponents.value.push(section.outerHTML);
      });

    // stringify added html components
    addedHtmlComponents.value = JSON.stringify(addedHtmlComponents.value);

    // commit
    this.store.commit(
      'designer/setCurrentLayoutPreview',
      addedHtmlComponents.value
    );

    // set added html components back to empty array
    addedHtmlComponents.value = [];
  }

  areComponentsStoredInLocalStorage() {
    if (localStorage.getItem('savedCurrentDesign')) {
      this.store.commit(
        'designer/setComponents',
        JSON.parse(localStorage.getItem('savedCurrentDesign'))
      );
    }
  }
  imageClick() {
    if (
      this.getCurrentClickedImage.value &&
      this.getCurrentClickedImage.value.file !== null
    ) {
      this.store.commit(
        'designer/setCurrentDisplayedImage',
        this.getCurrentClickedImage.value.file
      );
    }
  }

  handleDesignerMethods() {
    console.log('SWITCHED TO NEW COMPONENT / COMPONENT OUTHTML UPDATED');

    if (this.getComponent.value !== null) {
      // invoke methods

      // border style
      this.handleBorderStyle();
      // border width
      this.handleBorderWidth();
      // border color
      this.handleBorderColor();
      // border radius
      this.handleBorderRadiusGlobal();
      // border radius
      this.handleBorderRadiusTopLeft();
      // border radius
      this.handleBorderRadiusTopRight();
      // border radius
      this.handleBorderRadiusBottomleft();
      // border radius
      this.handleBorderRadiusBottomRight();
      // handle clear restore element
      this.handleClearRestoreElement();
      // handle font size
      this.handleFontSize();
      // handle font weight
      this.handleFontWeight();
      // handle font family
      this.handleFontFamily();
      // handle font style
      this.handleFontStyle();
      // handle vertical padding
      this.handleVerticalPadding();
      // handle horizontal padding
      this.handleHorizontalPadding();
      // handle vertical margin
      this.handleVerticalMargin();
      // handle horizontal margin
      this.handleHorizontalMargin();
      // handle custom color
      this.handleCustomColor();
      // handle color
      this.handleColor();
      // handle classes
      this.currentClasses();
      // handle text content
      this.handleTextAreaContent();
    }
  }
}

const designer = new Designer();

export default Designer;
