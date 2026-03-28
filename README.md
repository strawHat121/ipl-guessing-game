# IPL Guessing Game

A fun, interactive Wordle-style guessing game where you need to identify IPL (Indian Premier League) players based on their team history across seasons.

## 🎮 How to Play

1. A random IPL player's team history is displayed as a timeline
2. Guess the player by typing their name into the search field
3. You have limited guesses to figure out who the player is
4. Once you guess correctly (or run out of guesses), you can play another round
5. Your guessed players are displayed in a list for reference

## ✨ Features

- **Interactive Timeline**: View which teams a mystery player has been part of over the years
- **Smart Search**: Real-time autocomplete suggestions as you type player names
- **Guess Tracking**: See all your previous guesses in a organized list
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Session Persistence**: Your current player and streak are saved during your session

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ipl-guessing-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5174` (or the next available port)

## 📦 Build for Production

To build the app for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🔄 Data Management

### Generate Player Team History

If you need to regenerate the player team history data from the JSON files:

```bash
npm run generate:player-team-history
```

This script reads all JSON files from the `ipl_json/` directory and generates the `player_team_history.json` file.

## 📁 Project Structure

```
ipl-guessing-game/
├── src/
│   ├── components/
│   │   ├── GameHeader.jsx          # Header with attempts display
│   │   ├── GameResult.jsx          # Win/loss screen
│   │   ├── GuessInput.jsx          # Input field with suggestions
│   │   ├── GuessedPlayers.jsx      # List of guessed players
│   │   ├── TimelineBoard.jsx       # Timeline grid wrapper
│   │   └── TimelineCell.jsx        # Individual year/team card
│   ├── data/
│   │   ├── loadPlayers.js          # Player data utilities
│   │   └── teamDisplayMap.js       # Team color and label mapping
│   ├── styles/
│   │   └── app.css                 # Main styles with responsive design
│   ├── App.jsx                     # Main app component
│   └── main.jsx                    # React entry point
├── ipl_json/                       # Raw IPL match data (JSON files)
├── scripts/
│   └── generate-player-team-history.js  # Data generation script
├── player_team_history.json        # Generated player data
├── index.html                      # HTML entry point
├── vite.config.mjs                 # Vite configuration
└── package.json                    # Project dependencies
```

## 🎨 UI/UX Highlights

- **Linear Timeline**: Compact, scrollable year-by-year team history
- **Mobile-Friendly**: Optimized for all screen sizes (380px and up)
- **Accessible Buttons**: Touch-friendly with 48px minimum tap targets
- **Visual Feedback**: Color-coded team tiles for easy identification
- **Error Messages**: Clear feedback on invalid guesses

## 🛠 Technologies Used

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **Vanilla CSS** - Styling with mobile-first responsive design
- **Node.js** - Runtime for data generation scripts

## 📝 Game Configuration

You can customize the game difficulty by modifying the `MAX_GUESSES` constant in `src/data/loadPlayers.js`.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is licensed under the ISC License.

## 🎯 Future Enhancements

- [ ] Difficulty levels (easy/hard)
- [ ] Daily challenge modes
- [ ] Player statistics and achievements
- [ ] Leaderboard integration
- [ ] Share your results functionality
- [ ] Hint system
