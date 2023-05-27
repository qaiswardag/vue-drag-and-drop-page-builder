import config from '../utils/tailwaind-colors';
import { computed } from 'vue';

class Designer {
  constructor(store) {
    this.colors = config.backgroundColors();
    this.store = store;
    this.getComponent = computed(
      () => this.store.getters['designer/getComponent']
    );
  }
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
