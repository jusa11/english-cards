const CardButton = ({action, bgColor, hoverColor, text}) => {
  return (
    <button
      onClick={action}
      className={`${bgColor} ${hoverColor} text-white px-6 py-2 rounded-xl shadow-md transition`}
    >
      {text}
    </button>
  );
};

export default CardButton;
