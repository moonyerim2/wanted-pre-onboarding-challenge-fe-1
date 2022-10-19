import { useState, useEffect } from "react";
import { Method, UseFetchParams, PostParams, GetParams } from "../type";

export function useFetch({ baseUrl, options, endPoint }: UseFetchParams) {
  const [responseData, setResponseData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchData = (url: string, method: Method, options?: RequestInit) => {
    try {
      setLoading(true);

      setTimeout(async () => {
        const response = options
          ? await fetch(url, { ...options, method })
          : await fetch(url);
        const { data } = await response.json();
        setResponseData(data);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const createUrl = (endPoint: string) => `${baseUrl}${endPoint}`;

  const post = ({ endPoint, options }: PostParams) => {
    const method: Method = "POST";
    const url = createUrl(endPoint);
    fetchData(url, method, options);
    return responseData;
  };

  const get = ({ endPoint, options }: GetParams) => {
    const method: Method = "GET";
    const url = createUrl(endPoint);
    if (options) {
      fetchData(url, method, options);
    } else {
      fetchData(url, method);
    }
    return responseData;
  };

  useEffect(() => {
    if (endPoint) {
      get({ endPoint, options });
    }
  }, []);

  return { loading, responseData, post, get };
}
