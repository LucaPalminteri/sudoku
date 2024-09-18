/**
 * Configuration constants for the Sudoku.
 */

/**
 * Defines the sizes of the Sudoku grid for different difficulty levels.
 * @enum {number}
 */
const SIZES = {
  BEGGINER: 4, // 4x4 grid
  EASY: 9, // 9x9 grid
  MEDIUM: 16, // 16x16 grid
  HARD: 25, // 25x25 grid
};

/**
 * Defines the sizes of the groups (sub-grids) for different difficulty levels.
 * @enum {number}
 */
const GROUP_SIZES = {
  BEGGINER: 2, // 2x2 groups for 4x4 grid
  EASY: 3, // 3x3 groups for 9x9 grid
  MEDIUM: 4, // 4x4 groups for 16x16 grid
  HARD: 5, // 5x5 groups for 25x25 grid
};

/**
 * Defines the difficulty levels as a percentage of cells to be removed from the solved board.
 * @enum {number}
 */
const DIFFICULTIES = {
  BEGGINER: 0.1, // 10% of cells removed
  EASY: 0.3, // 30% of cells removed
  MEDIUM: 0.5, // 50% of cells removed
  HARD: 0.7, // 70% of cells removed
};

/**
 * The size of each group (sub-grid) for the current Sudoku difficulty level.
 * @type {number}
 * @default GROUP_SIZES.EASY
 */
const GROUP_SIZE = GROUP_SIZES.EASY;

/**
 * The size of the Sudoku grid for the current difficulty level.
 * @type {number}
 * @default SIZES.EASY
 */
const SIZE = SIZES.EASY;

/**
 * The number of cells to remove to create a puzzle based on the current difficulty level.
 * The difficulty level determines the percentage of cells to be removed from the solved board.
 * @type {number}
 * @default Math.floor(SIZE ** 2 * DIFFICULTIES.EASY)
 */
const DIFFICULTY = Math.floor(SIZE ** 2 * DIFFICULTIES.EASY);

export { SIZE, GROUP_SIZE, DIFFICULTY };
