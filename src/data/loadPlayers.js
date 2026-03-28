export const START_SEASON = 2008;
export const END_SEASON = 2025;
export const MIN_ACTIVE_SEASONS = 6;
export const MAX_GUESSES = 5;
export const seasonRange = Array.from(
  { length: END_SEASON - START_SEASON + 1 },
  (_, index) => START_SEASON + index,
);

export function normalizePlayers(rawPlayerHistory) {
  return Object.entries(rawPlayerHistory)
    .map(([name, seasons]) => {
      const timelineEntries = seasonRange.map((year) => ({
        year,
        team: seasons[String(year)] ?? "N/A",
      }));

      const activeSeasons = timelineEntries.filter(
        (entry) => entry.team !== "N/A",
      ).length;

      return {
        name,
        activeSeasons,
        timeline: Object.fromEntries(
          timelineEntries.map((entry) => [entry.year, entry]),
        ),
      };
    })
    .filter((player) => player.activeSeasons >= MIN_ACTIVE_SEASONS)
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function getRandomPlayer(players, excludedName) {
  const pool =
    players.length > 1
      ? players.filter((player) => player.name !== excludedName)
      : players;

  return pool[Math.floor(Math.random() * pool.length)];
}
