import TimelineCell from "./TimelineCell";

export default function TimelineBoard({ seasons, timeline }) {
  return (
    <section className="timeline-section">
      <div className="timeline-grid">
        {seasons.map((year) => (
          <TimelineCell key={year} entry={timeline[year]} />
        ))}
      </div>
    </section>
  );
}
