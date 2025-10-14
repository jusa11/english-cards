import { useDispatch } from 'react-redux';
import { chats } from '../data/chats';
import {
  setActiveCard,
  selectActiveCards,
} from '../redux/slices/activeCardsSlice';
import { useSelector } from 'react-redux';

const CardMenuItem = ({ collapsed }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveCards);

  const handleActiveCard = (id) => {
    dispatch(setActiveCard(id));
  };

  return (
    <nav className="mt-4 space-y-2 text-sm">
      {chats.map((chat) => (
        <div key={chat.id} className="relative group">
          <button
            onClick={() => handleActiveCard(chat.id)}
            className={`p-2 hover:bg-zinc-800 rounded-lg w-full text-left ${
              activeItem === chat.id ? 'bg-zinc-800' : ''
            }`}
          >
            {collapsed ? (
              <span className="text-lg font-bold">{chat.name[0]}</span>
            ) : (
              chat.name
            )}
          </button>

          {collapsed && (
            <span
              className="absolute left-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap 
                bg-zinc-800 text-slate-200 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 pointer-events-none z-50"
            >
              {chat.name}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default CardMenuItem;
