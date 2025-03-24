import { useRef, useState, useCallback, useEffect } from "react";
import React from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
// @ts-ignore
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";

import { updateUserPlaces, fetchUserPlaces } from "./http.js";
import ErrorPage from "./components/ErrorPage.jsx";

import useFetch from "./hooks/useFetch.ts";

type Place = {
  id: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  lat: number;
  lon: number;
};

function App() {
  const selectedPlace = useRef<Place>();

  // const [isFetching, setIsFetching] = useState(false);
  // const [userPlaces, setUserPlaces] = useState([]);
  // const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect(() => {
  //   async function fetchUserPlacesData() {
  //     setIsFetching(true);
  //     try {
  //       const places = await fetchUserPlaces();
  //       setUserPlaces(places);
  //     } catch (error) {
  //       setErrorUpdatingPlaces(
  //         "Fail to fetch selected places" || error.message
  //       );
  //     }
  //     setIsFetching(false);
  //   }
  //   fetchUserPlacesData();
  // }, []);

  const {
    isFetching,
    error: errorUpdatingPlaces,
    fetchedData: userPlaces,
    setFetchedData: setUserPlaces,
    setError: setErrorUpdatingPlaces,
  } = useFetch(fetchUserPlaces, []);

  function handleStartRemovePlace(place: Place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: Place) {
    setUserPlaces((prevPickedPlaces: Place[]) => {
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setErrorUpdatingPlaces({
        message: error.message || "Fail to update selected places",
      });
      setUserPlaces(userPlaces);
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces: Place[]) => {
        return prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current?.id
        );
      });
      setModalIsOpen(false);
      try {
        await updateUserPlaces(
          userPlaces.filter(
            (place: Place) => place.id !== selectedPlace.current?.id
          )
        );
      } catch (error) {
        setErrorUpdatingPlaces(error.message);
        setUserPlaces(userPlaces);
      }
    },
    [userPlaces]
  );

  return (
    <>
      <Modal
        open={errorUpdatingPlaces}
        onClose={() => setErrorUpdatingPlaces(null)}
      >
        {errorUpdatingPlaces && (
          <ErrorPage
            title="Error happened :'("
            message={errorUpdatingPlaces.message}
            onConfirm={() => setErrorUpdatingPlaces(null)}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={
            isFetching
              ? "Loading selected places..."
              : "Select the places you would like to visit below."
          }
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
