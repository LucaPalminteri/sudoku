import { SIZE, DIFFICULTY } from "./config.js";
import { $ } from "./utils.js";
import { createTable, fillTable, highlightCell } from "./dom.js";
import { generateCustomSudoku, createCustomPuzzle } from "./sudoku.js";
import { getFromLocalStorage, saveToLocalStorage } from "./store.js";
import { createButton } from "../components/button/button.js";
import { startGame } from "./newGame.js";

const $body = $("body");
const $table = $("table");
const tbody = $table.createTBody();

const handleNewGame = () => {
  const solvedBoard = generateCustomSudoku(SIZE);
  saveToLocalStorage("sudoku", createCustomPuzzle(solvedBoard, SIZE, DIFFICULTY));
  fillTable(tbody, getFromLocalStorage("sudoku"));
};

const newGameButton = createButton({
  text: "New Game",
  onClick: handleNewGame,
});
$body.appendChild(newGameButton);

createTable(tbody);
const solvedBoard = generateCustomSudoku(SIZE);
startGame(tbody, solvedBoard);

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("mouseenter", () => highlightCell(cell));
});
