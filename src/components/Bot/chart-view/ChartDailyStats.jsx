import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getDaysInMonth } from "date-fns";
import jalaali from 'jalaali-js';
import axiosClient from "../../../axios-client";

import {  
  Chart,
  LineElement,
  CategoryScale, 
  LinearScale, 
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

export default function ChartAllUsers() {
  const [receivedData, setReceivedData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const now = new Date();
    const jalaaliDate = jalaali.toJalaali(now);
    const days = Array.from({ length: getDaysInMonth(now) }, (_, i) => i + 1);
    setDaysInMonth(days);
    setCurrentMonth(persianMonths[jalaaliDate.jm - 1]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          "/admin/statistics/statistical-view"
        );

        setChartValues(response.data.data);

        console.log("مقدار  چارت", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const setChartValues = (chart) => {
    setReceivedData([]);
    if (chart.length > 0) {
      chart?.map((items) => {
        items.transactions.map((item) => {
          const datePart = item.created_at.split(" ")[0];

          if (item.asset_id === 1) {
            setReceivedData((perv) => [
              ...perv,
              { x: datePart, y: item.sum_amount },
            ]);
          }
        });
      });
    }
  };

  useEffect(() => {
    let totalAmount = 0;
    receivedData.forEach((amount) => {
      totalAmount += parseInt(amount.y);
    });
    setAmount(totalAmount);
  }, [receivedData]);

  const generateNext30DaysLabels = () => {
    const labels = [];
    const today = new Date();
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar: "persian",
    };

    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      labels.push(date.toLocaleDateString("fa-IR", options)); // Assuming you're using Persian (Farsi) locale
    }
    return labels;
  };

  const prepareChartData = (dataArray, labels) => {
    const chartData = Array(30).fill(0);

    dataArray.forEach((point) => {
      const formatterDate = convertToPersianAlphabet(point.x);
      const modifiedDatePart = formatterDate.replace(/-/g, "/");
      const dateIndex = labels.indexOf(modifiedDatePart);

      if (dateIndex !== -1) {
        chartData[dateIndex] = parseFloat(point.y);
      }
    });
    return chartData;
  };
  function convertToPersianAlphabet(inputDate) {
    const persianAlphabet = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    let persianDate = "";

    for (let char of inputDate) {
      if (!isNaN(parseInt(char))) {
        persianDate += persianAlphabet[parseInt(char)];
      } else {
        persianDate += char;
      }
    }

    return persianDate;
  }

  const labels = generateNext30DaysLabels();
  const chartData = prepareChartData(receivedData, labels);

  const data = {
    labels: labels, // Use generated labels for x-axis
    datasets: [
      {
        label: "POS",
        data: chartData,
        borderColor: "#663388",
        borderWidth: 3,
        pointBorderColor: "#FF0099",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#ffff");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
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
          text: "",
          padding: {
            bottom: 10,
          },
          font: {
            size: 14,
            family: "vazir",
          },
        },
        min: 50,
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
          text: "",
          padding: {
            top: 10,
          },
          font: {
            size: 14,
            family: "vazir",
          },
        },
      },
    },
  };

  const containerStyle = {
    width: "100%", // Set the width to 100%
    height: "100%",
    padding: "20px",
    cursor: "pointer",
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* <div>
      <h1 className="block text-gray-700 text-lg font-bold mb-2 py-4 ">
        نگاه آماری کلی
      </h1>
    </div> */}
        <div>
          <div className="w-full flex justify-between items-center">
            <h1 className="block text-gray-700 text-lg font-bold mb-2 py-4 ">
              نگاه آماری روزانه
            </h1>
            <div>
              <span className="px-1">انتخاب روز :</span>
              <select
              name="day"
              id="day"
              className="px-6 border border-gray-600 rounded-lg"
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
            >
              {daysInMonth.map(day => (
                <option key={day} value={day}>{`${day} ${currentMonth}`}</option>
              ))}
            </select>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <div className="w-full flex flex-col">
            <h1 className="font-bold text-lg text-color1 text-center mt-10">
              نمودار روزانه
            </h1>
          </div>
          <div className="w-full min-h-[180px] md:min-h-96  flex flex-col md:flex-row gap-5 items-center justify-between">
            <div className="w-full">
              <Line data={data} options={options} style={containerStyle}></Line>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
