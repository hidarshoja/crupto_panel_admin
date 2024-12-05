import  { useState } from 'react';

// تابع برای قالب‌بندی اعداد به صورت سه رقم سه رقم
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
    gold: { debt: 10, credit: 5 }
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
    gold: { debt: 12, credit: 6 }
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
    gold: { debt: 10, credit: 5 }
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
    gold: { debt: 12, credit: 6 }
  },
];

export default function BoxAccount() {
  const [search, setSearch] = useState("");

  // فیلتر کردن صرافی‌ها براساس مقدار جستجو
  const filteredExchanges = exchanges.filter((exchange) =>
    exchange.name.includes(search)
  );

  return (
    <div className="min-h-screen">
      <h1 className="text-xl font-bold text-center mb-8 text-gray-800 mt-4">لیست صرافی‌ها</h1>
      
      {/* بخش جستجو */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="نام صرافی را وارد کنید..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-full max-w-md text-right focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
  {filteredExchanges.map((exchange) => (
    <div
      key={exchange.id}
      className="bg-[#3abef9]  p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/3 lg:w-[260px]"
    >
      <div className="flex  items-center justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800">
          {exchange.name}
        </h2>
        <img
          src={exchange.logo}
          alt={exchange.name}
          className="w-8 h-8 rounded-full mr-4"
        />
      </div>
      <div className="space-y-4">
        {["rial", "tether", "btc", "eth", "sol", "gold"].map((currency) => (
          <div
            key={currency}
            className="border bg-white border-gray-300 rounded-md p-3"
          >
            <h3 className="text-md font-medium text-gray-700 text-center mb-2">
              {`واحد ${currency.charAt(0).toUpperCase() + currency.slice(1)}`}
            </h3>
            <div className="flex flex-col items-center">
              <div className="flex justify-between w-full text-gray-600 mb-2">
                <span className="text-red-500">میزان طلب:</span>
                <span className="font-semibold">
                  {currency === "btc" ||
                  currency === "eth" ||
                  currency === "sol" ||
                  currency === "gold"
                    ? exchange[currency].credit
                    : formatNumber(exchange[currency].credit)}
                </span>
              </div>
              <div className="flex justify-between w-full text-gray-600">
                <span className="text-green-500">میزان بدهی:</span>
                <span className="font-semibold">
                  {currency === "btc" ||
                  currency === "eth" ||
                  currency === "sol" ||
                  currency === "gold"
                    ? exchange[currency].debt
                    : formatNumber(exchange[currency].debt)}
                </span>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  ))}
</div>


    </div>
  );
}
