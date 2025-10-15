import Header from './Components/organisms/Header';
import SideBar from './Components/organisms/SideBar';
import Content from './Components/organisms/Content';

function App() {
  return (
    <>
      <div className="grid grid-cols-[auto,1fr] min-h-screen font-roboto h-screen">
        <SideBar />

        <div className="flex flex-col h-screen">
          <Header />
          <Content />
        </div>
      </div>
    </>
  );
}

export default App;
