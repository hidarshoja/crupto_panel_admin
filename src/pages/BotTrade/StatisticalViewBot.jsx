import { useState } from "react";
import ChartAllUsers from "../../components/Bot/chart-view/ChartAllUsers";
import ChartDailyStats from "../../components/Bot/chart-view/ChartDailyStats2";
import ChartMonthlyStats from "../../components/Bot/chart-view/ChartMonthlyStats";
import ChartCustomerStats from "../../components/Bot/chart-view/ChartCustomerStats";
import ChartRemainingStats from "../../components/Bot/chart-view/ChartRemainingStats";
import StreamView from "../../components/Bot/chart-view/StreamView";

export default function StatisticalViewBot() {
  const [activeSection, setActiveSection] = useState("chartAllUsers");

  return (
    <>
      <div className="w-full px-4">
       
      </div>
      <div
     className="flex justify-center flex-col items-start gap-3 my-2 w-full border-b-4 border-gray-300 pb-10 sticky top-0 bg-white z-10"
        
      >
         <h1 className="block text-gray-700 text-lg font-bold mb-2 py-4">
          نگاه آماری
        </h1>
        <span className="text-md font-semibold text-gray-700">
          نوع مشاهده :
        </span>
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="text-sm w-full px-3 py-2 text-gray-900 border rounded-md"
        >
          <option value="chartAllUsers">مشاهده آمار کلی</option>
          <option value="dailyStats">نگاه آماری سود</option>
          <option value="monthlyStats">نگاه موجودی</option>
          <option value="customerStats">نگاه حساب</option>
          <option value="remainingStats">نگاه جریانی</option>
          <option value="optimal">نگاه بهینه</option>
        </select>
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
            <ChartRemainingStats />
        </div>
      )}
      {activeSection === "remainingStats" && (
        <div>
        <StreamView />
        
        </div>
      )}
      {activeSection === "optimal" && (
        <div>
            <ChartCustomerStats />
        </div>
      )}
    </>
  );
}
