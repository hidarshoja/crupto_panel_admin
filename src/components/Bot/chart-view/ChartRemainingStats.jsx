import React from "react";

export default function ChartRemainingStats() {
  const exchanges = [
    {
      id: 1,
      name: "صرافی نوبیتکس",
      logo: "/img/nobitex.png",
      totalBuy: 150000000,
      totalAssets: 50000000,
      totalSell: 100000000,
    },
    {
      id: 2,
      name: "صرافی ویکی",
      logo: "/img/wiki.png",
      totalBuy: 200000000,
      totalAssets: 75000000,
      totalSell: 125000000,
    },
    {
      id: 3,
      name: "صرافی تبدیل",
      logo: "/img/tabdil.png",
      totalBuy: 150000000,
      totalAssets: 50000000,
      totalSell: 100000000,
    },
    {
      id: 4,
      name: "صرافی اوکی اکسچنج",
      logo: "/img/ok.png",
      totalBuy: 200000000,
      totalAssets: 75000000,
      totalSell: 125000000,
    },
    {
      id: 5,
      name: "صرافی بیت ",
      logo: "/img/bit.png",
      totalBuy: 150000000,
      totalAssets: 50000000,
      totalSell: 100000000,
    },
    {
      id: 6,
      name: "صرافی والکس",
      logo: "/img/wallex.png",
      totalBuy: 200000000,
      totalAssets: 75000000,
      totalSell: 125000000,
    },
    {
      id: 7,
      name: "صرافی سرمایکس",
      logo: "/img/sarmayex.png",
      totalBuy: 150000000,
      totalAssets: 50000000,
      totalSell: 100000000,
    },
    {
      id: 8,
      name: "صرافی ارز",
      logo: "/img/sarafi.png",
      totalBuy: 200000000,
      totalAssets: 75000000,
      totalSell: 125000000,
    },
    {
      id: 9,
      name: "صرافی نوبیتکس",
      logo: "/img/nobitex.png",
      totalBuy: 150000000,
      totalAssets: 50000000,
      totalSell: 100000000,
    },
    {
      id: 10,
      name: "صرافی ارز",
      logo: "/img/exir.png",
      totalBuy: 200000000,
      totalAssets: 75000000,
      totalSell: 125000000,
    },
    {
      id: 11,
      name: "صرافی والکس",
      logo: "/img/nobitex.png",
      totalBuy: 150000000,
      totalAssets: 50000000,
      totalSell: 100000000,
    },
    {
      id: 12,
      name: "صرافی تبدیل",
      logo: "/img/tabdil.png",
      totalBuy: 200000000,
      totalAssets: 75000000,
      totalSell: 125000000,
    },
   
  ];

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center ">
        
         {exchanges.map((exchange) => (
  <div
    className="p-6 bg-white/30 backdrop-blur-md shadow-lg rounded-lg text-center border border-gray-200 hover:shadow-2xl cursor-pointer hover:translate-y-[-5px] transition-transform duration-300"
    key={exchange.id}
  >
    <img
      src={exchange.logo}
      alt={`${exchange.name} Logo`}
      className="mx-auto mb-4 w-16 h-16 rounded-full border-2 border-gray-200"
    />
    <h3 className="text-lg font-medium text-gray-800">{exchange.name}</h3>
    <p className="text-gray-700 mt-2">
      <strong>موجودی:</strong> {exchange.totalBuy.toLocaleString("fa-IR")} ریال
    </p>
    <p className="text-gray-700">
      <strong>میزان ناترازی:</strong> {exchange.totalAssets.toLocaleString("fa-IR")} ریال
    </p>
    <p className="text-gray-700">
      <strong>موجودی کل:</strong> {exchange.totalSell.toLocaleString("fa-IR")} ریال
    </p>
  </div>
))}


    </div>
  );
}
