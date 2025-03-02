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
}
