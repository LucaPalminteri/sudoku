import { GameView } from "../views/GameView.js";
import { HomeView } from "../views/HomeView.js";
import { GameController } from "../controllers/GameController.js";

const mainContainer = document.createElement("div");
mainContainer.id = "main-container";
document.body.appendChild(mainContainer);

const gameController = new GameController();
const gameView = new GameView(mainContainer, handleNewGame, showHomePage, gameController);
const homeView = new HomeView(mainContainer, handleStartGame);

function showHomePage() {
  homeView.render();
}

function showGamePage() {
  gameView.render();
}

function handleStartGame(size, difficulty) {
  gameController.setGameOptions(size, difficulty);
  showGamePage();
}

function handleNewGame(tbody) {
  const puzzle = gameController.handleNewGame(tbody);
  gameView.updateBoard(puzzle);
}

document.addEventListener("DOMContentLoaded", showHomePage);
