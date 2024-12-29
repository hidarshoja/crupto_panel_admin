import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
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

const salesData = [
  { month: "مهر", sales: 6000000 },
  { month: "آبان", sales: 3500000 },
  { month: "آذر", sales: 1000000 },
  { month: "دی", sales: 5200000 },
  { month: "بهمن", sales: 1800000 },
  { month: "اسفند", sales: 2500000 },
];

export default function SellingBots() {
  const [dataFetch, setDataFetch] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      setDataFetch(response.data);
     // console.log("مقدار چارت", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        display: false,
        label: "",
        data: salesData.map((data) => data.sales),
        borderColor: "#ff0000", // خط قرمز
        borderWidth: 2,
        pointBorderColor: "#ff0000", // نقاط قرمز
        pointBorderWidth: 2,
        tension: 0.5,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#fff"); // شروع گرادیان قرمز
          gradient.addColorStop(1, "white"); // پایان گرادیان سفید
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // مخفی‌کردن عنوان نمودار
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: false, // مخفی‌کردن متن محور y
        },
        grid: {
          display: false, // مخفی‌کردن خطوط شطرنجی y
        },
      },
      x: {
        ticks: {
          display: false, // مخفی‌کردن متن محور x
        },
        grid: {
          display: false, // مخفی‌کردن خطوط شطرنجی x
        },
      },
    },
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
    padding: "20px",
    cursor: "pointer",
  };

  return (
    <div className="w-full">
      <Line data={data} options={options} style={containerStyle}></Line>
    </div>
  );
}
