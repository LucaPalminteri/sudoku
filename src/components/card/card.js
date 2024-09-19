const createCard = ({
  title = "",
  content = "",
  imageUrl = "",
  onClick = null,
  className = "",
  style = {},
  attributes = {},
  size = "medium", // small, medium, large
  variant = "default", // primary, secondary, accent
} = {}) => {
  const card = window.document.createElement("div");
  card.classList.add("card");

  if (imageUrl) {
    const image = window.document.createElement("img");
    image.src = imageUrl;
    image.alt = title;
    image.classList.add("card-image");
    card.appendChild(image);
  }

  const cardBody = window.document.createElement("div");
  cardBody.classList.add("card-body");

  if (title) {
    const titleElement = window.document.createElement("h2");
    titleElement.classList.add("card-title");
    titleElement.textContent = title;
    cardBody.appendChild(titleElement);
  }

  if (content) {
    const contentElement = window.document.createElement("p");
    contentElement.classList.add("card-content");
    contentElement.textContent = content;
    cardBody.appendChild(contentElement);
  }

  card.appendChild(cardBody);

  if (onClick) {
    card.addEventListener("click", onClick);
    card.style.cursor = "pointer";
  }

  if (className) {
    card.classList.add(className);
  }

  if (Object.keys(style).length > 0) {
    Object.assign(card.style, style);
  }

  if (size) {
    card.classList.add(`card-${size}`);
  }

  if (variant) {
    card.classList.add(`card-${variant}`);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    card.setAttribute(key, value);
  });

  return card;
};

export { createCard };
