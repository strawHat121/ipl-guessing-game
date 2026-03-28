const teamDisplayMap = {
  CSK: { color: "#f9c80e", label: "CSK", name: "Chennai Super Kings" },
  DC: { color: "#2563eb", label: "DC", name: "Delhi Capitals" },
  DD: { color: "#1d4ed8", label: "DD", name: "Delhi Daredevils" },
  DEC: { color: "#0f766e", label: "DEC", name: "Deccan Chargers" },
  GL: { color: "#ea580c", label: "GL", name: "Gujarat Lions" },
  GT: { color: "#0f172a", label: "GT", name: "Gujarat Titans" },
  KKR: { color: "#4c1d95", label: "KKR", name: "Kolkata Knight Riders" },
  KTK: { color: "#15803d", label: "KTK", name: "Kochi Tuskers Kerala" },
  KXIP: { color: "#dc2626", label: "KXIP", name: "Kings XI Punjab" },
  LSG: { color: "#0ea5e9", label: "LSG", name: "Lucknow Super Giants" },
  MI: { color: "#2563eb", label: "MI", name: "Mumbai Indians" },
  "N/A": { color: "#94a3b8", label: "—", name: "No IPL team" },
  PBKS: { color: "#b91c1c", label: "PBKS", name: "Punjab Kings" },
  PW: { color: "#64748b", label: "PW", name: "Pune Warriors" },
  RCB: { color: "#991b1b", label: "RCB", name: "Royal Challengers Bengaluru" },
  RPS: { color: "#a16207", label: "RPS", name: "Rising Pune Supergiant" },
  RR: { color: "#ec4899", label: "RR", name: "Rajasthan Royals" },
  SRH: { color: "#f97316", label: "SRH", name: "Sunrisers Hyderabad" },
};

export function getTeamDisplay(teamCode) {
  return (
    teamDisplayMap[teamCode] ?? {
      color: "#475569",
      label: teamCode,
      name: teamCode,
    }
  );
}
