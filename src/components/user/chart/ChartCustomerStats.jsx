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
  // داده‌های ورودی
  const defaultData = [
    { x: "۱۴۰۲/۰۸/۰۱", y: 100, type: "buy", username: "علی", currency: "تتر" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 500, type: "buy", username: "رضا", currency: "بیت کوین" },
    { x: "۱۴۰۲/۰۸/۰۳", y: 170, type: "buy", username: "محمد", currency: "تتر" },
    { x: "۱۴۰۲/۰۸/۰۶", y: 500, type: "buy", username: "زهرا", currency: "BTC" },
    { x: "۱۴۰۲/۰۸/۰۷", y: 520, type: "buy", username: "سارا", currency: "gold" },
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

  const [filterType, setFilterType] = useState("all"); // فیلتر نوع عملیات
  const [filterCurrency, setFilterCurrency] = useState("all"); // فیلتر نوع ارز

  // فیلتر داده‌ها بر اساس نوع عملیات و نوع ارز
  const filteredData = defaultData.filter(
    (item) =>
      (filterCurrency === "all" || item.currency === filterCurrency)
  );

  // پردازش داده‌ها برای چارت
 

  const data = {
    labels: filteredData.map((item) => item.x),
    datasets: [
      {
        label: "سود",
        data: defaultData ,
        backgroundColor: "rgba(0, 128, 0, 0.6)",
        borderColor: "#006400",
        borderWidth: 2,
         
      tension: 0.3,
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
            const currentData = defaultData[index];
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
        // می‌توانید داده‌های جدید را ذخیره یا پردازش کنید
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };
  

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 w-full mt-6">
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع مشتریان:
        </label>
        <select
          id="operationFilter"
          className="border border-gray-300 rounded px-2 py-1"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">همه</option>
          <option value="buy">مشتریان API</option>
          <option value="sell">BTC</option>
        </select>
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
      <h1 className="text-center mt-6 font-bold text-lg">نمودار سود  و زیان</h1>
      <Line data={data} options={options} />
    </div>
  );
}
