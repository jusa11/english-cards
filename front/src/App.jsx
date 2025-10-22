import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Components/organisms/Header";
import SideBar from "./Components/organisms/SideBar";
import Content from "./Components/organisms/Content";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="grid grid-cols-[auto,1fr] min-h-screen font-roboto h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <SideBar />
      </div>

      {/* Mobile sidebar (animated) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="fixed top-0 left-0 w-64 bg-zinc-900 text-slate-200 shadow-lg z-50 md:hidden"
            >
              <div className="flex justify-end p-3">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <SideBar />
            </motion.aside>

            {/* затемнение фона */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            ></motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Контентная часть */}
      <div className="flex flex-col h-screen">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          <Content />
        </main>
      </div>
    </div>
  );
}

export default App;
