import { getFromLocalStorage, saveToLocalStorage } from "./store.js";
import { SIZE, DIFFICULTY } from "./config.js";
import { fillTable } from "./dom.js";
import { createCustomPuzzle } from "./sudoku.js";
import Timer from "./timer.js";

const startGame = (tbody, solvedBoard) => {
  let puzzle = getFromLocalStorage("sudoku");

  if (!puzzle) {
    puzzle = createCustomPuzzle(solvedBoard, SIZE, DIFFICULTY);
    saveToLocalStorage("sudoku", puzzle);
  }

  fillTable(tbody, puzzle);
};

export { startGame };
