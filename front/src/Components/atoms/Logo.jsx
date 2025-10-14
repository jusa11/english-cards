import { selectCollapsed, setCollapsed } from '../redux/slices/collapsedSlice';
import { useSelector, useDispatch } from 'react-redux';

const Logo = () => {
  const collapsed = useSelector(selectCollapsed);
  const dispatch = useDispatch();

  const handleCollapsed = () => {
    collapsed ? dispatch(setCollapsed(false)) : dispatch(setCollapsed(true));
  };

  return (
    <div
      className={`pt-4 logo flex ${
        collapsed ? 'flex-col gap-3 ' : 'justify-between'
      }`}
    >
      <p
        className="text-orange-600
					 text-3xl font-bold"
      >
        {collapsed ? 'E' : 'ENGLISH'}
      </p>

      <button
        onClick={() => handleCollapsed()}
        className="hover:bg-zinc-800 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#B7B7B7"
          className={`transition-transform duration-300 ${
            collapsed ? 'rotate-180' : ''
          }`}
        >
          <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
        </svg>
      </button>
    </div>
  );
};

export default Logo;
