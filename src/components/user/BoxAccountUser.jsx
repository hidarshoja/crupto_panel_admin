import { useState, useEffect } from "react";
import UserBox from "../../components/UserBox3";

function formatNumber(numberStr) {
  const integerPart = Math.floor(parseFloat(numberStr));
  return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function BoxAccount({ assets, exchangeWallet, exchange, setUserId }) {
  const [selectedCurrencies, setSelectedCurrencies] = useState({});
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => {
      const initialCurrencies = {};
      exchangeWallet?.forEach((exchange, index) => {
        if (exchange.defaultCurrency) {
          initialCurrencies[index] = exchange.defaultCurrency;
        } else if (assets?.length > 0) {
          initialCurrencies[index] = assets[0].name_fa;
        }
      });
      setSelectedCurrencies(initialCurrencies);
      setLoading(false); 
    }, 1500); 

    return () => clearTimeout(timer);
  }, [exchangeWallet, assets]);

  const handleCurrencyChange = (index, value) => {
    setSelectedCurrencies((prev) => ({ ...prev, [index]: value }));
    console.log(`Selected currency for index ${index}:`, value);
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[400px]">
      <h1 className="text-xl font-bold text-center mb-8 text-gray-800 mt-4">
        لیست صرافی‌ها
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/4 flex flex-col mt-[-3px] mb-6">
          <label htmlFor="userFilter" className="block text-gray-700 text-sm font-bold pb-2 w-28">
            نام صرافی:
          </label>
          <UserBox people={exchange} setUserId={setUserId} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {exchangeWallet?.map((exchange, index) => (
          <div
            key={`${index}`}
            className="bg-[#090580] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/3 lg:w-[260px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-semibold text-gray-100">
                {exchange?.exchange_name_fa}
              </h2>
            </div>

            <select
              value={selectedCurrencies[index] || ""}
              onChange={(e) => handleCurrencyChange(index, e.target.value)}
              className="w-full border p-2 rounded-md mb-4 text-right"
            >
              {assets?.map((currency) => (
                <option key={currency.id} value={currency.name_fa}>
                  {currency.name_fa}
                </option>
              ))}
            </select>
            <div className="text-gray-100">
              ارز انتخاب‌شده: {selectedCurrencies[index]}
            </div>
            <div className="space-y-2 text-center">
              <div className="text-red-500">
                میزان طلب:{" "}
                <span className="font-semibold">
                  {formatNumber(exchange?.total_amount)} ت
                </span>
              </div>
              <div className="text-green-500">
                میزان بدهی:{" "}
                <span className="font-semibold">
                  {formatNumber(exchange?.total_price)} ت
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
