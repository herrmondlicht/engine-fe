export const storageAPI = (storage = window.localStorage) => ({
  setItem: (itemKey, value) => storage.setItem(itemKey, value),
  getItem: keyName => storage.getItem(keyName),
  removeItem: keyName => storage.removeItem(keyName)
});

export const STORAGE_KEYS = {
  TOKEN: "token"
};

export default storageAPI();
