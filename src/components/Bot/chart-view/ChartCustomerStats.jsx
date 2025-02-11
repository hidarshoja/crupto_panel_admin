import { useState, useEffect, useRef } from "react";
import axiosClient2 from "../../../axios-client2";
import Chart from "chart.js/auto"; 

export default function ChartAllUsers() {
  const [dataChart, setDataChart] = useState(null);
  const chartRef = useRef(null); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        const oneHourBefore = new Date(currentDate);
        oneHourBefore.setHours(currentDate.getHours() - 1);
        const oneHourBeforeString = oneHourBefore.toISOString().slice(0, 19).replace('T', ' ');

        const endpoint = `/candles?f[created_at_between]=${oneHourBeforeString},${currentDateString}`;
        const response = await axiosClient2.get(endpoint);
        console.log("response", response.data.data);
        const chartTimeData = response.data.data;

        if (chartTimeData) {
          const buyData = chartTimeData.filter(item => item.sell_exchange_id === 1);
          const sellData = chartTimeData.filter(item => item.sell_exchange_id === 2);

      

          const buyValues = buyData.map(item => parseFloat(item.max_buy_price));
          const sellValues = sellData.map(item => parseFloat(item.min_sell_price));

          const timeLabels = [];
          for (let i = 0; i < 1; i++) {
            for (let j = 0; j < 60; j += 5) {
              const hour = String(i).padStart(2, "0");
              const minute = String(j).padStart(2, "0");
              timeLabels.push(`${hour}:${minute}`);
            }
          }

          const newDataChart = {
            labels: timeLabels,
            datasets: [
              {
                label: "خرید",
                data: buyValues,
                backgroundColor: "rgba(0, 255, 0, 0.8)",
                borderColor: "rgba(0, 255, 0, 3)",
                borderWidth: 3,
                tension: 0.4,
              },
              {
                label: "فروش",
                data: sellValues,
                backgroundColor: "rgba(255, 0, 0, 0.8)",
                borderColor: "rgba(255, 0, 0, 3)",
                borderWidth: 3,
                tension: 0.4,
              },
            ],
          };

          setDataChart(newDataChart); // Update chart data
        } else {
          console.error("Invalid data structure:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []); 


  useEffect(() => {
    if (dataChart && chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const chartInstance = new Chart(chartRef.current, {
        type: "line", 
        data: dataChart, 
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 15,
                  family: "vazir",
                },
              },
            },
          },
          scales: {
            y: {
              ticks: {
                font: {
                  size: 12,
                  weight: "bold",
                  family: "vazir",
                },
              },
            },
            x: {
              ticks: {
                font: {
                  size: 12,
                  weight: "bold",
                  family: "vazir",
                },
              },
            },
          },
        },
      });

      chartRef.current.chartInstance = chartInstance;
    }
  }, [dataChart]); 

  return (
    <div>
      <h1 className="text-center font-bold text-lg mt-6">نمودار آمار کلی ساعتی</h1>
      <div>
        {dataChart ? (
          <canvas ref={chartRef}></canvas> 
        ) : (
          <div className="flex justify-center items-center py-20 text-center bg-gray-100">
            <svg className="animate-spin h-20 w-20 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
