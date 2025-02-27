export default function GameOver({ winner, onRestartGame, playerNames }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner ? `${playerNames[winner]} won!` : `It's a draw!`}</p>
      <p>
        <button onClick={onRestartGame}>Rematch!</button>
      </p>
    </div>
  );
}
