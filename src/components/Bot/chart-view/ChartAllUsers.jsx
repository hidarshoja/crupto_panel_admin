import { useState } from "react";
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
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartAllUsers() {

  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [dateBirth2, setDateBirth2] = useState(new DateObject());
  const defaultData = [
    { x: "۱۴۰۲/۰۸/۰۱", y: 100, type: "buy", username: "علی", currency: "تتر" },
    { x: "۱۴۰۲/۰۸/۰۱", y: 150, type: "sell", username: "حسین", currency: "ریال" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 500, type: "buy", username: "رضا", currency: "بیت کوین" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 120, type: "sell", username: "فاطمه", currency: "SOL" },
    { x: "۱۴۰۲/۰۸/۰۳", y: 170, type: "buy", username: "محمد", currency: "تتر" },
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

  const [filterType, setFilterType] = useState("all");
  const [filterCurrency, setFilterCurrency] = useState("all");

  
  const filteredData = defaultData.filter(
    (item) =>
      (filterType === "all" || item.type === filterType) &&
      (filterCurrency === "all" || item.currency === filterCurrency)
  );

  const processedData = allDates.map((date) => {
    const buyItem = filteredData.find((item) => item.x === date && item.type === "buy");
    const sellItem = filteredData.find((item) => item.x === date && item.type === "sell");

   
    const profit = (buyItem?.y || 0) - (sellItem?.y || 0); 
    const strategy1 = Math.random() * 100; 
    const strategy2 = Math.random() * 80; 
    const strategy3 = Math.random() * 50; 

    return {
      x: date,
      buy: buyItem ? buyItem.y : 0,
      sell: sellItem ? sellItem.y : 0,
      profit,
      strategy1,
      strategy2,
      strategy3,
      buyUsername: buyItem?.username || null,
      sellUsername: sellItem?.username || null,
    };
  });

  const data = {
    labels: processedData.map((item) => item.x),
    datasets: [
      {
        label: "کل فروش",
        data: processedData.map((item) => item.buy),
        borderColor: "#006400", 
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "کل خرید",
        data: processedData.map((item) => item.sell),
        borderColor: "#B22222", 
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "کل سود",
        data: processedData.map((item) => item.profit),
        borderColor: "#0000FF", 
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "استراتژی ۱",
        data: processedData.map((item) => item.strategy1),
        borderColor: "#000000", 
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "استراتژی ۲",
        data: processedData.map((item) => item.strategy2),
        borderColor: "#FFFF00", 
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "استراتژی ۳",
        data: processedData.map((item) => item.strategy3),
        borderColor: "#8B4513", 
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "تاریخ",
        },
      },
      y: {
        title: {
          display: true,
          text: "مقادیر",
        },
      },
    },
  };
  



  const convertPersianToEnglishNumbers = (str) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
    let result = str;
    persianNumbers.forEach((persian, index) => {
      result = result.replace(new RegExp(persian, 'g'), englishNumbers[index]);
    });
  
    return result;
  };
  
  const handleFilterByDate = () => {
    const startDate = convertPersianToEnglishNumbers(dateBirth.format("YYYY-MM-DD"));
    const endDate = convertPersianToEnglishNumbers(dateBirth2.format("YYYY-MM-DD"));
  
    const url = `/admin/statistics/time-frame?start_date=${startDate} 00:00:00&end_date=${endDate} 23:59:59`;
    console.log(`url`, url);
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received: ", data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };
  

  return (
    <div>
    
      <div className="my-4 flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-2/5 flex flex-col gap-1">
                <span className="block text-gray-700 text-sm font-bold  w-28">
                   از تاریخ :
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={dateBirth}
                  onChange={setDateBirth}
                  calendarPosition="bottom-right"
                  inputClass="custom-input"
                />
              </div>
              <div className="w-full md:w-2/5 flex flex-col gap-1">
                <span className="block text-gray-700 text-sm font-bold  w-28">
                   تا تاریخ :
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={dateBirth2}
                  onChange={setDateBirth2}
                  calendarPosition="bottom-right"
                  inputClass="custom-input"
                />
              </div>
              <button
        onClick={handleFilterByDate}
        className="bg-[#090580] hover:bg-[#3ABEF9] text-white w-full text-sm md:w-1/5 px-4 mt-[23px]  rounded h-[43px]"
      >
        فیلتر براساس تاریخ
            </button>
      </div>
      <div className="flex items-center justify-center">
      <div className="flex items-center flex-col gap-2 w-5/6 md:w-1/3 border-2 border-gray-300 rounded-md bg-gray-100">
        <div className="border-b-2 border-gray-300 py-3">
          <span>مبلغ کل خرید : </span>
          <span className="text-green-500">100000000 تومان</span>
        </div>
        <div className="border-b-2 border-gray-300 py-3">
        <span>مبلغ کل فروش : </span>
        <span className="text-green-500">17000000 تومان</span>
        </div>
        <div className="py-3">
        <span>مبلغ کل سود : </span>
        <span className="text-green-500">70000000 تومان</span>
        </div>
      </div>
      </div>
      <h1 className="text-center font-bold text-lg mt-6">نمودار آمار کلی خرید و فروش   </h1>
      <Line data={data} options={options} />
    </div>
  );
}
