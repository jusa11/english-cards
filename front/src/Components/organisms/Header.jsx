import { useSelector } from "react-redux";
import { selectActiveCards } from "../redux/slices/activeCardsSlice";
import { chats } from "../data/chats";

const Header = ({ onMenuClick }) => {
  const activeCard = useSelector(selectActiveCards);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b border-gray-200">
      {/* Кнопка меню — только на мобилке */}
      <button
        className="md:hidden text-gray-700 hover:text-black text-2xl transition-transform active:scale-90"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 truncate ml-3">
        {chats[activeCard]?.name || "Выберите модуль"}
      </h1>

      {/* Пустой блок для центрирования */}
      <div className="w-6 md:w-0"></div>
    </header>
  );
};

export default Header;
