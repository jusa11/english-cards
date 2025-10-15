import { useSelector } from 'react-redux';
import { selectCollapsed } from '../redux/slices/collapsedSlice';
import CardMenuItem from '../atoms/CardItemMenu';
import Logo from '../atoms/Logo';
import TitleMenuItem from '../atoms/TitleMenuItem';

const SideBar = () => {
  const collapsed = useSelector(selectCollapsed);
  return (
    <aside
      className={`bg-zinc-900 text-slate-200 shadow-xl shadow-zinc-800/50 flex flex-col transition-all duration-300
      ${collapsed ? 'w-16 p-2 items-center' : 'w-64 p-4'}`}
    >
      <Logo />
      <TitleMenuItem/>
      <CardMenuItem collapsed={collapsed} />
    </aside>
  );
};

export default SideBar;
