import { useSelector } from 'react-redux';
import { selectCollapsed } from '../redux/slices/collapsedSlice';

const TitleMenuItem = () => {
  const collapsed = useSelector(selectCollapsed);
  return (
    <div
      className={`mt-10 w-full text-sm text-gray-500 ${collapsed && 'hidden'}`}
    >
      {collapsed ? 'К' : 'Карточки'}
    </div>
  );
};

export default TitleMenuItem;
