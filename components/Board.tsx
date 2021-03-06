import { useState } from "react";
import styles from "../styles/Board.module.css";
import Square from "./Square";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [raccoonIsNext, setraccoonIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const nextPlayer = raccoonIsNext ? "🦝" : "🦊";

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = nextPlayer;
    setSquares(newSquares);
    setraccoonIsNext(!raccoonIsNext);
  }

  function renderSquare(i: number) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }
  const status = winner ? "Winner: " + winner : "Next player: " + nextPlayer;

  return (
    <div>
      <div className={styles.status}>{status}</div>
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
