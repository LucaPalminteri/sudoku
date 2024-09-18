const createButton = (text = "", onClick = null, className = "", style = {}) => {
  const button = window.document.createElement("button");
  button.textContent = text;

  if (onClick) {
    button.addEventListener("click", onClick);
  }

  if (className) {
    button.classList.add(className);
  }

  if (Object.keys(style).length > 0) {
    Object.assign(button.style, style);
  }

  return button;
};

export { createButton };
