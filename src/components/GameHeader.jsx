export default function GameHeader({ attemptsLeft }) {
  return (
    <header className="game-header">
      <div>
        <p className="eyebrow">IPL Journey Guess</p>
        <h1>Guess the player from their IPL team history</h1>
        <p className="subtle-copy">
          One mystery player. Eighteen seasons. Five tries.
        </p>
      </div>
      <div className="attempts-pill">
        <span>Guesses left</span>
        <strong>{attemptsLeft}</strong>
      </div>
    </header>
  );
}
