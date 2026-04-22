import { useState } from 'react';

export function EducationalPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-2xl font-bold text-indigo-900">
          📚 Как работают генетические алгоритмы
        </h2>
        <span className="text-2xl">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-6 space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-600">
              <strong>Генетический алгоритм (ГА)</strong> — это метод оптимизации, вдохновленный естественной эволюцией.
              Эта игра демонстрирует, как ГА решает головоломку «Быки и коровы» через эволюционные принципы.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🧬</span> 1. Представление
              </h3>
              <p className="text-sm text-gray-700">
                Каждая <strong>особь (хромосома)</strong> — это 4-значная последовательность уникальных цифр.
                Пример: [5, 2, 8, 1] представляет попытку «5281».
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🎯</span> 2. Функция приспособленности
              </h3>
              <p className="text-sm text-gray-700">
                Приспособленность = количество предыдущих попыток, с которыми особь <strong>согласована</strong>.
                Если попытка «1234» даст те же быки/коровы, что и реальная обратная связь, она согласована.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🏆</span> 3. Селекция
              </h3>
              <p className="text-sm text-gray-700">
                <strong>Турнирная селекция:</strong> случайно выбираем 5 особей, берем самую приспособленную.
                Лучшие особи имеют больше шансов стать родителями.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🔀</span> 4. Скрещивание
              </h3>
              <p className="text-sm text-gray-700">
                Объединяем двух родителей в случайной точке. Пример: родитель1=[5,2,8,1], родитель2=[3,7,4,0] →
                потомок=[5,2,4,0] (берем первую половину от родителя1, вторую от родителя2, исправляя дубликаты).
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-900 mb-2 flex items-center gap-2">
                <span className="text-xl">⚡</span> 5. Мутация
              </h3>
              <p className="text-sm text-gray-700">
                С вероятностью 15% меняем местами две случайные позиции в потомке.
                Это вносит разнообразие и предотвращает преждевременную сходимость.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <span className="text-xl">⭐</span> 6. Элитизм
              </h3>
              <p className="text-sm text-gray-700">
                Сохраняем топ 10% лучших особей без изменений в следующем поколении.
                Это гарантирует, что хорошие решения не будут потеряны в процессе эволюции.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border-2 border-indigo-200">
            <h3 className="font-bold text-indigo-900 mb-2">🔄 Цикл эволюции</h3>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Генерируем начальную случайную популяцию (100 особей)</li>
              <li>Оцениваем приспособленность каждой особи</li>
              <li>Выбираем родителей с помощью турнирной селекции</li>
              <li>Создаем потомков через скрещивание</li>
              <li>Применяем мутацию к потомкам</li>
              <li>Сохраняем элитных особей</li>
              <li>Повторяем до нахождения полностью согласованного решения (или 100 поколений)</li>
              <li>Используем лучшую особь как следующую попытку</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">🎓 Почему это работает для «Быков и коров»</h3>
            <p className="text-sm text-gray-700 mb-2">
              ГА не знает секретное число, но учится на обратной связи. После каждой попытки:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside ml-4">
              <li>Популяция эволюционирует в сторону попыток, согласованных со всей предыдущей обратной связью</li>
              <li>Несогласованные попытки устраняются через селекционное давление</li>
              <li>Скрещивание объединяет хорошие частичные решения</li>
              <li>Мутация исследует новые возможности</li>
              <li>В конечном итоге только правильный ответ остается полностью согласованным!</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
