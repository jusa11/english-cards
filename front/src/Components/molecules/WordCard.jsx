import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActiveCards,
  setActiveWordId,
} from '../redux/slices/activeCardsSlice.js';
import CardManager from '../utils/CardManager.js';
import commonWords from '../data/words/common.json';
import reactWords from '../data/words/react.json';
import tailwindWords from '../data/words/tailwind.json';
import pythonWords from '../data/words/python.json';
import gitWords from '../data/words/git.json';
import CardButton from '../atoms/CardButton.jsx';

const wordSets = {
  0: commonWords,
  1: reactWords,
  2: tailwindWords,
  3: pythonWords,
  4: gitWords,
};

const WordCard = () => {
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
  const [unknownCards, setUnknownCards] = useState([]);

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

  const handleClearStats = () => {
    cardManager.resetStats();
  };

  const handleShowUnKnownCards = () => {
    const cards = cardManager.showUnknownCards();
    setUnknownCards(cards);
  };

  return (
    <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-4xl flex flex-col gap-6 items-center">
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-3xl shadow-md w-full md:h-72 flex items-center justify-center text-3xl font-bold text-gray-800 select-none">
        {currentWord}
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        <CardButton
          action={handleTranslateCard}
          bgColor={'bg-blue-500'}
          hoverColor={'hover:bg-blue-600'}
          text={'Показать перевод'}
        />
        <CardButton
          action={() => handleNextCard(false)}
          bgColor={'bg-red-500'}
          hoverColor={'hover:bg-red-600'}
          text={'Не знаю'}
        />
        <CardButton
          action={() => handleNextCard(true)}
          bgColor={'bg-green-500'}
          hoverColor={'hover:bg-green-600'}
          text={'Знаю'}
        />
      </div>

      <div className="flex gap-4 justify-center flex-wrap">
        {['order', 'random'].map((mode) => (
          <CardButton
            key={mode}
            action={() => handleChangeMode(mode)}
            bgColor={currentMode === mode ? 'bg-green-500 ' : 'bg-gray-200'}
            hoverColor={'hover:bg-blue-600'}
            text={mode === 'order' ? 'По порядку' : 'Случайно'}
          />
        ))}
        <button onClick={handleClearStats}>Обнулить</button>
        <button onClick={handleShowUnKnownCards}>
          Показать карточки которые не знаю{' '}
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        {unknownCards.map((card, index) => (
          <div key={card.id} className="p-2 bg-gray-100 rounded-lg w-full">
            {index}. {card.word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordCard;
