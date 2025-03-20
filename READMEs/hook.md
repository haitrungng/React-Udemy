# useState

mỗi lần set trong useState được gọi -> rendering lại trang được gọi

`WARNING`:

- NOT rcm: setIsEditing(!isEditing)
- HIGHLY rcm: setIsEditing(wasEditing => !wasEditing)

- explain:

  vì react is scheduling state updates
  nếu setIsEditing(true), sẽ trong 1 khoảng tgian tlai mới thực hiện -> có trg hợp lỗi
  nếu setIsEditing(wasEditing => !wasEditing), param là 1 function -> instantly

  trg hợp lỗi (isEditing = false)
  setIsEditing(!isEditing)
  setIsEditing(!isEditing) -> chưa kịp cập nhật, vẫn là false
  -> final res, isEditing = true -> error

# useRef

- useRef giúp giữ nguyên giá trị cũ khi component re-render

- Dùng để đọc thông tin trong input field, mở dialog bằng `showModal()`

```js
export default function Player() {
  const playerName = useRef("unknown entity");
  const [enteredName, setEnteredName] = useState(undefined);
  function handleOnClick() {
    setEnteredName(playerName.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {enteredName?.length ? enteredName : "Unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleOnClick}>Set Name</button>
      </p>
    </section>
  );
}
```

- Dùng để mở dialog bằng `showModal()`

```js
const ModalExample = () => {
  const dialogRef = useRef(null);

  const openModal = () => {
    dialogRef.current.showModal();
  };

  const closeModal = () => {
    dialogRef.current.close();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <dialog ref={dialogRef}>
        <h2>Modal Title</h2>
        <p>This is a modal content!</p>
        <button onClick={closeModal}>Close</button>
      </dialog>
    </div>
  );
};
```

- Dùng để lưu biến cần giữ nguyên khi component re-render (intervalId, setTimeOutId,...)

- REF tạo ra các instant khác nhau cho mỗi component, make sure that các instant sẽ k bị lost mỗi lần re-render

# useEffect

- thực hiện các side effects trong functional components. Side effects có thể là việc cập nhật DOM, gọi API, thay đổi dữ liệu, hoặc bất kỳ thao tác nào không phải là render.

```js
useEffect(() => {
  // Code thực thi side effect (gọi API, thay đổi state, v.v.)
  // Nếu trong code có các biến ở ngoài được sử dụng, remember to add to dependencies!!!!!

  // cleanUp func: khi component unmount hoặc trước khi chạy effect lần sau (khi các dependencies thay đổi).
  return callback_func();
}, [dependencies]);
```

- Sử dụng callback_func hiệu quả để tránh memory leaks hoặc các hành vi không mong muốn

# useCallback

- useCallback là một hook trong React giúp bạn ghi nhớ (memoize) các hàm để tránh việc tạo lại hàm trong mỗi lần render.

```js
const handleClick = useCallback(() => {
  //   callback func goes here
}, [dependencies]); // Chạy lại khi count thay đổi
```

- Khi nào nên sử dụng useCallback

1. Truyền hàm vào component con

- Nếu bạn truyền hàm vào component con và component con sử dụng `React.memo` (hoặc các component con chỉ render lại khi props thay đổi), thì useCallback sẽ giúp tránh việc component con không cần thiết render lại nếu hàm không thay đổi, `đặc biệt khi làm việc với các component phức tạp hoặc danh sách lớn`.

2. Tối ưu hóa hiệu suất

- Khi bạn có một hàm phức tạp hoặc một hàm không thay đổi trong suốt quá trình render, useCallback giúp ghi nhớ lại hàm đó thay vì tạo lại mỗi lần render, giúp tiết kiệm tài nguyên và tối ưu hóa hiệu suất.

## dependencies

-> `WARNING`:
nếu dependencies là 1 function | object -> mỗi lần component cha re-render, nó sẽ tạo ra 1 function mới ở vị trí khác trong bộ nhớ và khác với vị trí function ban đầu

# useContext

sử dụng cho API Context
