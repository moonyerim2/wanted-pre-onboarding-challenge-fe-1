import { useState, useEffect } from "react";
import { Method, UseFetchParams, PostParams, GetParams } from "../type";

export function useFetch({ baseUrl, options, endPoint }: UseFetchParams) {
  const [responseData, setResponseData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    url: string,
    method: string,
    options?: RequestInit
  ) => {
    try {
      setLoading(true);

      //setTimeout(async () => {
      const response = options
        ? await fetch(url, { ...options, method })
        : await fetch(url);
      const { data } = await response.json();
      setResponseData(data);
      setLoading(false);
      return data;
      //}, 2000);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const createUrl = (endPoint: string) => `${baseUrl}${endPoint}`;

  const post = async ({ endPoint, options }: PostParams) => {
    const { headers } = options;
    const { method }: { method: Method } = headers;

    if (!method) {
      throw "HTTP method를 입력하세요.";
    }
    const url = createUrl(endPoint);
    const data = await fetchData(url, method, options);
    return data;
  };

  const get = async ({ endPoint, options }: GetParams) => {
    const method = "GET";
    const url = createUrl(endPoint);
    const data = options
      ? await fetchData(url, method, options)
      : await fetchData(url, method);
    return data;
  };

  useEffect(() => {
    if (endPoint) {
      get({ endPoint, options });
    }
  }, []);

  return { loading, responseData, post, get };
}
