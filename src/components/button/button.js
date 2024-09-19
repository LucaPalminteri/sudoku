const createButton = ({
  text = "",
  onClick = null,
  className = "",
  style = {},
  disabled = false,
  icon = null,
  type = "button",
  ariaLabel = "",
  attributes = {},
  size = "medium", // small, medium, large
  variant = "default", // primary, secondary, danger
} = {}) => {
  const button = window.document.createElement("button");
  button.type = type;
  if (ariaLabel) {
    button.setAttribute("aria-label", ariaLabel);
  }

  if (icon) {
    // const iconElement = window.document.createElement("i");
    // iconElement.classList.add(icon);
    // button.appendChild(iconElement);

    const iconElement = document.createElement("img");
    iconElement.src = `../icons/${icon}.svg`; // Adjust file path and extension accordingly
    iconElement.alt = `${icon} icon`; // Optional: provide alt text
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

  if (size) {
    button.classList.add(`button-${size}`);
  }

  if (variant) {
    button.classList.add(`button-${variant}`);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    button.setAttribute(key, value);
  });

  return button;
};

export { createButton };
