import { SIZE, GROUP_SIZE } from "./config.js";
import { createInputField } from "../components/input/input.js";

/**
 * Creates the Sudoku table in the DOM.
 * This function generates a grid with rows and cells, and applies styling classes
 * based on the group size configuration. It also adds a click event listener to each cell.
 *
 * @param {HTMLElement} tableDOM - The DOM element representing the table where the Sudoku grid will be created.
 */
const createTable = (tableDOM) => {
  for (let i = 0; i < SIZE; i++) {
    const row = document.createElement("tr");
    row.classList.add("row");

    if (isGroupLimit(i)) row.classList.add("row-group");
    tableDOM.appendChild(row);

    for (let j = 0; j < SIZE; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");

      if (isGroupLimit(j)) cell.classList.add("cell-group");

      cell.addEventListener("click", () => {
        console.log(`row: ${row.rowIndex + 1}, cell: ${cell.cellIndex + 1}`);
      });

      row.appendChild(cell);
    }
  }
};

/**
 * Fills the Sudoku table with values.
 * This function populates the cells of the table with the provided values from the Sudoku board.
 *
 * @param {HTMLElement} tableDOM - The DOM element representing the table to be filled.
 * @param {number[][]} table - A 2D array representing the Sudoku board values.
 */
const fillTable = (tableDOM, table) => {
  tableDOM.querySelectorAll("tr").forEach((row, rowIndex) => {
    row.querySelectorAll("td").forEach((cell, cellIndex) => {
      const value = table[rowIndex][cellIndex];
      // if (value === 0) {
      //   continue
      //   const input = createInputField({
      //     type: "number",
      //     min: 1,
      //     max: SIZE,
      //     className: "sudoku-input",
      //     onChange: (e) => {
      //       // Handle value change if needed, e.g., validate input
      //       const userInput = e.target.value;
      //       console.log(`User entered: ${userInput} at row ${rowIndex}, col ${cellIndex}`);
      //     },
      //   });
      //   cell.appendChild(input);
      // } else {
      cell.textContent = value;
      if (value === 0) {
        cell.textContent = "";
      }
      switch (value) {
        case 0:
          cell.textContent = "";
          break;
        case 10:
          cell.textContent = "A";
          break;
        case 11:
          cell.textContent = "B";
          break;
        case 12:
          cell.textContent = "C";
          break;
        case 13:
          cell.textContent = "D";
          break;
        case 14:
          cell.textContent = "E";
          break;
        case 15:
          cell.textContent = "F";
          break;
        case 16:
          cell.textContent = "G";
          break;
      }
      cell.classList.add("pre-filled");
      // }
    });
  });
};

/**
 * Determines if the given index is at the boundary of a Sudoku group.
 * This function checks if the index is at the limit where a new group starts.
 *
 * @param {number} index - The index to check.
 * @returns {boolean} - Returns `true` if the index is at a group boundary, `false` otherwise.
 */
const isGroupLimit = (index) => ((index + 1) / GROUP_SIZE) % 1 === 0;

// Function to highlight row, column, and group based on cell
const highlightCell = (cell) => {
  // Remove previous highlights
  document.querySelectorAll(".cell").forEach((c) => {
    c.classList.remove("highlight-row", "highlight-column", "highlight-group");
  });

  const rowIndex = cell.parentElement.rowIndex;
  const cellIndex = cell.cellIndex;

  // Highlight row
  document.querySelectorAll(`.row:nth-child(${rowIndex + 1}) .cell`).forEach((c) => {
    c.classList.add("highlight-row");
  });

  // Highlight column
  document.querySelectorAll(`.row .cell:nth-child(${cellIndex + 1})`).forEach((c) => {
    c.classList.add("highlight-column");
  });

  // Highlight group
  const groupStartRow = Math.floor(rowIndex / GROUP_SIZE) * GROUP_SIZE + 1;
  const groupStartCol = Math.floor(cellIndex / GROUP_SIZE) * GROUP_SIZE + 1;

  for (let r = groupStartRow; r < groupStartRow + GROUP_SIZE; r++) {
    document.querySelectorAll(`.row:nth-child(${r}) .cell`).forEach((c) => {
      if (Math.floor(c.cellIndex / GROUP_SIZE) + 1 === Math.floor(cellIndex / GROUP_SIZE) + 1) {
        c.classList.add("highlight-group");
      }
    });
  }
};

// Attach the highlight function to each cell

export { createTable, fillTable, highlightCell };
