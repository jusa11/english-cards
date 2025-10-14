import CardManager from '../utils/CardManager';
import commonWords from '../data/words/common.json';
import reactWords from '../data/words/react.json';
import tailwindWords from '../data/words/tailwind.json';
import pythonWords from '../data/words/python.json';
import gitWords from '../data/words/git.json';
import { useEffect, useRef, useState } from 'react';
import { randomIndex } from '../utils/randomIndex';
import { useSelector } from 'react-redux';
import { selectActiveCards } from '../redux/slices/activeCardsSlice.js';

const Card = () => {
  const activeCardId = useSelector(selectActiveCards);

  const wordSets = {
    0: commonWords,
    1: reactWords,
    2: tailwindWords,
    3: pythonWords,
    4: gitWords,
  };

  const words = wordSets[activeCardId];

  const cardManagerRef = useRef(new CardManager(words, 'order'));
  const cardManager = cardManagerRef.current;
  const [currentCard, setCurrentCard] = useState(
    cardManager.cards[randomIndex(words.length)]
  );
  const [currentWord, setCurrentWord] = useState(currentCard.word);
  const [isTranslate, setIsTranslate] = useState(false);
  const [currentMode, setCurrentMode] = useState('order');

  useEffect(() => {
    if (words.length > 0) {
      cardManagerRef.current = new CardManager(words, currentMode);
      const cardManager = cardManagerRef.current;
      const newCard = cardManager.cards[randomIndex(words.length)];
      setCurrentCard(newCard);
      setCurrentWord(newCard.word);
      setIsTranslate(false);
    }
  }, [activeCardId]);

  const handleNextCard = () => {
    const newCard = cardManager.getCard();
    setCurrentCard(newCard);
    setCurrentWord(newCard.word);
    setIsTranslate(false);
  };

  const handleTranslateCard = () => {
    if (isTranslate) {
      setCurrentWord(currentCard.word);
      setIsTranslate(false);
    } else {
      setCurrentWord(currentCard.translation);
      setIsTranslate(true);
    }
  };

  const handleChangeMode = (mode) => {
    setCurrentMode(mode);
    cardManager.mode = mode;
  };

  return (
    <div>
      <>
        {/* Кнопки выбора режима */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={() => handleChangeMode('order')}
            className={`px-6 py-2 rounded-xl shadow-md transition ${
              currentMode === 'order'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            По порядку
          </button>

          <button
            onClick={() => handleChangeMode('random')}
            className={`px-6 py-2 rounded-xl shadow-md transition ${
              currentMode === 'random'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Случайно
          </button>
        </div>
        {/* Карточка */}
        <div
          className="bg-gray-200 p-4 shadow-md rounded-3xl border border-gray-300 w-[60%] 
          m-auto h-96 flex items-center justify-center text-2xl font-semibold select-none"
        >
          {currentWord}
        </div>

        {/* Кнопки управления */}
        <div className="flex gap-4 justify-center mt-2">
          <button
            onClick={handleTranslateCard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            Показать перевод
          </button>

          <button
            onClick={handleNextCard}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            Следующая
          </button>
        </div>

        {/* Индикатор прогресса */}
        <p className="flex justify-center mt-4 text-gray-500 text-lg">1 / 10</p>
      </>
    </div>
  );
};

export default Card;
