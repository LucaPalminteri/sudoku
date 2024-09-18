/**
 * Selects a DOM element based on a CSS selector.
 * This utility function wraps `document.querySelector` to simplify element selection.
 *
 * @param {string} selector - The CSS selector used to find the DOM element.
 * @returns {HTMLElement|null} - The DOM element that matches the selector, or `null` if no match is found.
 */
const $ = (selector) => document.querySelector(selector);

/**
 * Shuffles the elements of an array in place.
 * This function implements the Fisher-Yates (Knuth) shuffle algorithm to randomize the order of array elements.
 *
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export { $, shuffleArray };
