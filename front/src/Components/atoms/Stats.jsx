import { useSelector } from 'react-redux';
import { selectActiveCards, selectActiveWordId } from '../redux/slices/activeCardsSlice.js';
import { chats } from '../data/chats.js';
import { useEffect, useState } from 'react';

const Stats = () => {
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
        <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-sm text-gray-600">Всего слов</p>
          <p className="text-2xl font-bold mt-1">{data?.total || 0}</p>
        </div>

        <div className="bg-green-100 text-green-800 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-sm text-gray-600">Выучено</p>
          <p className="text-2xl font-bold mt-1">{data?.complete || 0}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl text-center shadow-sm">
          <p className="text-sm text-gray-600">Осталось</p>
          <p className="text-2xl font-bold mt-1">{data?.howMuchLeft || 0}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-700 mb-2 text-sm font-medium">
          Прогресс изучения:
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${data?.progress || 0}%` }}
          ></div>
        </div>
        <p className="text-right text-sm text-gray-500 mt-1">
          {data?.progress || 0}%
        </p>
      </div>
    </div>
  );
};

export default Stats;
