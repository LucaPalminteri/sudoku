const createInputField = ({
  type = "text",
  placeholder = "",
  className = "",
  value = "",
  onChange = null,
  onFocus = null,
  onBlur = null,
  size = "medium", // small, medium, large
  variant = "", // error, success
  disabled = false,
  ariaLabel = "",
  attributes = {},
  min = null,
  max = null,
  required = false,
  pattern = null,
} = {}) => {
  const input = document.createElement("input");

  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  input.disabled = disabled;
  input.required = required;

  if (ariaLabel) input.setAttribute("aria-label", ariaLabel);

  input.classList.add("input", size);
  if (variant) input.classList.add(variant);
  if (className) input.classList.add(className);

  Object.assign(input, attributes);

  if (min !== null) input.min = min;
  if (max !== null) input.max = max;
  if (pattern) input.pattern = pattern;

  if (onChange) input.addEventListener("input", onChange);
  if (onFocus) input.addEventListener("focus", onFocus);
  if (onBlur) input.addEventListener("blur", onBlur);

  return input;
};

export { createInputField };
