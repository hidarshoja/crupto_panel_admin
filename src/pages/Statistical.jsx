import { useEffect, useState } from "react";
import axios from "axios";
import ChartAllUsers from "../components/chart-view/ChartAllUsers";
 import ChartDailyStats from "../components/chart-view/ChartDailyStats2";
 import ChartMonthlyStats from "../components/chart-view/ChartMonthlyStats";
 import ChartCustomerStats from "../components/chart-view/ChartCustomerStats";
 import ChartRemainingStats from "../components/chart-view/ChartRemainingStats";
 import axiosClient2 from "../axios-client2";


export default function Statistical() {
    const [activeSection, setActiveSection] = useState("chartAllUsers");
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [assets , setAssets] = useState([]);
    const buttonClasses = (section) =>
      `text-sm w-1/2 md:w-full px-3 py-2 text-gray-100 border rounded-md ${
        activeSection === section
          ? "bg-[#3ABEF9]"
          : "bg-[#090580] hover:bg-[#3ABEF9]"
      }`;


      const handleExportExcel = async () => {
        const payload = {
          filters,   
          data: filteredData,
        };
      
        try {
          const response = await axios.post("/api/export-excel", payload, {
            responseType: "blob", 
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          const blob = response.data;
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "transactions.xlsx"); 
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error("Error exporting Excel:", error);
          alert("مشکلی در ارتباط با سرور رخ داده است");
        }
      };

      const fetchTransactionsAssetes = async () => {
        try {
          const endpoint = `/assets`;
          const response = await axiosClient2.get(endpoint);
            setAssets(response.data.data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        } 
      };

      useEffect(() => {
        fetchTransactionsAssetes();
      }
      , []);

      
    return (
        <>
          <div className="w-full px-4">
          <div className="flex items-center justify-between">
        <h1 className="text-md font-semibold mb-4 mt-4">نگاه آماری</h1>
        {activeSection === "dailyStats" && (
             <button
             onClick={handleExportExcel}
             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
           >
             خروجی اکسل
           </button>
          )}
      
      </div>
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
                نگاه آماری 
              </button>
              <button
                className={buttonClasses("customerStats")}
                onClick={() => setActiveSection("customerStats")}
              >
                نگاه آماری سود  
              </button>
            </div>
            <div className="flex w-full md:w-1/5 gap-3">
            
              <button
                className={buttonClasses("remainingStats")}
                onClick={() => setActiveSection("remainingStats")}
              >
                مشاهده آماری باقیمانده  
              </button>
            </div>
          </div>
          {activeSection === "chartAllUsers" && (
            <div>
              <ChartAllUsers assets={assets}/>
            </div>
          )}
          {activeSection === "dailyStats" && (
            <div>
              <ChartDailyStats assets={assets}/>
            </div>
          )}
          {activeSection === "monthlyStats" && (
            <div>
              <ChartMonthlyStats assets={assets}/>
            </div>
          )}
          {activeSection === "customerStats" && (
            <div>
              <ChartCustomerStats assets={assets}/>
            </div>
          )}
          {activeSection === "remainingStats" && (
            <div>
              <ChartRemainingStats />
            </div>
          )}
        </>
      );
    }
