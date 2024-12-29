import { useState } from 'react';
import { LiaSearchSolid } from "react-icons/lia";

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


const exchanges = [
  {
    id: 1,
    name: 'کویین',
    logo: '/img/coin.png',
    rial: { debt: 1000, credit: 500 },
    tether: { debt: 50, credit: 30 },
    btc: { debt: 0.5, credit: 0.2 },
    eth: { debt: 1, credit: 0.5 },
    sol: { debt: 20, credit: 10 },
    gold: { debt: 10, credit: 5 },
  },
  {
    id: 2,
    name: 'دجیتال',
    logo: '/img/digital.png',
    rial: { debt: 2000, credit: 1500 },
    tether: { debt: 70, credit: 40 },
    btc: { debt: 0.8, credit: 0.3 },
    eth: { debt: 1.5, credit: 0.7 },
    sol: { debt: 25, credit: 15 },
    gold: { debt: 12, credit: 6 },
  },
  {
    id: 3,
    name: 'فد',
    logo: '/img/feed.png',
    rial: { debt: 1000, credit: 500 },
    tether: { debt: 50, credit: 30 },
    btc: { debt: 0.5, credit: 0.2 },
    eth: { debt: 1, credit: 0.5 },
    sol: { debt: 20, credit: 10 },
    gold: { debt: 10, credit: 5 },
  },
  {
    id: 4,
    name: 'حسینی',
    logo: '/img/hosseini.png',
    rial: { debt: 2000, credit: 1500 },
    tether: { debt: 70, credit: 40 },
    btc: { debt: 0.8, credit: 0.3 },
    eth: { debt: 1.5, credit: 0.7 },
    sol: { debt: 25, credit: 15 },
    gold: { debt: 12, credit: 6 },
  },
];

export default function BoxAccount() {
  const [search, setSearch] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState({});

  const handleCurrencyChange = (exchangeId, currency) => {
    setSelectedCurrencies((prevState) => ({
      ...prevState,
      [exchangeId]: currency,
    }));
  };

  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.includes(search)
  );

  return (
    <div className="min-h-[400px]">
      <h1 className="text-xl font-bold text-center mb-8 text-gray-800 mt-4">
        لیست صرافی‌ها
      </h1>

      <div className='flex flex-col md:flex-row items-center gap-4 '>
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

      <div className="flex flex-wrap justify-center gap-3">
        {filteredExchanges.map((exchange) => {
          const selectedCurrency = selectedCurrencies[exchange.id] || "rial";

          return (
            <div
              key={exchange.id}
              className="bg-[#090580] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/3 lg:w-[260px]"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-md font-semibold text-gray-100">
                  {exchange.name}
                </h2>
                <img
                  src={exchange.logo}
                  alt={exchange.name}
                  className="w-8 h-8 rounded-full mr-4"
                />
              </div>

              <select
                value={selectedCurrency}
                onChange={(e) =>
                  handleCurrencyChange(exchange.id, e.target.value)
                }
                className="w-full border p-2 rounded-md mb-4 text-right"
              >
                {["rial", "tether", "btc", "eth", "sol", "gold"].map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <div className="text-gray-100">
    ارز انتخاب‌شده: {selectedCurrency}
  </div>
              <div className="space-y-2 text-center">
                <div className="text-red-500">
                  میزان طلب:{" "}
                  <span className="font-semibold">
                    {selectedCurrency === "btc" ||
                    selectedCurrency === "eth" ||
                    selectedCurrency === "sol" ||
                    selectedCurrency === "gold"
                      ? exchange[selectedCurrency].credit
                      : formatNumber(exchange[selectedCurrency].credit)} ت
                  </span>
                </div>
                <div className="text-green-500">
                  میزان بدهی:{" "}
                  <span className="font-semibold">
                    {selectedCurrency === "btc" ||
                    selectedCurrency === "eth" ||
                    selectedCurrency === "sol" ||
                    selectedCurrency === "gold"
                      ? exchange[selectedCurrency].debt
                      : formatNumber(exchange[selectedCurrency].debt)} ت
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
