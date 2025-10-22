const StatItem = ({ title, bgColor, textColor, data }) => {

  return (
    <div
      className={`${bgColor} ${textColor} p-1 rounded-2xl text-center shadow-sm md:p-4`}
    >
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{data}</p>
    </div>
  );
};

export default StatItem;
