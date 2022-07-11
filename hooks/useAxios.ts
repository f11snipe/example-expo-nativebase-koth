import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const {
  REACT_APP_API_BASE_URL = 'http://localhost:8000/api'
} = process.env;


export const useAxios = <T>(route: string, method = 'GET', payload?: string) => {
  const [data, setData] = useState<T|null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());

  const cancel = () => {
    controllerRef.current.abort();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.request({
          data: payload,
          signal: controllerRef.current.signal,
          method,
          url: [REACT_APP_API_BASE_URL, route.replace(/^\/+/, '')].join('/'),
        });

        setData(response.data);
      } catch (error: any) {
        setError(error?.message || 'Unknown error');
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { cancel, data, error, loaded };
};