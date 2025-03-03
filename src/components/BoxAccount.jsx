import { useState, useEffect } from "react";
import UserBox from "../components/UserBox3";



export default function BoxAccount({ assets, exchangeWallet, exchange, setUserId }) {
  const [selectedCurrencies, setSelectedCurrencies] = useState({});
console.log(`exchangeWallet`, exchangeWallet);
  const handleCurrencyChange = (exchangeId, currency) => {
    setSelectedCurrencies((prev) => ({ ...prev, [exchangeId]: currency }));
  };
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
    }, 2000);

    return () => clearTimeout(timer);
  }, [exchangeWallet, assets]);



  if (loading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  const mergeExchangeAssets = (exchangeWallet) => {
    return exchangeWallet.map((exchange) => {
      const mergedAssets = {};
  
      exchange.assets.forEach(({ asset_name_fa, total_amount, total_price }) => {
        if (!mergedAssets[asset_name_fa]) {
          mergedAssets[asset_name_fa] = {
            asset_name_fa,
            total_amount: parseFloat(total_amount),
            total_price: parseFloat(total_price),
          };
        } else {
          mergedAssets[asset_name_fa].total_amount += parseFloat(total_amount);
          mergedAssets[asset_name_fa].total_price += parseFloat(total_price);
        }
      });
  
      return {
        ...exchange,
        assets: Object.values(mergedAssets), 
      };
    });
  };
  
  const result = mergeExchangeAssets(exchangeWallet);

  
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
      {result.map((exchange) => {
        const selectedCurrency = selectedCurrencies[exchange.exchange_id] || exchange.assets[0].asset_name_fa;
        const selectedAsset = exchange.assets.find((asset) => asset.asset_name_fa === selectedCurrency) || exchange.assets[0];

        return (
          <div
            key={exchange.exchange_id}
            className="bg-[#090580] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-1/3 lg:w-[260px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-semibold text-gray-100">{exchange.exchange_name_fa}</h2>
              <img
                src={`https://pars-v2.liara.run/${exchange.img}`} 
                alt={exchange.exchange_name_fa}
                className="w-8 h-8" />
            </div>

            <select
              value={selectedCurrency}
              onChange={(e) => handleCurrencyChange(exchange.exchange_id, e.target.value)}
              className="w-full border p-2 rounded-md mb-4 text-right"
            >
              {exchange.assets.map((currency , index) => (
                <option key={index} value={currency.asset_name_fa}>
                  {currency.asset_name_fa}
                </option>
              ))}
            </select>

            <div className="text-gray-100">
              ارز انتخاب‌شده: {selectedCurrency}
            </div>

            <div className="space-y-2 mt-4">
              <div className="text-red-500 flex justify-between">
                <span>میزان طلب:</span>
                <span className="font-semibold">{parseFloat(selectedAsset.total_amount).toLocaleString()} ت</span>
              </div>
              <div className="text-green-500 flex justify-between">
                <span>میزان بدهی:</span>
                <span className="font-semibold">{parseFloat(selectedAsset.total_price).toLocaleString()} ت</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    </div>
  );
}
