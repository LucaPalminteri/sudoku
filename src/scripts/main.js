import { SIZE, DIFFICULTY } from "./config.js";
import { $ } from "./utils.js";
import { createTable, fillTable, highlightCell } from "./dom.js";
import { generateCustomSudoku, createCustomPuzzle } from "./sudoku.js";
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from "./store.js";
import { createButton } from "../components/button/button.js";

const $body = $("body");
const $table = $("table");
const tbody = $table.createTBody();

const handleNewGame = () => {
  removeFromLocalStorage("sudoku");
  const solvedBoard = generateCustomSudoku(SIZE);

  saveToLocalStorage("sudoku", createCustomPuzzle(solvedBoard, SIZE, DIFFICULTY));
  fillTable(tbody, getFromLocalStorage("sudoku"));
};
const newGameButton = createButton("New Game", handleNewGame);

$body.appendChild(newGameButton);

createTable(tbody);

const solvedBoard = generateCustomSudoku(SIZE);

let puzzle = getFromLocalStorage("sudoku");

if (!puzzle) {
  puzzle = createCustomPuzzle(solvedBoard, SIZE, DIFFICULTY);
  saveToLocalStorage("sudoku", puzzle);
}

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("mouseenter", () => highlightCell(cell));
});

fillTable(tbody, puzzle);
