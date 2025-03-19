import { useState, useEffect, useRef } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePickerPersian from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jalaali from "jalaali-js";
import convertPersianToEnglishNumbers from "../../../utils/convertPersianToEnglishNumbers";
import axiosClient2 from "../../../axios-client2";
import { toast } from "react-toastify";
import Chart from "chart.js/auto";

export default function ChartAllUsers() {
  const [dataChart, setDataChart] = useState(null);
  const chartRef = useRef(null);
  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [dateBirth2, setDateBirth2] = useState(new DateObject());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTime2, setStartTime2] = useState(null);
  const [endTime2, setEndTime2] = useState(null);

  const handleFilterByDate = () => {

    if (!dateBirth2 || !dateBirth || !startTime || !endTime) {
      toast.error("لطفاً فیلتر تاریخ و ساعت را وارد کنید.");
      return;
    }

const formattedStartTime = new Date(startTime).toLocaleTimeString("en-GB");
const formattedEndTime = new Date(endTime).toLocaleTimeString("en-GB");
setStartTime2(formattedStartTime);
setEndTime2(formattedEndTime);
    const startDateFormatted = convertPersianToEnglishNumbers(
      dateBirth.format("YYYY-MM-DD")
    );
    const endDateFormatted = convertPersianToEnglishNumbers(
      dateBirth2.format("YYYY-MM-DD")
    );
    setStartDate2(startDateFormatted);
    setEndDate2(endDateFormatted);
    
  };

  const handleRemoveDateFilter = () => {
    setStartDate2(null);
    setEndDate2(null);
    setStartTime(null);
    setEndTime(null)
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const currentDate = new Date();
        const oneHourBefore = new Date(currentDate);
        oneHourBefore.setHours(currentDate.getHours() - 1);
        let start =
          startDate ||
          oneHourBefore.toISOString().slice(0, 19).replace("T", " ");
        let end =  endDate || currentDate.toISOString().slice(0, 19).replace("T", " ");
        const startJalali = jalaali.toJalaali(new Date(start.split(" ")[0]));
        const endJalali = jalaali.toJalaali(new Date(end.split(" ")[0]));
        let startJalaliFormatted = `${startJalali.jy}-${startJalali.jm}-${
          startJalali.jd
        } ${start.split(" ")[1]}`;
        let endJalaliFormatted = `${endJalali.jy}-${endJalali.jm}-${
          endJalali.jd
        } ${end.split(" ")[1]}`;
        let finalStartDate =
          startDate2 !== null
            ? `${startDate2} ${startTime2}`
            : startJalaliFormatted;
        let finalEndDate =
          endDate2 !== null
            ? `${endDate2} ${endTime2}`
            : endJalaliFormatted;
        let endpoint = `/candles?f[created_at_between]=${finalStartDate},${finalEndDate}`;
        const response = await axiosClient2.get(endpoint);
        const chartTimeData = response.data.data.reverse();

        if (chartTimeData) {
          const buyData = chartTimeData.filter(
            (item) => item.buy_exchange_id === 6
          );
          const sellData = chartTimeData.filter(
            (item) => item.sell_exchange_id === 2
          );

          const buyValues = buyData.map((item) =>
            parseFloat(item.max_buy_price)
          );
          const sellValues = sellData.map((item) =>
            parseFloat(item.min_sell_price)
          );
          
          const timeLabels = chartTimeData.map(item => {
            const date = new Date(item.created_at);
              const {  jm, jd } = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
            return ` ${jm}/${jd} - ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
          });
          

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

          setDataChart(newDataChart);
        } else {
          console.error("Invalid data structure:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [startDate2, endDate2 , startDate , endDate , startTime2]);

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
      <h1 className="text-center font-bold text-lg mt-6">
        نمودار آمار کلی ساعتی
      </h1>
      <div className="my-4 flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full md:w-2/6 flex flex-col gap-1">
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
        <div className="w-full md:w-2/6 flex flex-col gap-1">
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
        <div className="w-full md:w-2/6 flex flex-col md:flex-row gap-1">
        <div className="w-full md:w-1/2 flex flex-col gap-1">
        <span className="block text-gray-700 text-sm font-bold  w-28">
          زمان شروع :
          </span>
            <DatePickerPersian
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="زمان"
              dateFormat="HH:mm:ss"
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-1">
          <span className="block text-gray-700 text-sm font-bold  w-28">
          زمان پایان :
          </span>
            <DatePickerPersian
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="زمان"
              dateFormat="HH:mm:ss"
              className="border rounded p-2 w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-end w-full">
      <button
          onClick={handleRemoveDateFilter}
          className="bg-[#800505] hover:bg-[#f93aa3] text-white w-full text-sm md:w-1/6 px-4 mt-[23px]  rounded h-[43px]"
        >
          حذف فیلتر
        </button>

        <button
          onClick={handleFilterByDate}
          className="bg-[#090580] hover:bg-[#3ABEF9] text-white w-full text-sm md:w-1/6 px-4 mt-[23px]  rounded h-[43px]"
        >
          فیلتر  
        </button>
      </div>
      <div>
        {dataChart ? (
          <canvas ref={chartRef}></canvas>
        ) : (
          <div className="flex justify-center items-center py-20 text-center bg-gray-100">
            <svg
              className="animate-spin h-20 w-20 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
