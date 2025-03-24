import React, { useEffect } from "react";
import Places from "./Places.jsx";
import { sortPlacesByDistance } from "../loc.js";
import ErrorPage from "./ErrorPage.jsx";
import { fetchAvailablePlaces } from "../http.js";
import useFetch from "../hooks/useFetch.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // const [places, setPlaces] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsFetching(true);
  //     try {
  //       const places = await fetchAvailablePlaces();
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         const sortedPlaces = sortPlacesByDistance(
  //           places,
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //         setPlaces(sortedPlaces);
  //         setIsFetching(false);
  //       });
  //     } catch (error) {
  //       setIsFetching(false);
  //       setError(error.message);
  //     }
  //   }

  //   fetchPlaces();
  // }, []);
  const {
    isFetching,
    fetchedData: places,
    error,
    setError,
    setFetchedData: setPlaces,
  } = useFetch(fetchAvailablePlaces, []);

  useEffect(() => {
    if (places) {
      console.log("DONE SORTING");
      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        setPlaces(sortedPlaces);
      });
    }
  }, []);

  if (error) {
    return (
      <ErrorPage
        title="Error"
        message={error}
        onConfirm={() => setError(null)}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={places}
      fallbackText={isFetching ? "Loading places..." : "No places found."}
      onSelectPlace={onSelectPlace}
    />
  );
}
