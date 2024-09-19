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

  // Set aria-label if provided
  if (ariaLabel) {
    button.setAttribute("aria-label", ariaLabel);
  }

  // Add the icon (if any) before the text
  if (icon && typeof icon === "string") {
    const iconElement = document.createElement("img");
    iconElement.src = `/src/icons/${icon}.svg`;
    iconElement.alt = `${icon} icon`;

    // Apply some styles if needed
    iconElement.style.width = "24px"; // Adjust size as necessary
    iconElement.style.height = "24px";
    iconElement.style.filter = "invert(1)";
    // Append the icon first
    button.appendChild(iconElement);
  }

  // Add text after the icon
  if (text) {
    const textNode = window.document.createTextNode(text);
    button.appendChild(textNode);
  }

  // Add event listener if button is clickable and not disabled
  if (onClick && !disabled) {
    button.addEventListener("click", onClick);
  }

  // Apply custom class names
  if (className) {
    button.classList.add(className);
  }

  // Apply styles if provided
  if (Object.keys(style).length > 0) {
    Object.assign(button.style, style);
  }

  // Handle disabled state
  if (disabled) {
    button.disabled = true;
    button.classList.add("disabled");
  }

  // Handle size and variant
  if (size) {
    button.classList.add(`button-${size}`);
  }
  if (variant) {
    button.classList.add(`button-${variant}`);
  }

  // Add any additional attributes
  Object.entries(attributes).forEach(([key, value]) => {
    button.setAttribute(key, value);
  });

  return button;
};

export { createButton };
