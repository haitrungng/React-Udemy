# React Portals (09-refs_portals -> ResultModal)

Nên sử dụng khi xuất hiện dialog

manipulate DOM tree

```js
import { createPortal } from "react-dom";
export default function ResultModal({
  ref,
  remainingTime,
  targetTime,
  onReset,
  score,
}) {
  return createPortal(
    <dialog ref={ref} className="result-modal" onClose={onReset}>
      {remainingTime <= 0 ? <h2>You lost</h2> : <h2>Your score: {score}%</h2>}
      <p>
        The target time was <strong>{targetTime}</strong> seconds
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{(remainingTime / 1000).toFixed(2)} seconds left</strong>
      </p>
      <form action="" method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );

  //   modal trong file index.html
  <!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Elegant Context</title>
  </head>
  <body>
  // portal show up here
    <div id="modal"></div>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
}
```
