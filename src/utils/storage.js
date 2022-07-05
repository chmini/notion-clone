const storage = window.localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);

    throw new Error('storedValue is undefined');
  } catch {
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};
