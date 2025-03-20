## <input>

```js
// nếu dùng value t
<input
  type="text"
  defaultValue={userName}
  // error for value, bởi sẽ tự động ghi đè, nên sẽ sử dụng defaultValue (initial value)
  // value = {userName}
/>
```

## <dialog>

- Dùng để pop up 1 card,

```js
const Modal = ({ children, isOpen, onClose }) => {
  const dialog = useRef();
  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  // children chứa btn để close dialog
  // onClose={onClose} -> handle trường hợp tắt bằng Esc
  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {isOpen && children}
    </dialog>,
    document.getElementById("modal")
  );
};
```

## <progress> - Thanh thể hiện thời gian

```js
return <progress max={TIMER} value={remainingTime} />;
```
