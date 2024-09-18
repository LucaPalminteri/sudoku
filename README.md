
Sudoku Puzzle Game
==================

A customizable Sudoku puzzle generator and solver built using HTML, CSS, and JavaScript. It allows users to generate Sudoku boards with adjustable difficulty and interact with the grid to fill in the numbers, with row, column, and group highlighting for better user experience.

Features
--------

* **Custom Sudoku Generation:** Generate Sudoku puzzles of varying sizes and difficulties.
* **Interactive Grid:** Fill in the grid with numbers, with empty cells being input fields.
* **Highlighting:** Row, column, and group highlighting for better visibility.
* **Local Storage Support:** Automatically saves your puzzle progress in the browser.
* **Responsive Design:** Designed for a seamless experience across devices.

Installation
------------

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/sudoku-game.git
    ```

2. Navigate to the project directory:

    ```bash
    cd sudoku-game
    ```

3. Open `index.html` in your browser to start the game.

Usage
-----

* Click the "New Game" button to generate a new puzzle.
* Fill in the empty cells by typing numbers.
* Progress is saved automatically in local storage, so you can continue later.

Project Structure
-----------------

* **`index.html`**: Main HTML file.
* **`styles.css`**: Contains all styles, including buttons and input fields.
* **`main.js`**: Game logic, puzzle generation, and interaction handling.
* **`components/`**: Contains reusable UI components like buttons and input fields.
* **`utils.js`**: Utility functions for DOM manipulation.
* **`store.js`**: Manages local storage interactions.

License
-------

This project is licensed under the MIT License.
