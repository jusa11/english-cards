import { useState } from 'react';
import Header from './Components/organisms/Header';
import SideBar from './Components/organisms/SideBar';
import Content from './Components/organisms/Content';
import Stats from './Components/atoms/Stats';
import { useSelector } from 'react-redux';
import { selectShare } from './Components/redux/slices/shareSlice';

function App() {
  const isShare = useSelector(selectShare);

  return (
    <>
      <div
        className={`grid grid-cols-[auto,1fr] min-h-screen font-roboto h-screen  ${
          isShare && 'blur-sm bg-gray-700 shadow-none'
        }`}
      >
        <SideBar />

        <div className="flex flex-col h-screen">
          <Header />
          <Content />
        </div>
      </div>
      {isShare && <Stats />}
    </>
  );
}

export default App;
