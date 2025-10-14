import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveCards,
  setActiveWordId,
} from '../redux/slices/activeCardsSlice.js';
import CardManager from '../utils/CardManager';
import commonWords from '../data/words/common.json';
import reactWords from '../data/words/react.json';
import tailwindWords from '../data/words/tailwind.json';
import pythonWords from '../data/words/python.json';
import gitWords from '../data/words/git.json';

const wordSets = {
  0: commonWords,
  1: reactWords,
  2: tailwindWords,
  3: pythonWords,
  4: gitWords,
};

const Card = () => {
  const dispatch = useDispatch();
  const activeCardId = useSelector(selectActiveCards);
  const words = wordSets[activeCardId] || [];

  const cardManagerRef = useRef(new CardManager(words, 'order', activeCardId));
  const cardManager = cardManagerRef.current;

  const [currentCard, setCurrentCard] = useState(() =>
    cardManager.getStats().currentPosition >= 0
      ? cardManager.cards[cardManager.getStats().currentPosition]
      : cardManager.initCard()
  );
  const [currentWord, setCurrentWord] = useState(currentCard.word);
  const [isTranslate, setIsTranslate] = useState(false);
  const [currentMode, setCurrentMode] = useState('order');

  useEffect(() => {
    cardManagerRef.current = new CardManager(words, currentMode, activeCardId);
    const card =
      cardManagerRef.current.getStats().currentPosition >= 0
        ? cardManagerRef.current.cards[
            cardManagerRef.current.getStats().currentPosition
          ]
        : cardManagerRef.current.getCard();

    setCurrentCard(card);
    setCurrentWord(card.word);
    setIsTranslate(false);
  }, [activeCardId]);

  const handleNextCard = (known) => {
    if (known) cardManager.addComplete();
    const nextCard = cardManager.getCard();
    setCurrentCard(nextCard);
    setCurrentWord(nextCard.word);
    setIsTranslate(false);
    dispatch(setActiveWordId(nextCard.id));
  };

  const handleTranslateCard = () => {
    setCurrentWord(isTranslate ? currentCard.word : currentCard.translation);
    setIsTranslate(!isTranslate);
  };

  const handleChangeMode = (mode) => {
    setCurrentMode(mode);
    cardManager.mode = mode;
    const card =
      cardManager.getStats().currentPosition >= 0
        ? cardManager.cards[cardManager.getStats().currentPosition]
        : cardManager.getCard();
    setCurrentCard(card);
    setCurrentWord(card.word);
    setIsTranslate(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-4xl flex flex-col gap-6 items-center">
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl shadow-md w-full h-72 flex items-center justify-center text-3xl font-bold text-gray-800 select-none">
        {currentWord}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        {['order', 'random'].map((mode) => (
          <button
            key={mode}
            onClick={() => handleChangeMode(mode)}
            className={`px-6 py-2 rounded-xl shadow-md transition ${
              currentMode === mode
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {mode === 'order' ? 'По порядку' : 'Случайно'}
          </button>
        ))}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <button
          onClick={handleTranslateCard}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
          Показать перевод
        </button>
        <button
          onClick={() => handleNextCard(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
          Знаю
        </button>
        <button
          onClick={() => handleNextCard(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
          Не знаю
        </button>
      </div>
    </div>
  );
};

export default Card;
