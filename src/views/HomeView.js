import { createHomeMenu } from "../components/sudoku-menu/sudokuMenu.js";

export class HomeView {
  constructor(container, onStartGame) {
    this.container = container;
    this.onStartGame = onStartGame;
  }

  render() {
    this.container.innerHTML = "";
    const homeMenu = createHomeMenu(this.onStartGame);
    this.container.appendChild(homeMenu);
  }
}
