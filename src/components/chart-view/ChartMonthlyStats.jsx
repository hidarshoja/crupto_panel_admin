import { useState , useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import UserBox from "../UserBox";
import axios from "axios";

// ثبت المان‌ها برای استفاده در چارت
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartAllUsers() {

  const people = [
    { id: 1, name: 'علی شجاع' },
    { id: 2, name: 'رضا محمدی' },
    { id: 3, name: 'مریم کریمی' },
    { id: 4, name: 'سارا حسینی' },
];
const [userId, setUserId] = useState(null);
    const [pri, setPri] = useState(0);
  // داده‌های ورودی
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


  const [filterCurrency, setFilterCurrency] = useState("all"); // فیلتر نوع ارز

  // فیلتر داده‌ها بر اساس نوع عملیات و نوع ارز
  const filteredData = defaultData.filter(
    (item) =>
    
      (filterCurrency === "all" || item.currency === filterCurrency)
  );

  // پردازش داده‌ها برای چارت
  const processedData = allDates.map((date) => {
    const buyItem = filteredData.find((item) => item.x === date && item.type === "buy");
    const sellItem = filteredData.find((item) => item.x === date && item.type === "sell");

    return {
      x: date,
      buy: buyItem ? buyItem.y : 0,
      sell: sellItem ? sellItem.y : 0,
      buyUsername: buyItem?.username || null,
      sellUsername: sellItem?.username || null,
    };
  });

  const data = {
    labels: processedData.map((item) => item.x),
    datasets: [
      {
        label: "خرید",
        data: processedData.map((item) => item.buy),
        backgroundColor: "rgba(0, 128, 0, 0.3)",  // سایه زیر خط
        borderColor: "#006400",
        borderWidth: 2,
        fill: true,  // این ویژگی برای پر کردن فضای زیر خط به کار می‌رود
        tension: 0.4,  // این ویژگی برای منحنی کردن خط استفاده می‌شود
      },
      {
        label: "فروش",
        data: processedData.map((item) => item.sell),
        backgroundColor: "rgba(255, 0, 0, 0.3)",  // سایه زیر خط
        borderColor: "#B22222",
        borderWidth: 2,
        fill: true,  // این ویژگی برای پر کردن فضای زیر خط به کار می‌رود
        tension: 0.4,  // این ویژگی برای منحنی کردن خط استفاده می‌شود
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

 
  
 
  useEffect(() => {
    if (userId) {
      // اگر userId موجود بود، درخواست به API ارسال شود
      axios.get(`https://jsonplaceholder.org/posts/?user_id=${userId}`)
        .then((response) => {
          console.log("Transactions:", response.data);
          
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, [userId]);

  return (
    <div>
      <div className="flex flex-col md:flex-row mt-6 gap-4 w-full">
      <div className="w-full md:w-1/2 flex flex-col mt-[-3px]">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
           نام کاربر :
        </label>
      
         <UserBox
                people={people}
                setUserId={setUserId}
                setPri={setPri}
            />
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="currencyFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع ارز:
        </label>
        <select
          id="currencyFilter"
          className="border border-gray-300 rounded px-2 py-1"
          value={filterCurrency}
          onChange={(e) => setFilterCurrency(e.target.value)}
        >
          <option value="all">همه</option>
          {uniqueCurrencies.map((currency, index) => (
            <option key={index} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      </div>
     
      <h1 className="text-center font-bold text-lg mt-6">نمودار خرید و فروش کاربر</h1>
      <Line data={data} options={options} />
    </div>
  );
}
