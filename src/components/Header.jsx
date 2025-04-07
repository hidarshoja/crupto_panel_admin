import  { useEffect , useState } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { HiOutlineBellAlert } from "react-icons/hi2";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const navigate = useNavigate();
   const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const [exportStatus, setExportStatus] = useState([]);

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("توکن دسترسی پیدا نشد");
    }
    return { Authorization: `Bearer ${accessToken}` };
  };


  const checkExportStatus = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL2}/excel-exports`,
      { headers: getAuthHeaders() }
    );
    const exportStatuses = response.data.data.filter(
      (item) => item.status !== 100 && item.status !== -100
    );
  
    setExportStatus(exportStatuses);
  
  };

  useEffect(() => {
    if (!accessToken) {
       navigate("/auth/login");
    }
    checkExportStatus();
  }, [accessToken, navigate]);

 
  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    localStorage.removeItem("ACCESS_TOKEN");
     navigate("/auth/login");
  };

 

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-[#090580] border-b-2 border-gray-700 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-100 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {!desktopSidebarOpen && (
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-100 hidden lg:block"
          onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-100 hover:text-green-600"
          >
            <span className="sr-only">پیام ها</span>
          </button>

          <Menu as="div" className="flex flex-wrap items-center justify-end gap-1">
          <div className="text-[12px] w-[20px] h-[20px] relative">
                   <HiOutlineBellAlert  size={24} className="text-white"/>
                   <span className="absolute top-[-6px] right-[-6px] text-xs bg-white text-red-500 rounded-full w-4 h-4 flex items-center justify-center">{exportStatus.length}</span>
                </div>
            <div className="px-3 cursor-pointer flex overflow-hidden bg-white h-7 rounded-[11px] border border-[#5B7380]">
              
              <div className="w-full flex items-center justify-center gap-1">
             
                <div>
                  <img
                    src="/img/zahra.svg"
                    className="w-[20px] h-[20px] rounded-[20px] border border-[#000]"
                    alt=""
                  />
                </div>
                <div className="text-color3 text-sm md:text-[16px]">
                  {userInfo?.name}
                </div>
              </div>
            </div>
            <div
              className="w-[90px] flex overflow-hidden bg-[#FDCB44] h-7 rounded-[11px] border border-[#5B7380]"
              onClick={handleLogout} 
            >
              <div className="w-full flex items-center justify-center gap-1 cursor-pointer">
                <div>
                  <img
                    src="/img/exitW.svg"
                    className="w-[17px] h-[17px]"
                    alt=""
                  />
                </div>
                <div className="text-white text-[12px]">
                  <span>خروج</span>
                </div>
               
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}
