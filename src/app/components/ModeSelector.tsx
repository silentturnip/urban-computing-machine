import { GameMode } from '../App';

interface ModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div
        onClick={() => onSelectMode('human-vs-ga')}
        className="bg-white rounded-lg shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-indigo-500"
      >
        <div className="text-6xl mb-4 text-center">🤖</div>
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-900">
          Режим 1: Человек против ИИ
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Вы задаете секретное 4-значное число, а генетический алгоритм пытается его разгадать!
        </p>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>✓ Наблюдайте процесс мышления ГА в реальном времени</li>
          <li>✓ Смотрите эволюцию поколений</li>
          <li>✓ Изучайте, как работают генетические алгоритмы</li>
          <li>✓ Доступен режим автоигры</li>
        </ul>
      </div>

      <div
        onClick={() => onSelectMode('human-guesses')}
        className="bg-white rounded-lg shadow-xl p-8 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-green-500"
      >
        <div className="text-6xl mb-4 text-center">🧠</div>
        <h2 className="text-2xl font-bold text-center mb-4 text-green-900">
          Режим 2: Человек отгадывает
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Компьютер загадывает секретное число, а вы пытаетесь его угадать!
        </p>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>✓ Классическая игра «Быки и коровы»</li>
          <li>✓ Мгновенная обратная связь на каждую попытку</li>
          <li>✓ Отслеживайте свои результаты</li>
          <li>✓ Бросьте себе вызов!</li>
        </ul>
      </div>
    </div>
  );
}