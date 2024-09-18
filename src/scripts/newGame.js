import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./store.js";
import { SIZE, DIFFICULTY } from "./config.js";
import { fillTable } from "./dom.js";

const startGame = (tbody, solvedBoard) => {
  let puzzle = getFromLocalStorage("sudoku");

  if (!puzzle) {
    puzzle = createCustomPuzzle(solvedBoard, SIZE, DIFFICULTY);
    saveToLocalStorage("sudoku", puzzle);
  }

  fillTable(tbody, puzzle);
};

export { startGame };
