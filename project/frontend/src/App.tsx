import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GameAnalysis from "./components/GameAnalysis";
import Header from "./components/Header";
import ReportsPage from "./components/Reports";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/game/:gameId" element={<GameAnalysis />} />
          <Route path="/Reports" element={<ReportsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
