export default function GameResult({
  currentPlayer,
  gameStatus,
  guesses,
  onPlayAgain,
}) {
  if (gameStatus === "playing") {
    return null;
  }

  const won = gameStatus === "won";

  return (
    <section className={`result-card ${won ? "result-card-win" : "result-card-loss"}`}>
      <p className="result-title">{won ? "You got it." : "Round over."}</p>
      <h2>{currentPlayer.name}</h2>
      <p className="subtle-copy">
        {won
          ? `Solved in ${guesses.length} ${guesses.length === 1 ? "guess" : "guesses"}.`
          : "That was the mystery player for this round."}
      </p>
      <button className="play-again-button" onClick={onPlayAgain} type="button">
        Play another round
      </button>
    </section>
  );
}
