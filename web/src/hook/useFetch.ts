import react, { useState, useEffect } from "react";

export function useFetch<DataFormat>(
  url: string,
  options?: RequestInit,
  setStateCallback?: (data: DataFormat) => void
): boolean {
  const [loading, setLoding] = useState(false);
  const fetchData = async () => {
    try {
      const response = options ? await fetch(url, options) : await fetch(url);
      const { data }: { data: DataFormat } = await response.json();

      if (setStateCallback) {
        setStateCallback(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoding(true);
    setTimeout(() => {
      fetchData();
      setLoding(false);
    }, 2000);
  }, []);

  return loading;
}
