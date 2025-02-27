import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const INIT_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayer(gameLogs) {
  let currPlayer = "X";

  if (gameLogs.length > 0 && gameLogs[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function deriveCheckWinner(gameBoard) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].column];
    const second = gameBoard[combination[1].row][combination[1].column];
    const third = gameBoard[combination[2].row][combination[2].column];
    if (first && first === second && first === third) {
      winner = first;
      break;
    }
  }
  return winner;
}

function deriveCheckDraw(gameBoard) {
  if (gameBoard.every((row) => row.every((cell) => cell != null))) return true;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = structuredClone(INIT_GAME_BOARD);
  for (const log of gameTurns) {
    const { square, player } = log;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveCheckWinner(gameBoard);
  let draw = deriveCheckDraw(gameBoard);

  function handleSelectSquare(rowIdx, colIdx) {
    setGameTurns((prevTurns) => {
      let currPlayer = deriveActivePlayer(prevTurns);
      return [
        { square: { row: rowIdx, col: colIdx }, player: currPlayer },
        ...prevTurns,
      ];
    });
  }
  function restartGame() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            isActive={activePlayer == "X"}
            onSetName={setPlayerNames}
            playerNames={playerNames}
          />
          <Player
            symbol="O"
            isActive={activePlayer == "O"}
            onSetName={setPlayerNames}
            playerNames={playerNames}
          />
        </ol>
        {(winner || draw) && (
          <GameOver
            winner={winner}
            onRestartGame={restartGame}
            playerNames={playerNames}
          />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} playerNames={playerNames} />
    </main>
  );
}

export default App;
