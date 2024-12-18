import { useState } from "react";
import ChartAllUsers from "../components/user/chart/ChartAllUsers";
 import ChartDailyStats from "../components/user/chart/ChartDailyStats2";
 import ChartMonthlyStats from "../components/user/chart/ChartMonthlyStats";
 import ChartCustomerStats from "../components/user/chart/ChartCustomerStats";


export default function StatisticalUser() {
    const [activeSection, setActiveSection] = useState("chartAllUsers");

    const buttonClasses = (section) =>
      `text-sm w-1/2 md:w-full px-3 py-2 text-gray-100 border rounded-md ${
        activeSection === section
          ? "bg-[#3ABEF9]"
          : "bg-[#090580] hover:bg-[#3ABEF9]"
      }`;

      
    return (
        <>
          <div className="w-full px-4">
            <h1 className="block text-gray-700 text-lg font-bold mb-2 py-4 ">
              نگاه آماری 
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 my-5 w-full justify-center">
            <div className="flex w-full md:w-2/5 gap-3">
              <button
                className={buttonClasses("chartAllUsers")}
                onClick={() => setActiveSection("chartAllUsers")}
              >
                مشاهده آمار کلی
              </button>
              <button
                className={buttonClasses("dailyStats")}
                onClick={() => setActiveSection("dailyStats")}
              >
                نگاه آماری تاریخی
              </button>
            </div>
            <div className="flex w-full md:w-2/5 gap-3">
              <button
                className={buttonClasses("monthlyStats")}
                onClick={() => setActiveSection("monthlyStats")}
              >
                نگاه آماری صرافی 
              </button>
              <button
                className={buttonClasses("customerStats")}
                onClick={() => setActiveSection("customerStats")}
              >
                نگاه آماری سود  
              </button>
            </div>
         
          </div>
          {activeSection === "chartAllUsers" && (
            <div>
              <ChartAllUsers />
            </div>
          )}
          {activeSection === "dailyStats" && (
            <div>
              <ChartDailyStats />
            </div>
          )}
          {activeSection === "monthlyStats" && (
            <div>
              <ChartMonthlyStats />
            </div>
          )}
          {activeSection === "customerStats" && (
            <div>
              <ChartCustomerStats />
            </div>
          )}
         
        </>
      );
    }