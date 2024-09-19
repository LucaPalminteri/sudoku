import { SIZES, DIFFICULTIES, SIZE, DIFFICULTY } from "../scripts/config.js";
import { generateCustomSudoku, createCustomPuzzle } from "../scripts/sudoku.js";
import { getFromLocalStorage, saveToLocalStorage } from "../scripts/store.js";
import { startGame } from "../scripts/newGame.js";
import Timer from "../scripts/timer.js";

export class GameController {
  constructor() {
    this.currentSize = SIZE;
    this.currentDifficulty = DIFFICULTY;
    this.currentPuzzle = null;
    this.solvedBoard = null;
    this.moveHistory = [];
  }

  setGameOptions(size, difficulty) {
    this.currentSize = SIZES[size];
    this.currentDifficulty = DIFFICULTIES[difficulty];
  }

  handleNewGame(tbody) {
    this.solvedBoard = generateCustomSudoku(this.currentSize);
    this.currentPuzzle = createCustomPuzzle(this.solvedBoard, this.currentSize, this.currentDifficulty);
    saveToLocalStorage("sudoku", this.currentPuzzle);
    startGame(tbody, this.solvedBoard);
    const timer = Timer.getInstance();
    timer.reset();
    timer.start();
    this.moveHistory = [];
    return this.currentPuzzle;
  }

  makeMove(row, col, number) {
    if (!this.currentPuzzle || isNaN(row) || isNaN(col) || isNaN(number)) {
      console.error("Invalid move parameters:", { row, col, number, currentPuzzle: this.currentPuzzle });
      return;
    }
    if (this.currentPuzzle[row][col] === 0) {
      this.moveHistory.push({ row, col, prevValue: this.currentPuzzle[row][col] });
      this.currentPuzzle[row][col] = number;
      saveToLocalStorage("sudoku", this.currentPuzzle);
      // Mark this cell as user-added
      // This might require a different approach based on your current setup
    }
  }

  undo() {
    if (this.moveHistory.length > 0) {
      const lastMove = this.moveHistory.pop();
      this.currentPuzzle[lastMove.row][lastMove.col] = lastMove.prevValue;
      saveToLocalStorage("sudoku", this.currentPuzzle);
      return true;
    }
    return false;
  }

  erase(row, col) {
    if (this.currentPuzzle && !isNaN(row) && !isNaN(col)) {
      // Save the previous value for undo functionality
      if (this.currentPuzzle[row][col] !== 0) {
        this.moveHistory.push({
          row,
          col,
          prevValue: this.currentPuzzle[row][col],
        });
        this.currentPuzzle[row][col] = 0; // Set the cell to 0 to erase it
        saveToLocalStorage("sudoku", this.currentPuzzle);
      }
    }
  }

  getHint() {
    // Implement hint logic here
    console.log("Hint requested");
  }

  getCurrentSize() {
    return this.currentSize;
  }

  getCurrentDifficulty() {
    return this.currentDifficulty;
  }

  getCurrentPuzzle() {
    return this.currentPuzzle;
  }

  validateMove(row, col, number) {
    console.log("Validating move:", { row, col, number });
    return this.isValidInRow(row, number) && this.isValidInCol(col, number) && this.isValidInGrid(row, col, number);
  }

  isValidInRow(row, number) {
    console.log("Validating row:", { row, number });
    console.log(this.currentPuzzle[row]);
    return !this.currentPuzzle[row].includes(number);
  }

  isValidInCol(col, number) {
    return !this.currentPuzzle.some((row) => row[col] === number);
  }

  isValidInGrid(row, col, number) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (this.currentPuzzle[r][c] === number) {
          return false;
        }
      }
    }
    return true;
  }
}
