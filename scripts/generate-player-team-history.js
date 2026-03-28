const fs = require('fs');
const path = require('path');

const START_YEAR = 2008;
const END_YEAR = 2025;
const INPUT_DIR = path.join(__dirname, '..', 'ipl_json');
const OUTPUT_FILE = path.join(__dirname, '..', 'player_team_history.json');

const TEAM_CODE_MAP = {
  'Chennai Super Kings': 'CSK',
  'Deccan Chargers': 'DEC',
  'Delhi Capitals': 'DC',
  'Delhi Daredevils': 'DD',
  'Gujarat Lions': 'GL',
  'Gujarat Titans': 'GT',
  'Kings XI Punjab': 'KXIP',
  'Kochi Tuskers Kerala': 'KTK',
  'Kolkata Knight Riders': 'KKR',
  'Lucknow Super Giants': 'LSG',
  'Mumbai Indians': 'MI',
  'Punjab Kings': 'PBKS',
  'Pune Warriors': 'PW',
  'Rajasthan Royals': 'RR',
  'Rising Pune Supergiant': 'RPS',
  'Rising Pune Supergiants': 'RPS',
  'Royal Challengers Bangalore': 'RCB',
  'Royal Challengers Bengaluru': 'RCB',
  'Sunrisers Hyderabad': 'SRH',
};

function createYearBuckets() {
  const years = {};
  for (let year = START_YEAR; year <= END_YEAR; year += 1) {
    years[String(year)] = new Set();
  }
  return years;
}

function collapseYearBuckets(yearBuckets) {
  return Object.fromEntries(
    Object.entries(yearBuckets).map(([year, teams]) => {
      if (teams.size === 0) {
        return [year, 'N/A'];
      }

      return [year, [...teams].sort().join('/')];
    })
  );
}

function getSeasonYear(match) {
  const date = match?.info?.dates?.[0];
  if (!date) {
    return null;
  }

  const year = Number.parseInt(String(date).slice(0, 4), 10);
  if (Number.isNaN(year) || year < START_YEAR || year > END_YEAR) {
    return null;
  }

  return String(year);
}

function getTeamCode(teamName) {
  return TEAM_CODE_MAP[teamName] || teamName;
}

function getPlayerEntityKey(playerName, playerId) {
  return playerId ? `id:${playerId}` : `name:${playerName}`;
}

function main() {
  const files = fs
    .readdirSync(INPUT_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort();

  const playerEntities = new Map();

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const match = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const seasonYear = getSeasonYear(match);
    const teams = match?.info?.players || {};
    const registry = match?.info?.registry?.people || {};

    if (!seasonYear) {
      continue;
    }

    for (const [teamName, players] of Object.entries(teams)) {
      const teamCode = getTeamCode(teamName);

      for (const playerName of players) {
        const playerId = registry[playerName] || null;
        const entityKey = getPlayerEntityKey(playerName, playerId);

        if (!playerEntities.has(entityKey)) {
          playerEntities.set(entityKey, {
            id: playerId,
            name: playerName,
            years: createYearBuckets(),
          });
        }

        playerEntities.get(entityKey).years[seasonYear].add(teamCode);
      }
    }
  }

  const nameCounts = new Map();
  for (const entity of playerEntities.values()) {
    nameCounts.set(entity.name, (nameCounts.get(entity.name) || 0) + 1);
  }

  const output = {};
  for (const entity of playerEntities.values()) {
    const isAmbiguousName = (nameCounts.get(entity.name) || 0) > 1;
    const outputKey = isAmbiguousName && entity.id ? `${entity.name} [${entity.id}]` : entity.name;
    output[outputKey] = collapseYearBuckets(entity.years);
  }

  const sortedOutput = Object.fromEntries(
    Object.entries(output).sort(([playerA], [playerB]) => playerA.localeCompare(playerB))
  );

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(sortedOutput, null, 2)}\n`);

  console.log(`Wrote ${Object.keys(sortedOutput).length} players to ${OUTPUT_FILE}`);
}

main();
