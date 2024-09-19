import { createCard } from "../card/card.js";
import { createButton } from "../button/button.js";
import { SIZES, DIFFICULTIES } from "../../scripts/config.js";
import { getFromLocalStorage } from "../../scripts/store.js";

const createHomeMenu = (onStartGame) => {
  let selectedSize = "EASY";
  let selectedDifficulty = "EASY";
  const isAlreadyStarted = getFromLocalStorage("sudoku") ? true : false;

  const menuCard = createCard({
    title: "Sudoku Game",
    content: "Choose your game options:",
    className: "home-menu-card",
    size: "large",
    variant: "primary",
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Size options
  const sizeTitle = document.createElement("h3");
  sizeTitle.textContent = "Grid Size:";
  buttonContainer.appendChild(sizeTitle);

  const sizeButtons = {};
  Object.keys(SIZES).forEach((key) => {
    const sizeButton = createButton({
      text: `${key} (${SIZES[key]}x${SIZES[key]})`,
      onClick: () => {
        selectedSize = key;
        updateButtonStates();
      },
      className: "size-button",
      variant: key === selectedSize ? "primary" : "secondary",
    });
    sizeButtons[key] = sizeButton;
    buttonContainer.appendChild(sizeButton);
  });

  // Difficulty options
  const difficultyTitle = document.createElement("h3");
  difficultyTitle.textContent = "Difficulty:";
  buttonContainer.appendChild(difficultyTitle);

  const difficultyButtons = {};
  Object.keys(DIFFICULTIES).forEach((key) => {
    const difficultyButton = createButton({
      text: key,
      onClick: () => {
        selectedDifficulty = key;
        updateButtonStates();
      },
      className: "difficulty-button",
      variant: key === selectedDifficulty ? "primary" : "secondary",
    });
    difficultyButtons[key] = difficultyButton;
    buttonContainer.appendChild(difficultyButton);
  });

  const startButton = createButton({
    text: isAlreadyStarted ? "Continue" : "Start Game",
    onClick: () => onStartGame(selectedSize, selectedDifficulty),
    className: "start-button",
    variant: "primary",
  });
  buttonContainer.appendChild(startButton);

  menuCard.querySelector(".card-body").appendChild(buttonContainer);

  function updateButtonStates() {
    Object.entries(sizeButtons).forEach(([key, button]) => {
      button.className = `size-button button-${key === selectedSize ? "primary" : "secondary"}`;
    });
    Object.entries(difficultyButtons).forEach(([key, button]) => {
      button.className = `difficulty-button button-${key === selectedDifficulty ? "primary" : "secondary"}`;
    });
  }

  return menuCard;
};

export { createHomeMenu };
