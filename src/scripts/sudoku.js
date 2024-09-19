import { shuffleArray } from "./utils.js";

/**
 * Generates a custom Sudoku board.
 * Creates a valid Sudoku board of the specified size using a recursive backtracking algorithm.
 *
 * @param {number} size - The size of the Sudoku grid (e.g., 9 for a standard Sudoku).
 * @returns {number[][]} - A 2D array representing the Sudoku board.
 * @throws {Error} - Throws an error if the Sudoku board cannot be generated.
 */
const generateCustomSudoku = (size) => {
  const groupSize = Math.sqrt(size);
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  if (fillCustomBoard(board, groupSize)) return board;
  throw new Error("Failed to generate a Sudoku board.");
};

/**
 * Fills the Sudoku board with numbers using a recursive backtracking approach.
 * This function attempts to place numbers in empty cells and backtracks if it encounters an invalid state.
 *
 * @param {number[][]} board - The Sudoku board to be filled.
 * @param {number} groupSize - The size of each group (sub-grid) in the Sudoku board.
 * @returns {boolean} - Returns `true` if the board was successfully filled, `false` otherwise.
 */
const fillCustomBoard = (board, groupSize) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffleArray([...Array(board.length).keys()].map((n) => n + 1));
        for (let num of numbers) {
          if (isValidCustom(board, row, col, num, groupSize)) {
            board[row][col] = num;
            if (fillCustomBoard(board, groupSize)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

/**
 * Checks whether placing a number in a specific cell of the Sudoku board is valid.
 * Validates the number against the row, column, and group constraints.
 *
 * @param {number[][]} board - The Sudoku board.
 * @param {number} row - The row index of the cell to be validated.
 * @param {number} col - The column index of the cell to be validated.
 * @param {number} num - The number to be validated.
 * @param {number} groupSize - The size of each group (sub-grid) in the Sudoku board.
 * @returns {boolean} - Returns `true` if the number is valid in the specified cell, `false` otherwise.
 */
const isValidCustom = (board, row, col, num, groupSize) => {
  const size = board.length;
  // Check row
  if (board[row].includes(num)) return false;
  // Check column
  if (board.some((r) => r[col] === num)) return false;
  // Check group
  const startRow = row - (row % groupSize);
  const startCol = col - (col % groupSize);
  for (let r = startRow; r < startRow + groupSize; r++) {
    for (let c = startCol; c < startCol + groupSize; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
};

/**
 * Creates a Sudoku puzzle by removing a specified number of cells from a solved Sudoku board.
 * The removed cells are replaced with zeros to create the puzzle.
 *
 * @param {number[][]} board - The solved Sudoku board.
 * @param {number} size - The size of the Sudoku grid.
 * @param {number} difficulty - The difficulty of the puzzle.
 * @returns {number[][]} - A 2D array representing the Sudoku puzzle with some cells removed.
 */
const createCustomPuzzle = (board, size, difficulty) => {
  const numCellsToRemove = Math.floor(size ** 2 * difficulty);
  const puzzle = board.map((row) => row.slice());
  let count = 0;
  while (count < numCellsToRemove) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count++;
    }
  }
  return puzzle;
};

export { generateCustomSudoku, createCustomPuzzle };
