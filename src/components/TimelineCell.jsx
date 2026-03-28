import { getTeamDisplay } from "../data/teamDisplayMap";

export default function TimelineCell({ entry }) {
  const teamDisplay = getTeamDisplay(entry.team);

  return (
    <article className="timeline-cell">
      <span className="year-label">{entry.year}</span>
      <div
        className={`team-tile${entry.team === "N/A" ? " team-tile-empty" : ""}`}
        style={
          entry.team === "N/A"
            ? undefined
            : {
                "--tile-accent": teamDisplay.color,
              }
        }
      >
        {teamDisplay.label}
      </div>
      <span className="team-name">{teamDisplay.name}</span>
    </article>
  );
}
