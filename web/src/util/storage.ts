const storage = localStorage;

export const getStorageItem = (key: string) => {
  const item = storage.getItem(key);
  if (item !== null) {
    return JSON.parse(item);
  }
};
