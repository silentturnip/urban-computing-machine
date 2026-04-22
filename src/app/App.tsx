import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { ModeSelector } from './components/ModeSelector';
import { EducationalPanel } from './components/EducationalPanel';
import { AboutPanel } from './components/AboutPanel';

export type GameMode = 'human-vs-ga' | 'human-guesses';

export interface GuessResult {
  guess: string;
  bulls: number;
  cows: number;
  turn: number;
  generation?: number;
}

function App() {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [gameId, setGameId] = useState(0);

  const handleModeSelect = (selectedMode: GameMode) => {
    setMode(selectedMode);
    setGameStarted(false);
    setShowAbout(false);
  };

  const handleNewGame = () => {
    setGameStarted(false);
    setMode(null);
    // При каждом выходе в меню увеличиваем ID. 
    // Это заставит React полностью пересоздать компонент GameBoard,
    // что гарантирует сброс загаданного числа.
    setGameId(prev => prev + 1);
  };

  const handleRestartSession = () => {
    setGameStarted(false);
    setGameId(prev => prev + 1); // Обнуляем текущую игру, не выходя в меню
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-900 mb-2">🐂 Быки и Коровы 🐄</h1>
          <button onClick={() => setShowAbout(!showAbout)} className="text-indigo-600 underline">
            {showAbout ? 'Вернуться к игре' : 'Об игре'}
          </button>
        </header>

        {showAbout ? (
          <AboutPanel />
        ) : !mode ? (
          <ModeSelector onSelectMode={handleModeSelect} />
        ) : (
          <>
            <button onClick={handleNewGame} className="mb-4 px-4 py-2 bg-gray-600 text-white rounded">
              ← В меню
            </button>
            <GameBoard
              key={gameId} // ЭТОТ КЛЮЧ РЕШАЕТ ВСЕ ПРОБЛЕМЫ СО СБРОСОМ
              mode={mode}
              gameStarted={gameStarted}
              onGameStart={() => setGameStarted(true)}
              onRestart={handleRestartSession}
            />
          </>
        )}
        {!showAbout && <EducationalPanel />}
      </div>
    </div>
  );
}

export default App;