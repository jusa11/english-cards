import { useRef } from 'react';
import Card from '../molecules/Card';

const Content = () => {
  const contentRef = useRef(null);


  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <main
        ref={contentRef}
        className="flex-1 flex flex-col p-4 overflow-auto justify-center"
      >
        <Card />
      </main>
    </div>
  );
};

export default Content;
