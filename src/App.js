import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importing router-related functions
import GameApp from "./components/GameApp";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<GameApp />} />
          </Routes>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;
