import { useEffect, useState } from "react";

export default function GuessInput({
  guessedNames,
  inputRef,
  isDisabled,
  onInputChange,
  onSubmit,
  suggestions,
  value,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setActiveIndex(0);
  }, [suggestions, value]);

  function handleSubmit(nextValue) {
    const result = onSubmit(nextValue);

    if (!result.ok) {
      setMessage(result.reason);
      return;
    }

    setMessage("");
    setActiveIndex(0);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        suggestions.length === 0 ? 0 : (currentIndex + 1) % suggestions.length,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        suggestions.length === 0
          ? 0
          : (currentIndex - 1 + suggestions.length) % suggestions.length,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selectedSuggestion = suggestions[activeIndex];
      handleSubmit(selectedSuggestion ? selectedSuggestion.name : value);
    }
  }

  return (
    <section className="guess-panel">
      <div className="guess-input-row">
        <div className="guess-input-wrap">
          <input
            ref={inputRef}
            autoComplete="off"
            className="guess-input"
            disabled={isDisabled}
            onChange={(event) => {
              onInputChange(event.target.value);
              setMessage("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="Start typing a player name..."
            value={value}
          />
          {suggestions.length > 0 ? (
            <div className="suggestions-panel">
              {suggestions.map((player, index) => (
                <button
                  key={player.name}
                  className={`suggestion-item${index === activeIndex ? " suggestion-item-active" : ""
                    }`}
                  onClick={() => handleSubmit(player.name)}
                  type="button"
                >
                  {player.name}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button
          className="submit-button"
          disabled={isDisabled}
          onClick={() => handleSubmit(value)}
          type="button"
        >
          Guess
        </button>
      </div>
      <div className="guess-meta">
        {message ? <p className="error-text">{message}</p> : null}
      </div>
    </section>
  );
}
