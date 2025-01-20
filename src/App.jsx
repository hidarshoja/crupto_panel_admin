import { useState } from "react";
import MobileSidebar from "./components/MobileSidbar";
import DesktopSidebar from "./components/DesktopSidebar";
import MainContent from "./components/MainContent";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <>
     <Toaster position="top-right" />
      <div className="lg:flex lg:h-screen ">
        {!isAuthPage &&  (
          <MobileSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        )}
        {!isAuthPage &&  (
        <DesktopSidebar
          desktopSidebarOpen={desktopSidebarOpen}
          setDesktopSidebarOpen={setDesktopSidebarOpen}
        />
        )}
        <MainContent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          desktopSidebarOpen={desktopSidebarOpen}
          setDesktopSidebarOpen={setDesktopSidebarOpen}
        />
      </div>
    </>
  );
}

export default App;
