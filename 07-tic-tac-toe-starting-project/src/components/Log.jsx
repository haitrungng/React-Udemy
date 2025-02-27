export default function Log({ gameTurns, playerNames }) {
  return (
    <ol id="log">
      {gameTurns.map((turn) => (
        <li
          key={`${turn.square.row}-${turn.square.col}`}
          //   key={count--}
          // key={`${count++}`}
        >
          {`${playerNames[turn.player]} selected (${turn.square.row}, ${
            turn.square.col
          })`}
        </li>
      ))}
    </ol>
  );
}
