import { useEffect } from "react";
import { useState } from "react";

function useFetch(initValue, url: string, errorMessage: string) {
  const [data, setData] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(errorMessage);
        }

        setData(data);
      } catch (err) {
        setError({ message: errorMessage });
      }
      setIsLoading(false);
    }
    fetchMeals();
  }, []);

  return { data, isLoading, error, setData, setError };
}

export default useFetch;
