import { useEffect, useState } from "react";
import axiosClient2 from "../../axios-client2";

export default function ChartRemainingStats() {
  const [exchanges, setExchanges] = useState({});
  const [selectedAsset, setSelectedAsset] = useState("");
  const [totalSold, setTotalSold] = useState(0);
  const [totalSold2, setTotalSold2] = useState(0);
  const [assets, setAssets] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let endpoint = `/exchanges/liabilities`;
        let queryParams = [];

        if (selectedAsset) {
          queryParams.push(`assets[0]=${selectedAsset}`);
        }
        if (selectedValue) {
          queryParams.push(`user_type=${selectedValue}`);
        }

        if (queryParams.length > 0) {
          endpoint += `?${queryParams.join("&")}`;
        }

        const response = await axiosClient2.get(endpoint);
        console.log(`response`, response.data.data);
        setExchanges(response.data.data);

        // محاسبه کل فروش برای نمایش در بالای صفحه
        const allTransactions = Object.values(response.data.data).flat();
        const soldAmount = allTransactions
          .filter(
            (t) =>
              t.type === 1 &&
              (!selectedAsset || t.asset_id === parseInt(selectedAsset))
          )
          .reduce((sum, t) => sum + parseFloat(t.total_price), 0);
        setTotalSold(soldAmount);
        const soldAmount2 = allTransactions
          .filter(
            (t) =>
              t.type === 2 &&
              (!selectedAsset || t.asset_id === parseInt(selectedAsset))
          )
          .reduce((sum, t) => sum + parseFloat(t.total_price), 0);
        setTotalSold2(soldAmount2);
      } catch (error) {
        console.log(`error`, error);
      }
    };

    fetchTransactions();
  }, [selectedAsset, selectedValue]);

  useEffect(() => {
    const fetchTransactionsAssetes = async () => {
      try {
        const endpoint = `/assets`;
        const response = await axiosClient2.get(endpoint);
        setAssets(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactionsAssetes();
  }, []);

  const handleAssetChange = (e) => {
    setSelectedAsset(e.target.value);
  };
  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center ">
      <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <label
            htmlFor="operationFilter"
            className="block text-gray-700 text-sm font-bold  w-28"
          >
            نوع مشتریان:
          </label>
          <div className="flex gap-2 items-center">
          <select
            id="userTypeFilter"
            value={selectedValue}
            onChange={handleSelectChange}
            className="bg-gray-100 border w-3/4 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">همه</option>
            <option value="3">مشتریان API</option>
            <option value="2">بات ترید</option>
            <option value="1">کاربران</option>
          </select>
            <div className="w-1/3 text-green-500 text-sm flex gap-1">
              <span>خریداری شده :</span>
              <span>{Number(totalSold2).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-1">
          <label
            htmlFor="operationFilter"
            className="block text-gray-700 text-sm font-bold  w-28"
          >
            نوع ارز:
          </label>
          <div className="flex items-center gap-1">
          <select
              id="operationFilter"
              className="border w-2/3 border-gray-300 rounded px-2 py-1"
              value={selectedAsset}
              onChange={handleAssetChange}
            >
              <option value="">همه</option>
              {assets?.map((wallet) => (
                <option key={wallet.id} value={wallet.related_asset}>
                  {wallet.name_fa} ({wallet.symbol})
                </option>
              ))}
            </select>
            <div className="w-1/3 text-red-500 text-sm flex gap1">
              <span>فروخته شده :</span>
              <span>{Number(totalSold).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      {Object.entries(exchanges).map(([exchangeId, transactions]) => {
          const firstTransaction = transactions[0];

          // محاسبه کل خرید (type=2)
          const totalBought = transactions
            .filter((t) => t.type === 2)
            .reduce((sum, t) => sum + parseFloat(t.total_price), 0);

          // محاسبه کل فروش (type=1)
          const totalSold = transactions
            .filter((t) => t.type === 1)
            .reduce((sum, t) => sum + parseFloat(t.total_price), 0);

          // محاسبه میزان دارایی (فروش - خرید)
          const remainingAssets = totalSold - totalBought;

          return (
            <div
              className="group p-6 bg-gradient-to-br from-[#3ABEF9] to-[#3499d9] shadow-xl w-full md:w-[320px] rounded-lg text-center border border-gray-300 hover:shadow-2xl cursor-pointer hover:translate-y-[-5px] transition-all duration-300 hover:scale-105"
              key={exchangeId}
            >
              <div className="relative">
                <img
                  src={`https://pars-v2.liara.run/${firstTransaction.exchange_logo}`}
                  alt={`${firstTransaction.exchange_name} Logo`}
                  className="mx-auto mb-4 w-16 h-16 rounded-full border-2 group-hover:rotate-15 group-hover:scale-30 group-hover:border-slate-600 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg text-gray-100">
                {firstTransaction.exchange_name_fa}
              </h3>
              <div className="mt-4 space-y-2">
                <div className="bg-white/10 p-2 rounded">
                  <p className="text-gray-100">
                    <strong>کل ارز خرید شده:</strong>{" "}
                    {Number(totalBought).toLocaleString()} ریال
                  </p>
                  <p className="text-gray-100">
                    <strong>کل ارز فروخته شده:</strong>{" "}
                    {Number(totalSold).toLocaleString()} ریال
                  </p>
                  <p className="text-gray-100">
                    <strong>میزان دارایی:</strong>{" "}
                    {Number(remainingAssets).toLocaleString()} ریال
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
