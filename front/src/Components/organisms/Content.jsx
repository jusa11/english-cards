import { useRef } from 'react';
import Stats from '../atoms/Stats';
import Card from '../molecules/Card';

const Content = () => {
  const contentRef = useRef(null);

  return (
    <div className="flex-1 flex flex-col h-full overflow-auto bg-gray-50 p-6">
      <main
        ref={contentRef}
        className="flex flex-col items-center gap-10 w-full"
      >
        <Card />
        <Stats />
      </main>
    </div>
  );
};

export default Content;
