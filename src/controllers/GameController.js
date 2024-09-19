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
    if (this.currentPuzzle[row][col] === 0) {
      this.moveHistory.push({ row, col, prevValue: this.currentPuzzle[row][col] });
      this.currentPuzzle[row][col] = number;
      saveToLocalStorage("sudoku", this.currentPuzzle);
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
}
