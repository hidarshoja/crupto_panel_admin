import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartAllUsers() {
  const hourlyData = [
    { time: "08:00", profit: 100, type: "buy", username: "علی", currency: "تتر" },
    { time: "08:05", profit: 150, type: "sell", username: "رضا", currency: "بیت کوین" },
    { time: "08:10", profit: 200, type: "buy", username: "محمد", currency: "تتر" },
    { time: "08:15", profit: 250, type: "sell", username: "زهرا", currency: "BTC" },
    { time: "08:20", profit: 300, type: "buy", username: "سارا", currency: "gold" },
    { time: "08:25", profit: 350, type: "sell", username: "حمید", currency: "ریال" },
    { time: "08:30", profit: 400, type: "buy", username: "علیرضا", currency: "دلار" },
  ];

  const dailyData = [
    { day: "1402/08/01", profit: 1000, type: "buy", username: "علی", currency: "تتر" },
    { day: "1402/08/02", profit: 900, type: "sell", username: "رضا", currency: "بیت کوین" },
    { day: "1402/08/03", profit: 800, type: "buy", username: "محمد", currency: "تتر" },
    { day: "1402/08/04", profit: 700, type: "sell", username: "زهرا", currency: "BTC" },
    { day: "1402/08/05", profit: 600, type: "buy", username: "سارا", currency: "gold" },
    { day: "1402/08/06", profit: 500, type: "sell", username: "حمید", currency: "ریال" },
    { day: "1402/08/07", profit: 400, type: "buy", username: "علیرضا", currency: "دلار" },
  ];

  const hourlyChartData = {
    labels: hourlyData.map((item) => item.time),
    datasets: [
      {
        label: "سود ساعتی",
        data: hourlyData.map((item) => item.profit),
        borderColor: "#006400",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.3,
      },
    ],
  };

  const dailyChartData = {
    labels: dailyData.map((item) => item.day),
    datasets: [
      {
        label: "سود روزانه",
        data: dailyData.map((item) => item.profit),
        borderColor: "#00008B",
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
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
            const dataset = context.dataset.label === "سود ساعتی" ? hourlyData : dailyData;
            const item = dataset[index];
            return [
              `مبلغ: ${item.profit} تومان`,
              `نوع: ${item.type === "buy" ? "خرید" : "فروش"}`,
              `کاربر: ${item.username}`,
              `ارز: ${item.currency}`,
            ];
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
          text: "مبلغ سود (تومان)",
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
          text: "زمان",
          padding: { top: 10 },
          font: {
            size: 14,
            family: "vazir",
          },
        },
      },
    },
  };

  return (
    <div className="w-full py-10">
      <h1 className="text-center mt-6 font-bold text-lg">نمودار سود ساعتی</h1>
      <Line data={hourlyChartData} options={options} />

      <h1 className="text-center mt-6 font-bold text-lg">نمودار سود روزانه</h1>
      <Line data={dailyChartData} options={options} />
    </div>
  );
}
