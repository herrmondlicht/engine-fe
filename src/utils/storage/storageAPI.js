export const storageAPI = (storage = window.localStorage) => ({
  set: (itemKey, value) => storage.setItem(itemKey, value),
  get: keyName => storage.getItem(keyName)
});

export const STORAGE_KEYS = {
  TOKEN: "token"
};

export default storageAPI();
