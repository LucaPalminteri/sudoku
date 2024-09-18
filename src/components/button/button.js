const createButton = (text = "", onClick = null, className = "", style = {}, disabled = false, icon = null) => {
  const button = window.document.createElement("button");
  if (icon) {
    const iconElement = window.document.createElement("i");
    iconElement.classList.add(icon);
    button.appendChild(iconElement);
  }
  button.appendChild(window.document.createTextNode(text));

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
