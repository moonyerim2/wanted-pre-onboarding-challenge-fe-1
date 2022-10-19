export type Method = "GET" | "POST" | "DELETE";

export interface FetchParams {
  endPoint: string;
}

export interface PostParams extends FetchParams {
  options: RequestInit;
}

export interface GetParams extends FetchParams {
  options?: RequestInit;
}

export interface UseFetchParams {
  baseUrl: string;
  options?: RequestInit;
  endPoint?: string;
}
