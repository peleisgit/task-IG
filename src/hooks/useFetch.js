import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    axios
      .get(url, {
        headers: {
          "x-apikey": "edf2a6114dde6136eb7db095302e37415c606",
        },
        cancelToken: source.token,
      })
      .then((res) => {
        setLoading(false);
        res.data.content && setData(res.data.content);
        res.content && setData(res.content);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, loading, error };
};
