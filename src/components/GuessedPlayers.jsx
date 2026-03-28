export default function GuessedPlayers({ guessedNames }) {
    if (guessedNames.length === 0) {
        return null;
    }

    return (
        <section className="guessed-players-section">
            <p className="guessed-players-title">Your Guesses</p>
            <div className="guessed-players-list">
                {guessedNames.map((name) => (
                    <div key={name} className="guessed-player-item">
                        {name}
                    </div>
                ))}
            </div>
        </section>
    );
}
