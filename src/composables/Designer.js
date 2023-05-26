import config from '../utils/tailwaind-colors';
import { computed } from 'vue';

class Designer {
  constructor(store) {
    this.colors = config.backgroundColors();
    this.store = store;
    this.getCurrentElement = computed(
      () => this.store.getters['designer/getCurrentElement']
    );
  }
  handleColor(userColorFromPalette) {
    // Iterate over each color in the colors array
    for (let singleColor of this.colors) {
      //
      //
      //
      // check if user whan to remove color
      if (
        this.getCurrentElement.value.classList.contains(singleColor) === true &&
        userColorFromPalette === 'removeColor'
      ) {
        console.log('1');
        this.getCurrentElement.value.classList.remove(singleColor);
        this.store.commit('designer/setCurrentBackgroundColor', null);

        //
        //
        //
        return;

        //
        //
        //
      }
      // Check if the current element has the CSS color class
      // and check of user color from palette is undefined
      if (
        this.getCurrentElement.value.classList.contains(singleColor) === true &&
        userColorFromPalette === undefined &&
        userColorFromPalette !== 'removeColor'
      ) {
        console.log('2');
        // If color is undefined as user have not clicked on any color from color palette
        this.store.commit('designer/setCurrentBackgroundColor', singleColor);
        return;

        //
        //
        //
      }
      //
      if (
        this.getCurrentElement.value.classList.contains(singleColor) ===
          false &&
        userColorFromPalette === undefined &&
        userColorFromPalette !== 'removeColor'
      ) {
        console.log('3');
        this.store.commit('designer/setCurrentBackgroundColor', null);
      }
      //
      //
      //
      //
      // Check if the current element has the CSS color class
      if (
        this.getCurrentElement.value.classList.contains(singleColor) === true &&
        userColorFromPalette !== 'removeColor'
      ) {
        console.log('4');
        // Remove class
        this.getCurrentElement.value.classList.remove(singleColor);
      }

      // Check if the current element does not have the CSS color class
      if (
        this.getCurrentElement.value.classList.contains(singleColor) ===
          false &&
        userColorFromPalette !== undefined &&
        userColorFromPalette !== 'removeColor'
      ) {
        console.log('5');
        // Add class
        this.getCurrentElement.value.classList.add(userColorFromPalette);

        // Update the current element in the store
        this.store.commit(
          'designer/setCurrentBackgroundColor',
          userColorFromPalette
        );
        this.store.commit(
          'designer/setCurrentElement',
          this.getCurrentElement.value
        );
      }
    }
  }
}

const designer = new Designer();

export default Designer;
