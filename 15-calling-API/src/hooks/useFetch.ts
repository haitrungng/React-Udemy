import { useEffect, useState } from "react";

type FetchData = () => Promise<any>;

function useFetch(fetchFunc: FetchData, initDataValue: any = []) {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState(initDataValue);
  const [error, setError] = useState<null | { message: string }>(null);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFunc();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Fail to fetch data" });
      }
      setIsFetching(false);
    }
    fetchData();
  }, [fetchFunc]);

  return { isFetching, fetchedData, error, setFetchedData, setError };
}

export default useFetch;
