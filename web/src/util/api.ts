import { Method } from "../type";

export const buildHeader = (method: Method, token: string): HeadersInit => {
  const headers = [method, token].reduce((headers, headerProp) => {
    if (headerProp === "POST" || headerProp === "DELETE") {
      return { ...headers, ["Content-Type"]: "application/json" };
    }
    return { ...headers, Authorization: token };
  }, {});
  return headers;
};

export const buildOption = (
  method: Method,
  token: string,
  body?: unknown
): RequestInit => {
  const options = {
    headers: buildHeader(method, token),
    body: JSON.stringify(body),
  };
  return options;
};
