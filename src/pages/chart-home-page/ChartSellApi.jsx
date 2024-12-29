import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartSellApi() {
  const { chartType } = useParams();
  const location = useLocation();
  const chartType2 = new URLSearchParams(location.search).get("chartType");

  // Log for debugging
  console.log(`chartType2`, chartType2);
  console.log(`chartType`, chartType);

  // Data for each chart type
  const dataSets = {
    "chart_sell_api": [
      { x: "۱۴۰۲/۰۸/۰۱", y: 100, username: "علی", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۲", y: 200, username: "رضا", currency: "بیت کوین" },
      { x: "۱۴۰۲/۰۸/۰۳", y: 300, username: "محمد", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۶", y: 400, username: "زهرا", currency: "BTC" },
      { x: "۱۴۰۲/۰۸/۰۷", y: 500, username: "سارا", currency: "gold" },
      { x: "۱۴۰۲/۰۸/۰۹", y: 600, username: "حمید", currency: "ریال" },
    ],
    "chart_sell_user": [
      { x: "۱۴۰۲/۰۸/۰۱", y: 800, username: "علی", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۲", y: 700, username: "رضا", currency: "بیت کوین" },
      { x: "۱۴۰۲/۰۸/۰۳", y: 600, username: "محمد", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۶", y: 500, username: "زهرا", currency: "BTC" },
      { x: "۱۴۰۲/۰۸/۰۷", y: 400, username: "سارا", currency: "gold" },
      { x: "۱۴۰۲/۰۸/۰۹", y: 300, username: "حمید", currency: "ریال" },
    ],
    "chart_buy_api": [
      { x: "۱۴۰۲/۰۸/۰۱", y: 500, username: "علی", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۲", y: 400, username: "رضا", currency: "بیت کوین" },
      { x: "۱۴۰۲/۰۸/۰۳", y: 300, username: "محمد", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۶", y: 200, username: "زهرا", currency: "BTC" },
      { x: "۱۴۰۲/۰۸/۰۷", y: 300, username: "سارا", currency: "gold" },
      { x: "۱۴۰۲/۰۸/۰۹", y: 400, username: "حمید", currency: "ریال" },
    ],
    "chart_buy_user": [
      { x: "۱۴۰۲/۰۸/۰۱", y: 600, username: "علی", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۲", y: 700, username: "رضا", currency: "بیت کوین" },
      { x: "۱۴۰۲/۰۸/۰۳", y: 800, username: "محمد", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۶", y: 700, username: "زهرا", currency: "BTC" },
      { x: "۱۴۰۲/۰۸/۰۷", y: 600, username: "سارا", currency: "gold" },
      { x: "۱۴۰۲/۰۸/۰۹", y: 500, username: "حمید", currency: "ریال" },
    ],
    "chart_buy_bots": [
      { x: "۱۴۰۲/۰۸/۰۱", y: 200, username: "علی", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۲", y: 300, username: "رضا", currency: "بیت کوین" },
      { x: "۱۴۰۲/۰۸/۰۳", y: 400, username: "محمد", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۶", y: 500, username: "زهرا", currency: "BTC" },
      { x: "۱۴۰۲/۰۸/۰۷", y: 600, username: "سارا", currency: "gold" },
      { x: "۱۴۰۲/۰۸/۰۹", y: 700, username: "حمید", currency: "ریال" },
    ],
    "chart_sell_bots": [
      { x: "۱۴۰۲/۰۸/۰۱", y: 700, username: "علی", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۲", y: 600, username: "رضا", currency: "بیت کوین" },
      { x: "۱۴۰۲/۰۸/۰۳", y: 500, username: "محمد", currency: "تتر" },
      { x: "۱۴۰۲/۰۸/۰۶", y: 400, username: "زهرا", currency: "BTC" },
      { x: "۱۴۰۲/۰۸/۰۷", y: 500, username: "سارا", currency: "gold" },
      { x: "۱۴۰۲/۰۸/۰۹", y: 600, username: "حمید", currency: "ریال" },
    ],
  };

  // Determine chart colors based on the chart type
  const getColor = (type) => {
    if (type.includes("buy")) return "rgba(0, 128, 0, 0.6)"; // Green for buy
    return "rgba(255, 0, 0, 0.6)"; // Red for sell
  };

  const selectedData = dataSets[chartType] || dataSets["sell_api"];

  const data = {
    labels: selectedData.map((item) => item.x),
    datasets: [
      {
        label: "نمایش چارت",
        data: selectedData,
        backgroundColor: getColor(chartType),
        borderColor: getColor(chartType).replace("0.6", "1"), // Darker color for the border
        borderWidth: 2,
        tension: 0.3,
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

  return (
    <div>
      <h1 className="text-center mt-6 font-bold text-lg">نمودار {chartType2 || chartType}</h1>
      <Line data={data} options={options} />
    </div>
  );
}
