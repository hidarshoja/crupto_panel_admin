import React, { useEffect } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {  useNavigate } from "react-router-dom";

export default function Header({
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("USER_INFO"));
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  // چک کردن وضعیت توکن و هدایت به صفحه ورود
  useEffect(() => {
    if (!accessToken) {
      // navigate("/auth/login");
    }
  }, [accessToken, navigate]);

  // تابع خروج
  const handleLogout = () => {
    localStorage.removeItem("USER_INFO");
    localStorage.removeItem("ACCESS_TOKEN");
    // navigate("/auth/login");
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
