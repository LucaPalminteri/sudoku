const createButton = (text = "", onClick = null, className = "", style = {}, disabled = false) => {
  const button = window.document.createElement("button");
  button.textContent = text;

  if (onClick && !disabled) {
    button.addEventListener("click", onClick);
  }

  if (className) {
    button.classList.add(className);
  }

  if (Object.keys(style).length > 0) {
    Object.assign(button.style, style);
  }

  if (disabled) {
    button.disabled = true;
    button.classList.add("disabled");
  }

  return button;
};

export { createButton };
