import ShareButton from "../atoms/ShareButton";

const Header = () => {
  return (
    <header className="text-gray-900 p-4 flex justify-between items-center relative">
      <div className="font-bold text-3xl  text-left p-2 ">
        React docs
      </div>
      <ShareButton/>
    </header>
  );
};

export default Header;
