import React, { memo, useState } from "react";
import { log } from "../../log";

const ConfigureCounter = ({ onSetClick }) => {
  log("<ConfigureCounter /> 1");

  const [enteredNumber, setEnteredNumber] = useState(0);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEnteredNumber(+event.target.value);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button
        onClick={() => {
          onSetClick(enteredNumber);
          setEnteredNumber(0);
        }}
      >
        Set
      </button>
    </section>
  );
};

export default memo(ConfigureCounter);
