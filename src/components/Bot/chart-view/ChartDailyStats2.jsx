import { useState , useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartAllUsers() {

  

  const defaultData = [
    { x: "۱۴۰۲/۰۸/۰۱", y: 100, type: "buy", username: "علی", currency: "تتر" },
    { x: "۱۴۰۲/۰۸/۰۱", y: 150, type: "sell", username: "حسین", currency: "ریال" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 500, type: "buy", username: "رضا", currency: "بیت کوین" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 120, type: "sell", username: "فاطمه", currency: "SOL" },
    { x: "۱۴۰۲/۰۸/۰۳", y: 170, type: "buy", username: "محمد", currency: "تتر" },
    { x: "۱۴۰۲/۰۸/۰۴", y: 420, type: "sell", username: "مهدی", currency: "SOL" },
    { x: "۱۴۰۲/۰۸/۰۶", y: 500, type: "buy", username: "زهرا", currency: "BTC" },
    { x: "۱۴۰۲/۰۸/۰۶", y: 120, type: "sell", username: "مهدی", currency: "SOL" },
    { x: "۱۴۰۲/۰۸/۰۹", y: 520, type: "sell", username: "سارا", currency: "gold" },
    { x: "۱۴۰۲/۰۸/۰۹", y: 170, type: "buy", username: "حمید", currency: "ریال" },
  ];

  const allDates = [
    "۱۴۰۲/۰۸/۰۱",
    "۱۴۰۲/۰۸/۰۲",
    "۱۴۰۲/۰۸/۰۳",
    "۱۴۰۲/۰۸/۰۴",
    "۱۴۰۲/۰۸/۰۵",
    "۱۴۰۲/۰۸/۰۶",
    "۱۴۰۲/۰۸/۰۷",
    "۱۴۰۲/۰۸/۰۸",
    "۱۴۰۲/۰۸/۰۹",
  ];


  const [filterCurrency, setFilterCurrency] = useState("all");


  const filteredData = defaultData.filter(
    (item) =>
    
      (filterCurrency === "all" || item.currency === filterCurrency)
  );

  const processedData = allDates.map((date) => {
    const buyItem = filteredData.find((item) => item.x === date && item.type === "buy");
    const sellItem = filteredData.find((item) => item.x === date && item.type === "sell");

    const profit = (buyItem?.y || 0) - (sellItem?.y || 0); 

    return {
      x: date,
      buy: buyItem ? buyItem.y : 0,
      sell: sellItem ? sellItem.y : 0,
      profit,
   
      buyUsername: buyItem?.username || null,
      sellUsername: sellItem?.username || null,
    };
  });

  const data = {
    labels: processedData.map((item) => item.x),
    datasets: [
      {
        label: "سود استراتژی اول",
        data: processedData.map((item) => item.sell),
        borderColor: "#006400",
        borderWidth: 2,
        tension: 0.4, 
      },
      {
        label: "سود استراتژی دوم",
        data: processedData.map((item) => item.buy),
      
        borderColor: "#B22222",
        borderWidth: 2,
        tension: 0.4,  
      },
      {
        label: "سود استراتژی سوم",
        data: processedData.map((item) => item.profit),
        borderColor: "#0000FF",
        borderWidth: 2,
        tension: 0.4,  
      },
    ],
  };
  
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            const currentData = processedData[index];
            const username =
              datasetIndex === 0 ? currentData.buyUsername : currentData.sellUsername;
            const currency =
              datasetIndex === 0
                ? filteredData.find((item) => item.x === currentData.x && item.type === "buy")?.currency
                : filteredData.find((item) => item.x === currentData.x && item.type === "sell")?.currency;
  
            return `مقدار: ${context.raw} - کاربر: ${username || "نامشخص"} - ارز: ${currency || "نامشخص"}`;
          },
        },
      },
      legend: {
        labels: {
          font: {
            size: 15,
            family: "vazir",
          },
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "vazir",
          },
        },
        title: {
          display: true,
          padding: { bottom: 10 },
          font: {
            size: 14,
            family: "vazir",
          },
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "vazir",
          },
        },
        title: {
          display: true,
          padding: { top: 10 },
          font: {
            size: 14,
            family: "vazir",
          },
        },
      },
    },
  };
  
  

  // تمام ارزهای یکتا برای نمایش در سلکت
  const uniqueCurrencies = [...new Set(defaultData.map((item) => item.currency))];

 
  
  


  return (
    <div>
      
      
      <h1 className="text-center font-bold text-lg mt-6">نمودار خرید و فروش براساس سود و زیان</h1>
      <Line data={data} options={options} />
    </div>
  );
}
