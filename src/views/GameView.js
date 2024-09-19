import { createTable, fillTable, highlightCell } from "../scripts/dom.js";
import { createButton } from "../components/button/button.js";
import Timer from "../scripts/timer.js";
import { DIFFICULTIES } from "../scripts/config.js";

export class GameView {
  constructor(container, onNewGame, onBackToHome, gameController) {
    this.container = container;
    this.onNewGame = onNewGame;
    this.onBackToHome = onBackToHome;
    this.gameController = gameController;
    this.tbody = null;
    this.timerDisplay = null;
    this.selectedCell = null;
  }

  render() {
    this.container.innerHTML = "";

    this.createHeader();
    this.createBoard();
    this.createActionButtons();
    this.createNumberPad();

    this.setupTimer();
    this.setupCellSelection();

    this.onNewGame(this.tbody);
  }

  createHeader() {
    const header = document.createElement("div");
    header.id = "game-header";

    const backButton = createButton({ icon: "chevron-left", onClick: this.onBackToHome });
    backButton.classList.add("action-button");
    backButton.addEventListener("click", this.onBackToHome);

    const difficulty = document.createElement("div");
    difficulty.id = "difficulty";

    let difficultyName = "";

    switch (this.gameController.getCurrentDifficulty()) {
      case DIFFICULTIES.BEGGINER:
        difficultyName = "Begginer";
        break;
      case DIFFICULTIES.EASY:
        difficultyName = "Easy";
        break;
      case DIFFICULTIES.MEDIUM:
        difficultyName = "Medium";
        break;
      case DIFFICULTIES.HARD:
        difficultyName = "Hard";
        break;
      default:
        difficultyName = "Unknown";
    }
    difficulty.textContent = `${difficultyName}`;

    const settingsButton = createButton({ icon: "settings", onClick: () => console.log("Settings clicked") });
    settingsButton.classList.add("action-button");

    header.append(backButton, difficulty, settingsButton);
    this.container.appendChild(header);

    this.timerDisplay = document.createElement("div");
    this.timerDisplay.id = "timer";
    this.container.appendChild(this.timerDisplay);
  }

  createBoard() {
    const table = document.createElement("table");
    this.tbody = table.createTBody();
    const currentSize = this.gameController.getCurrentSize();
    createTable(this.tbody, currentSize);
    this.container.appendChild(table);
  }

  setupCellSelection() {
    this.tbody.addEventListener("click", (event) => {
      const cell = event.target.closest("td");
      if (cell && !cell.classList.contains("initial")) {
        this.selectedCell = cell;
        highlightCell(cell);
      }
    });
  }

  onNumberClick(number) {
    if (this.selectedCell) {
      const row = parseInt(this.selectedCell.dataset.row);
      const col = parseInt(this.selectedCell.dataset.col);
      this.gameController.makeMove(row, col, number);
      this.updateBoard(this.gameController.getCurrentPuzzle());
    }
  }

  updateBoard(puzzle) {
    fillTable(this.tbody, puzzle);
    if (this.selectedCell) {
      highlightCell(this.selectedCell);
    }
  }

  createActionButtons() {
    const actionButtons = document.createElement("div");
    actionButtons.id = "action-buttons";

    const buttons = [
      { icon: "undo", onClick: () => this.gameController.undo(), label: "Undo" },
      { icon: "eraser", onClick: () => this.onNumberClick(0), label: "Erase" },
      { icon: "pencil-line", onClick: () => this.toggleNoteMode(), label: "Notes" },
      { icon: "lightbulb", onClick: () => this.gameController.getHint(), label: "Hint" },
    ];

    buttons.forEach((button) => {
      const btn = createButton({ text: button.text, onClick: button.onClick, icon: button.icon });
      btn.classList.add("action-button");
      btn.addEventListener("click", button.onClick);

      const label = document.createElement("div");
      label.textContent = button.label;
      label.style.fontSize = "12px";

      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.alignItems = "center";
      wrapper.appendChild(btn);
      wrapper.appendChild(label);

      actionButtons.appendChild(wrapper);
    });

    this.container.appendChild(actionButtons);
  }

  createNumberPad() {
    const numberPad = document.createElement("div");
    numberPad.id = "number-pad";
    for (let i = 1; i <= 9; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("number-button");
      button.addEventListener("click", () => this.onNumberClick(i));
      numberPad.appendChild(button);
    }
    this.container.appendChild(numberPad);
  }

  setupTimer() {
    const timer = Timer.getInstance();
    timer.reset();
    timer.start();

    const updateTimerDisplay = (time) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (time % 60).toString().padStart(2, "0");
      this.timerDisplay.textContent = `${minutes}:${seconds}`;
    };
    timer.addObserver(updateTimerDisplay);
  }

  setupCellHighlighting() {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("mouseenter", () => highlightCell(cell));
    });
  }

  updateBoard(puzzle) {
    fillTable(this.tbody, puzzle);
  }

  toggleNoteMode() {
    // Implement note mode toggling logic
    console.log("Note mode toggled");
  }
}
