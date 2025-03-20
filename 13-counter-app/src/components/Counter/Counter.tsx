import { useState, useCallback, useMemo } from "react";
import React from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import isPrime from "../../utils.js";
import CounterHistory from "./CounterHistory.jsx";

type CounterChangedType = {
  value: number;
  id: number;
};

function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanged, setCounterChanged] = useState<CounterChangedType[]>([
    {
      value: initialCount,
      id: Math.random() * 1000,
    },
  ]);

  const counter = counterChanged.reduce((acc, cur) => acc + cur.value, 0);

  const handleDecrement = useCallback(
    () =>
      setCounterChanged((prevCounter: CounterChangedType[]) => [
        {
          value: -1,
          id: Math.random() * 1000,
        },
        ...prevCounter,
      ]),
    []
  );
  const handleIncrement = useCallback(
    () =>
      setCounterChanged((prevCounter: CounterChangedType[]) => [
        {
          value: 1,
          id: Math.random() * 1000,
        },
        ...prevCounter,
      ]),
    []
  );

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        {/* MinusIcon wont change when Counter re-render, cause it's imported from other file */}
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanged} />
    </section>
  );
}

export default Counter;
