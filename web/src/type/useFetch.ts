export type Method = "GET" | "POST" | "DELETE" | "PUT";

export type Options = { [key: string]: any };

export interface FetchParams {
  endPoint: string;
}

export interface PostParams extends FetchParams {
  options: Options;
}

export interface GetParams extends FetchParams {
  options?: Options;
}

export interface UseFetchParams {
  baseUrl: string;
  options?: Options;
  endPoint?: string;
}
