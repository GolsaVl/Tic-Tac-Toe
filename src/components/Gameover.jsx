export default function Gameover({ end, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      {end && <p>{end} won!</p>}
      {!end && <p>It's Draw!</p>}
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
