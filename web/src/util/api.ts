import { Method } from "../type";

export const buildHeader = (token: string, method?: Method) => {
  const headers: { [key: string]: string } = {
    Authorization: token,
  };

  if (method === "GET" || method === undefined) {
    return headers;
  }

  return { ...headers, method, ["Content-Type"]: "application/json" };
};

export const buildOption = (token: string, method?: Method, body?: unknown) => {
  const options = {
    headers: buildHeader(token, method),
    body: JSON.stringify(body),
  };
  return options;
};
