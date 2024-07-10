import { useState } from "react";

import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import Gameover from "./components/Gameover";
import { WINNING_COMBINATIONS } from "../winning-combinations";

let initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function findActivePlayer(turns) {
  let currentSymble = "X";
  if (turns.length > 0 && turns[0].squareSymbol === "X") {
    currentSymble = "O";
  }
  return currentSymble;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);

  function handleActivePlayer(rowIndex, colIndex) {
    setGameTurns((preTurns) => {
      let currentSymble = findActivePlayer(gameTurns);
      const newTurn = [
        {
          square: { row: rowIndex, col: colIndex },
          squareSymbol: currentSymble,
        },
        ...preTurns,
      ];
      return newTurn;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  let gameBoard = [...initialGame.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, squareSymbol } = turn;
    const { row, col } = square;
    gameBoard[row][col] = squareSymbol;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    let firstSquareSymble =
      gameBoard[combination[0].row][combination[0].column];
    let secondSquareSymble =
      gameBoard[combination[1].row][combination[1].column];
    let thirdSquareSymble =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymble &&
      firstSquareSymble === secondSquareSymble &&
      firstSquareSymble === thirdSquareSymble
    ) {
      winner = firstSquareSymble;
    }
  }

  let isDraw = gameTurns.length === 9 && !winner;
  let activePlayer = findActivePlayer(gameTurns);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            player_name="Player 1"
            player_icon="X"
            isActive={activePlayer === "X"}
          />
          <Player
            player_name="Player 2"
            player_icon="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || isDraw) && (
          <Gameover end={winner} onRestart={handleRestart} />
        )}
        <Gameboard selectActive={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
