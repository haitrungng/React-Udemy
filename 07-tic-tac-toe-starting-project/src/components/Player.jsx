import { useState } from "react";

export default function Player({ symbol, isActive, onSetName, playerNames }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(playerNames[symbol]);

  function setNewName(newName) {
    if (!newName) {
      newName = symbol === "X" ? "Player 1" : "Player 2";
    }
    console.log("newName", newName);
    setUserName(newName);
    onSetName({ ...playerNames, [symbol]: newName });
  }

  let playerNameUI;
  if (isEditing) {
    playerNameUI = (
      <input
        type="text"
        defaultValue={userName}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setNewName(e.target.value);
            setIsEditing(false);
          }
        }}
        onBlur={(e) => {
          setNewName(e.target.value);
          setIsEditing(false);
        }}
      />
    );
  } else playerNameUI = <span className="player-name">{userName}</span>;
  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerNameUI}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => setIsEditing(true)}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
