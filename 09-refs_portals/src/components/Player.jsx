import { useRef, useState } from "react";

export default function Player() {
  const playerName = useRef("unknown entity");
  const [enteredName, setEnteredName] = useState(undefined);
  function handleOnClick() {
    setEnteredName(playerName.current.value);
    playerName.current.value = "";
  }
  console.log("Player rendered");
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
