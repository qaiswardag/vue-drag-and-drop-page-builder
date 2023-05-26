import { useStore } from 'vuex';
import config from '../utils/tailwaind-colors';

class Designer {
  constructor() {
    this.colors = colors;
    this.store = useStore();
  }

  handleColor(color) {
    // Iterate over each color in the colors array
    for (let singleColor of colors) {
      // Check if the current element has the CSS color class
      if (getCurrentElement.value.classList.contains(singleColor) === true) {
        // Remove color
        getCurrentElement.value.classList.remove(singleColor);
      }

      // Check if the current element does not have the CSS color class
      if (!getCurrentElement.value.classList.contains(singleColor) === false) {
        // Add color
        getCurrentElement.value.classList.add(color);

        // Update the current element in the store
        this.store.commit('designer/setCurrentElementBackgroundColor', color);
        this.store.commit(
          'designer/setCurrentElement',
          getCurrentElement.value
        );
      }
    }
  }
}

// Create an instance of the Designer class with the colors array
const colors = config.backgroundColors.sort((a, b) => {
  return (
    config.backgroundColors.indexOf(a) - config.backgroundColors.indexOf(b)
  );
});
const designer = new Designer(colors);

export default Designer;
