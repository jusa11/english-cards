import { setShare } from '../redux/slices/shareSlice';
import { useDispatch } from 'react-redux';

const ShareButton = () => {
  const dispatch = useDispatch();
	
  const handleShare = () => {
    dispatch(setShare(true));
  };

  return (
    <button
      className="hover:bg-gray-200 rounded-lg"
      onClick={() => handleShare()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
      >
        <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
      </svg>
    </button>
  );
};

export default ShareButton;
