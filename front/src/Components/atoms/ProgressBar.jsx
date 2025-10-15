const ProgressBar = ({data}) => {
  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full"
          style={{ width: `${data?.progress || 0}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">
        {data?.progress || 0}%
      </p>
    </>
  );
};

export default ProgressBar;
