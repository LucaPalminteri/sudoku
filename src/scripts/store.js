const saveToLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
