import { useEffect , useState } from "react";
import axiosClient2 from "../../axios-client2";

export default function Remaining() {
  const [remainData, setRemainData] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/exchanges/balance");
        setRemainData(response.data.data);
        console.log(`response.data.data`, response.data.data);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [])
 

  const handleDetailsClick = (data) => {
    console.log("جزئیات ردیف:", data);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 mt-4">مانده صرافی‌ها</h3>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام صرافی
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نوع ارز
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                مقدار خرید
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                مقدار فروش
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                میزان پرداخت ریال
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                میزان پرداخت ارز
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                جزییات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {remainData?.length > 0 ? (
              remainData?.map((exchange, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.exchange?.name_fa}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.asset?.name_fa}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.buyAmount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.sellAmount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.rialPayment}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.currencyPayment}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    <button
                      onClick={() => handleDetailsClick(exchange)}
                      className="text-blue-500 hover:underline"
                    >
                      جزییات
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                  صرافی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
