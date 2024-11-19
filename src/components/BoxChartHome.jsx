import React from "react";
import ChartComponent from "./ChartComponent";
import SellingCurrency from "./SellingCurrency";
import SellingUserCurrency from "./SellingUserCurrency";
import SellingBots from "./SellingBots";
import BuyBots from "./BuyBots";
import BuyCurrency from "./BuyCurrency";
import BuyUserCurrency from "./BuyUserCurrency";

export default function BoxChartHome() {
  let chartItem = [
    { id: 1, name: "فروش ارز", price: 1000000, chart: <SellingCurrency /> },
    { id: 2, name: "فروش ارز کاربر", price: 1000000, chart: <SellingUserCurrency /> },
    { id: 3, name: "فروش ارز بات ترید", price: 1300000, chart: <SellingBots /> },
    { id: 4, name: "خرید ارز بات ترید", price: 1500000, chart: <BuyUserCurrency /> },
    { id: 5, name: "خرید ارز کاربر", price: 1060000, chart: <BuyCurrency /> },
    { id: 6, name: "خرید ارز ", price: 1007000, chart: <BuyBots /> },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {chartItem?.map((item) => (
        <div key={item.id} className="group">
          <div
            className="w-[300px] h-[200px] bg-gray-100 rounded-xl shadow-lg p-4 flex flex-col items-center transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl"
          >
            <div className="flex-1 w-full">{item.chart}</div>
          </div>
          <h3 className="mt-3 text-lg font-bold text-gray-800 text-center group-hover:text-indigo-500 transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1 text-center group-hover:text-gray-800 transition-colors duration-300">
            قیمت: {item.price.toLocaleString()} تومان
          </p>
        </div>
      ))}
    </div>
  );
}
