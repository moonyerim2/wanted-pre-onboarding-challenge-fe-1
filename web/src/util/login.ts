import { getStorageItem } from ".";

export const getLoginToken = (): string => {
  const token = getStorageItem("token");
  return token ? token : "";
};
