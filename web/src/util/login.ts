import { getStorageItem } from "./storage";

export const getLoginToken = (): string => {
  const token = getStorageItem("token");
  return token ? token : "";
};
