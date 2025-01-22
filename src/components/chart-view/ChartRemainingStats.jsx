import  { useEffect } from "react";
import axiosClient2 from "../../axios-client2";

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


  useEffect(() => {

    const fetchTransactions = async () => {
      try {
        const endpoint = `/exchanges/liabilities`;

        const response = await axiosClient2.get(endpoint);
        console.log("Response data:", response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {

    const fetchTransactions2 = async () => {
      try {
        const endpoint = `/exchanges/balance`;

        const response = await axiosClient2.get(endpoint);
        console.log("Response data:", response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTransactions2();
  }, []);
  

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center ">
         <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع ارز:
        </label>
        <div className="flex gap-2 items-center">
        <select
          id="operationFilter"
          className="border border-gray-300 w-2/3 rounded px-2 py-1"
        
        >
          <option value="all">همه</option>
          <option value="buy">مشتریان API</option>
          <option value="sell">BTC</option>
        </select>
        <div className="w-1/3 text-green-500">
          <span>خریداری شده :</span>
          <span>۱۲۰,۰۰۰,۰۰۰</span>
        </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع ارز:
        </label>
         <div className="flex items-center gap-1">
         <select
          id="operationFilter"
          className="border w-2/3 border-gray-300 rounded px-2 py-1"
        
        >
          <option value="all">همه</option>
          <option value="buy">مشتریان API</option>
          <option value="sell">BTC</option>
        </select>
        <div className="w-1/3 text-red-500">
          <span>فروخته شده :</span>
          <span>۱۲۰,۰۰۰,۰۰۰</span>
        </div>
         </div>
      </div>
         </div>
      {exchanges.map((exchange) => (
        <div
          className="group p-6 bg-gradient-to-br from-[#3ABEF9] to-[#3499d9] shadow-xl w-full md:w-[320px] rounded-lg text-center border border-gray-300 hover:shadow-2xl cursor-pointer hover:translate-y-[-5px] transition-all duration-300 hover:scale-105"
          key={exchange.id}
        >
          <div className="relative">
            <img
              src={exchange.logo}
              alt={`${exchange.name} Logo`}
              className="mx-auto mb-4 w-18 h-18 rounded-full border-2  group-hover:rotate-45 group-hover:scale-110 group-hover:border-slate-600 transition-transform duration-300"
            />
          
          </div>
          <h3 className="text-lg  text-gray-100">{exchange.name}</h3>
          <p className="text-gray-100 mt-2">
            <strong>کل ارزش خرید:</strong>{" "}
            {exchange.totalBuy.toLocaleString("fa-IR")} ریال
          </p>
          <p className="text-gray-100">
            <strong>میزان دارایی:</strong>{" "}
            {exchange.totalAssets.toLocaleString("fa-IR")} ریال
          </p>
          <p className="text-gray-100">
            <strong>کل ارز فروخته:</strong>{" "}
            {exchange.totalSell.toLocaleString("fa-IR")} ریال
          </p>
        </div>
      ))}
    </div>
  );
}
