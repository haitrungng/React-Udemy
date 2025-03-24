# Fetch API

- fetch không ném lỗi (throw an error) nếu server trả về mã lỗi HTTP (ví dụ: 404, 500). fetch chỉ ném lỗi khi có vấn đề về mạng hoặc yêu cầu không thành công (ví dụ: server không phản hồi). Điều này có nghĩa là nếu server trả về mã lỗi HTTP, như 404 hoặc 500, fetch sẽ không ném lỗi, mà bạn vẫn phải kiểm tra response.ok để xác định nếu có lỗi trong quá trình lấy dữ liệu từ server.

```js
export default function AvailablePlaces({ onSelectPlace }) {
  const [places, setPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/placesss");
        const resData = await response.json();

        // response.ok is true for status 200-299
        // response.ok is false for status 400-599
        if (response.ok) {
          setPlaces(resData.places);
        }
      } catch (error) {
        setError(error.message);
      }

      setIsFetching(false);
    }

    fetchPlaces();

    // fetch("http://localhost:3000/places")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Setting places:", data);
    //     setPlaces(data.places);
    //   });
  }, []);

  if (error) {
    return <ErrorPage title="Error" message={error} />;
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
```

```js
// GET method - default
const response = await fetch("http://localhost:3000/user-places");

// Define put/post/delete method
const res = await fetch("http://localhost:3000/user-places", {
  method: "PUT",
  body: JSON.stringify({ places }),
  headers: {
    "Content-Type": "application/json",
  },
});
```
