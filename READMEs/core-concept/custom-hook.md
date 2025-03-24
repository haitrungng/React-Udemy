# Custom hook

- tạo 1 folder trong src: hooks
- đặt tên: use<hookname> (ex: useFetch)

  - React sẽ xem đây là 1 hook và apply nó với các rules (phải khai trong main-block)

- check [the repo](../../17-form/)

```ts
// calling useFetch
const {
  isFetching,
  error: errorUpdatingPlaces,
  fetchedData: userPlaces,
  setFetchedData: setUserPlaces,
  setError: setErrorUpdatingPlaces,
} = useFetch(fetchUserPlaces, []);

// define useFetch
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
```
