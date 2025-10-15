import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectActiveCards,
  selectActiveWordId,
} from '../redux/slices/activeCardsSlice.js';
import { chats } from '../data/chats.js';
import StatItem from '../atoms/StatItem.jsx';
import ProgressBar from '../atoms/ProgressBar.jsx';

const StatsCard = () => {
  const activeCardId = useSelector(selectActiveWordId);
  const activeCard = useSelector(selectActiveCards);
  const key = `cardManagerState_${activeCard}`;
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(key)) || {}
  );

  useEffect(() => {
    setData(() => JSON.parse(localStorage.getItem(key) || {}));
  }, [activeCardId, activeCard]);

  return (
    <div className="bg-white w-full p-6 rounded-3xl shadow-lg relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Статистика изучения слов в категории "{chats[activeCard].name}"
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <StatItem
          title={'Всего слов'}
          bgColor={'bg-blue-100'}
          textColor={'text-blue-800'}
          data={data?.total || 0}
        />
        <StatItem
          title={'Выучено'}
          bgColor={'bg-green-100'}
          textColor={'text-green-800'}
          data={data?.complete || 0}
        />

        <StatItem
          title={'Осталось'}
          bgColor={'bg-yellow-100'}
          textColor={'text-yellow-800'}
          data={data?.howMuchLeft || 0}
        />
      </div>

      <div className="mt-6">
        <p className="text-gray-700 mb-2 text-sm font-medium">
          Прогресс изучения:
        </p>
        <ProgressBar data={data} />
      </div>
    </div>
  );
};

export default StatsCard;
