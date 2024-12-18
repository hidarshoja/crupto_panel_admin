import { useState } from "react";
import { Bar } from "react-chartjs-2";
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
    { x: "۱۴۰۲/۰۸/۰۱", y: 100, type: "buy", username: "علی", currency: "تتر", exchange: "نیوبیکس" },
    { x: "۱۴۰۲/۰۸/۰۱", y: 150, type: "sell", username: "حسین", currency: "ریال", exchange: "نیما" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 500, type: "buy", username: "رضا", currency: "بیت کوین", exchange: "باران" },
    { x: "۱۴۰۲/۰۸/۰۲", y: 120, type: "sell", username: "فاطمه", currency: "SOL", exchange: "نیوبیکس" },
    { x: "۱۴۰۲/۰۸/۰۳", y: 170, type: "buy", username: "محمد", currency: "تتر", exchange: "نیما" },
    { x: "۱۴۰۲/۰۸/۰۴", y: 420, type: "sell", username: "مهدی", currency: "SOL", exchange: "باران" },
    { x: "۱۴۰۲/۰۸/۰۶", y: 500, type: "buy", username: "زهرا", currency: "BTC", exchange: "نیوبیکس" },
    { x: "۱۴۰۲/۰۸/۰۶", y: 120, type: "sell", username: "مهدی", currency: "SOL", exchange: "نیما" },
    { x: "۱۴۰۲/۰۸/۰۹", y: 520, type: "sell", username: "سارا", currency: "gold", exchange: "باران" },
    { x: "۱۴۰۲/۰۸/۰۹", y: 170, type: "buy", username: "حمید", currency: "ریال", exchange: "نیوبیکس" },
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
  const [filterExchange, setFilterExchange] = useState("all");

  const filteredData = defaultData.filter(
    (item) =>
      (filterCurrency === "all" || item.currency === filterCurrency) &&
      (filterExchange === "all" || item.exchange === filterExchange)
  );

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
        backgroundColor: "rgba(0, 128, 0, 0.3)",
        borderColor: "#006400",
        borderWidth: 2,
      },
      {
        label: "فروش",
        data: processedData.map((item) => item.sell),
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        borderColor: "#B22222",
        borderWidth: 2,
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
            return `مقدار: ${context.raw} - کاربر: ${username || "نامشخص"}`;
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
        beginAtZero: true,
      },
    },
  };

  const uniqueCurrencies = [...new Set(defaultData.map((item) => item.currency))];
  const uniqueExchanges = [...new Set(defaultData.map((item) => item.exchange))];

  return (
    <div>
      <div className="flex flex-col md:flex-row mt-6 gap-4 w-full">
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <label htmlFor="currencyFilter" className="block text-gray-700 text-sm font-bold">
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

        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <label htmlFor="exchangeFilter" className="block text-gray-700 text-sm font-bold">
            نام صرافی:
          </label>
          <select
            id="exchangeFilter"
            className="border border-gray-300 rounded px-2 py-1"
            value={filterExchange}
            onChange={(e) => setFilterExchange(e.target.value)}
          >
            <option value="all">همه</option>
            {uniqueExchanges.map((exchange, index) => (
              <option key={index} value={exchange}>
                {exchange}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h1 className="text-center font-bold text-lg mt-6">نمودار    نگاه آماری صرافی</h1>
      <Bar data={data} options={options} />
    </div>
  );
}
