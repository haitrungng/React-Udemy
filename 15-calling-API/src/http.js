export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();
  // response.ok is true for status 200-299
  // response.ok is false for status 400-599
  if (!response.ok) {
    console.log("Response error:", resData.message);
    throw new Error(resData.message);
  }

  return resData.places;
}

export async function updateUserPlaces(places) {
  const res = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await res.json();

  if (!res.ok) {
    console.log("Response error:", resData.message);
    throw new Error(resData.message);
  }

  return resData.message;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const resData = await response.json();
  if (!response.ok) {
    console.log("Response error:", resData.message);
    throw new Error(resData.message);
  }

  return resData.places;
}
