import { useSelector } from "react-redux";
import { selectActiveCards } from "../redux/slices/activeCardsSlice";
import {chats} from '../data/chats'


const Header = () => {
	const activeCard = useSelector(selectActiveCards);
  return (
    <header className="text-gray-900 p-4 flex justify-between items-center relative">
      <div className="font-bold text-3xl  text-left p-2 ">
        {chats[activeCard].name}
      </div>
    </header>
  );
};

export default Header;
