import CardMenuItem from '../atoms/CardItemMenu';
import Logo from '../atoms/Logo';
import { selectCollapsed } from '../redux/slices/collapsedSlice';
import { useSelector } from 'react-redux';

const SideBar = () => {
  const collapsed = useSelector(selectCollapsed);
  return (
    <aside
      className={`bg-zinc-900 text-slate-200 shadow-xl shadow-zinc-800/50 flex flex-col transition-all duration-300
      ${collapsed ? 'w-16 p-2 items-center' : 'w-64 p-4'}`}
    >
      <Logo />

      <div
        className={`mt-10 w-full text-sm text-gray-500 ${
          collapsed && 'hidden'
        }`}
      >
        {collapsed ? 'К' : 'Карточки'}
      </div>

      <CardMenuItem collapsed={collapsed} />
    </aside>
  );
};

export default SideBar;
