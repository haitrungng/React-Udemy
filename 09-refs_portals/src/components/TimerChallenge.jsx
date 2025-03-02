import { useState, useRef } from "react";
import ResultModal from "./ResusltModal";

//   let timeoutId;
//  timeoutId sẽ được share với tất cả các component TimerChallenge khác nhau
export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimerRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const timeoutId = useRef();
  const dialog = useRef();
  const percentScore = Math.round(
    (targetTime * 1000 - timeRemaining) / (targetTime * 10)
  );

  function handleStart() {
    timeoutId.current = setInterval(() => {
      setTimerRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timeoutId.current);
          dialog.current.showModal();
          return prev;
        }
        return prev - 10;
      });
    }, 10);
  }

  function handleStop() {
    dialog.current.showModal();
    clearInterval(timeoutId.current);
  }

  function handleReset() {
    setTimerRemaining(targetTime * 1000);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
        score={percentScore}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={`${timerIsActive ? "active" : ""}`}>
          {timerIsActive ? "Time is running" : "Time inactive"}
        </p>
      </section>
    </>
  );
}
