import { useRef } from 'react';
import StatsCard from '../molecules/StatsCard'
import WordCard from '../molecules/WordCard';

const Content = () => {
  const contentRef = useRef(null);

  return (
    <div className="flex-1 flex flex-col h-full overflow-auto bg-gray-50 p-6">
      <main
        ref={contentRef}
        className="flex flex-col items-center gap-10 w-full"
      >
        <WordCard />
        <StatsCard />
      </main>
    </div>
  );
};

export default Content;
