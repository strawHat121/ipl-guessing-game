import { useEffect, useMemo, useRef, useState } from "react";
import rawPlayerHistory from "../player_team_history.json";
import GameHeader from "./components/GameHeader";
import GameResult from "./components/GameResult";
import GuessInput from "./components/GuessInput";
import GuessedPlayers from "./components/GuessedPlayers";
import TimelineBoard from "./components/TimelineBoard";
import {
  MAX_GUESSES,
  getRandomPlayer,
  normalizePlayers,
  seasonRange,
} from "./data/loadPlayers";

const STORAGE_KEY = "ipl-guessing-game-last-player";

export default function App() {
  const players = useMemo(() => normalizePlayers(rawPlayerHistory), []);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [guessInput, setGuessInput] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");
  const inputRef = useRef(null);

  useEffect(() => {
    const lastPlayer = window.sessionStorage.getItem(STORAGE_KEY);
    setCurrentPlayer(getRandomPlayer(players, lastPlayer));
  }, [players]);

  const guessedNames = useMemo(() => new Set(guesses), [guesses]);
  const suggestions = useMemo(() => {
    const query = guessInput.trim().toLowerCase();

    if (!query || gameStatus !== "playing") {
      return [];
    }

    return players
      .filter((player) => !guessedNames.has(player.name))
      .filter((player) => player.name.toLowerCase().includes(query))
      .slice(0, 8);
  }, [gameStatus, guessInput, guessedNames, players]);

  const attemptsUsed = guesses.length;
  const attemptsLeft = MAX_GUESSES - attemptsUsed;

  function resetRound() {
    const nextPlayer = getRandomPlayer(players, currentPlayer?.name ?? null);

    window.sessionStorage.setItem(STORAGE_KEY, nextPlayer.name);
    setCurrentPlayer(nextPlayer);
    setGuessInput("");
    setGuesses([]);
    setGameStatus("playing");
    inputRef.current?.focus();
  }

  function handleGuessSubmit(name) {
    if (!currentPlayer || gameStatus !== "playing") {
      return { ok: false, reason: "Game not ready." };
    }

    const normalizedName = name.trim();

    if (!normalizedName) {
      return { ok: false, reason: "Choose a player name first." };
    }

    const matchedPlayer = players.find(
      (player) => player.name.toLowerCase() === normalizedName.toLowerCase(),
    );

    if (!matchedPlayer) {
      return { ok: false, reason: "Pick a valid player from the list." };
    }

    if (guessedNames.has(matchedPlayer.name)) {
      return { ok: false, reason: "You already guessed that player." };
    }

    const nextGuesses = [...guesses, matchedPlayer.name];
    setGuesses(nextGuesses);
    setGuessInput("");

    if (matchedPlayer.name === currentPlayer.name) {
      setGameStatus("won");
      return { ok: true };
    }

    if (nextGuesses.length >= MAX_GUESSES) {
      setGameStatus("lost");
      return { ok: true };
    }

    return { ok: true };
  }

  if (!currentPlayer) {
    return <main className="app-shell">Loading players...</main>;
  }

  return (
    <main className="app-shell">
      <section className="game-card">
        <GameHeader attemptsLeft={attemptsLeft} />
        <TimelineBoard seasons={seasonRange} timeline={currentPlayer.timeline} />
        <GuessInput
          guessedNames={guesses}
          inputRef={inputRef}
          isDisabled={gameStatus !== "playing"}
          onInputChange={setGuessInput}
          onSubmit={handleGuessSubmit}
          suggestions={suggestions}
          value={guessInput}
        />
        <GuessedPlayers guessedNames={guesses} />
        <GameResult
          currentPlayer={currentPlayer}
          gameStatus={gameStatus}
          guesses={guesses}
          onPlayAgain={resetRound}
        />
      </section>
    </main>
  );
}
