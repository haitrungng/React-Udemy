import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const incrementHandler = () => dispatch(counterActions.increment());
  const decrementHandler = () => dispatch(counterActions.decrement());
  const increaseByValueHandler = (num) =>
    dispatch(counterActions.increaseByValue(num));

  const toggleCounterHandler = () => dispatch(counterActions.toggleCounter());
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {counter.showCounter && (
        <div className={classes.value}>{counter.counter}</div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={() => increaseByValueHandler(5)}>
          Increment by 5
        </button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
