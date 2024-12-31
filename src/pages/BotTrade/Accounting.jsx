import  { useState } from "react";
import { LiaSearchSolid } from "react-icons/lia";
import BoxAccountBot from "../../components/Bot/BoxAccountBot";

export default function Accounting() {
  const [selectedValue, setSelectedValue] = useState("3");
  const [selectedCurrencies, setSelectedCurrencies] = useState({});
   const [search, setSearch] = useState("");
  
   
  
   
  

  const handleCurrencyChange = (exchangeId, currency) => {
    setSelectedCurrencies((prevState) => ({
      ...prevState,
      [exchangeId]: currency,
    }));
  };
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const exchanges = [
    {
      id: 1,
      name: "کویین",
      logo: "/img/coin.png",
      rial: { debt: 1000, credit: 500 },
      tether: { debt: 50, credit: 30 },
      btc: { debt: 0.5, credit: 0.2 },
      eth: { debt: 1, credit: 0.5 },
      sol: { debt: 20, credit: 10 },
      gold: { debt: 10, credit: 5 },
    },
    {
      id: 2,
      name: "دجیتال",
      logo: "/img/digital.png",
      rial: { debt: 2000, credit: 1500 },
      tether: { debt: 70, credit: 40 },
      btc: { debt: 0.8, credit: 0.3 },
      eth: { debt: 1.5, credit: 0.7 },
      sol: { debt: 25, credit: 15 },
      gold: { debt: 12, credit: 6 },
    },
    {
      id: 3,
      name: "فد",
      logo: "/img/feed.png",
      rial: { debt: 1000, credit: 500 },
      tether: { debt: 50, credit: 30 },
      btc: { debt: 0.5, credit: 0.2 },
      eth: { debt: 1, credit: 0.5 },
      sol: { debt: 20, credit: 10 },
      gold: { debt: 10, credit: 5 },
    },
    {
      id: 4,
      name: "حسینی",
      logo: "/img/hosseini.png",
      rial: { debt: 2000, credit: 1500 },
      tether: { debt: 70, credit: 40 },
      btc: { debt: 0.8, credit: 0.3 },
      eth: { debt: 1.5, credit: 0.7 },
      sol: { debt: 25, credit: 15 },
      gold: { debt: 12, credit: 6 },
    },
  ];

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const filteredExchanges = exchanges.filter((exchange) =>
   exchange.name.includes(search)
 );

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">حسابداری</h1>
      <div className="flex flex-col md:flex-row gap-1 items-start md:items-center">
        <span className="text-sm font-semibold pl-2">فیلتر براساس :</span>
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="bg-gray-100 border w-[250px] border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">همه</option>
          <option value="2">کاربران API</option>
          <option value="3"> بات ترید</option>
          <option value="4">کاربران</option>
        </select>
      </div>
      {/* filter */}
        <div className='flex flex-col md:flex-row items-center gap-4 mt-8 '>
             <div className="mb-4 flex justify-center relative w-full md:w-1/3 border rounded-lg">
               <input
                 type="text"
                 placeholder="نام صرافی را وارد کنید..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className=" p-2 w-full text-right"
               />
               <LiaSearchSolid className='absolute left-1 top-3 cursor-pointer' />
             </div>
             <div className="mb-4 flex justify-center relative w-full md:w-1/3 border rounded-lg">
               <input
                 type="text"
                 placeholder="نام سند را وارد کنید..."
                 className=" p-2 w-full text-right"
               />
               <LiaSearchSolid className='absolute left-1 top-3 cursor-pointer' />
             </div>
             <div className="mb-4 flex justify-center relative w-full md:w-1/3 border rounded-lg">
               <input
                 type="text"
                 placeholder="نام txid را وارد کنید..."
                 className=" p-2 w-full text-right"
               />
               <LiaSearchSolid className='absolute left-1 top-3 cursor-pointer' />
             </div>
             </div>
      {/* طرح یک */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {filteredExchanges.map((exchange) => {
          const selectedCurrency = selectedCurrencies[exchange.id] || "rial";

          return (
            <div
              key={exchange.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full sm:w-1/3 lg:w-[260px] border border-gray-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {exchange.name}
                </h2>
                <img
                  src={exchange.logo}
                  alt={exchange.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
              </div>

              <select
                value={selectedCurrency}
                onChange={(e) =>
                  handleCurrencyChange(exchange.id, e.target.value)
                }
                className="w-full border p-3 rounded-md mb-4 bg-gray-50 text-gray-700"
              >
                {["rial", "tether", "btc", "eth", "sol", "gold"].map(
                  (currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  )
                )}
              </select>

              <div className="text-gray-700">
                ارز انتخاب‌شده: {selectedCurrency}
              </div>

              <div className="space-y-2 mt-4 text-center">
                <div className="text-red-500">
                  میزان طلب:{" "}
                  <span className="font-semibold">
                    {formatNumber(exchange[selectedCurrency].credit)} ت
                  </span>
                </div>
                <div className="text-green-500">
                  میزان بدهی:{" "}
                  <span className="font-semibold">
                    {formatNumber(exchange[selectedCurrency].debt)} ت
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <BoxAccountBot />
    </div>
  );
}
