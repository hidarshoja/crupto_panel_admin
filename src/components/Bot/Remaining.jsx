import { useEffect, useState } from "react";
import axiosClient2 from "../../axios-client2";

export default function Remaining() {
  const [remainData, setRemainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/exchanges/liabilities");
        setRemainData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

 
  const remainDataList = Object.values(remainData).flat();

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = remainDataList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(remainDataList.length / itemsPerPage);

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
                 #
              </th>
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
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center text-sm text-gray-500">
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-20 w-20 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  </div>
                  <span>منتظر بمانید ...</span>
                </td>
              </tr>
            ) : (
              currentItems.map((exchange, index) => (
                <tr key={index}>
                    <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.exchange_id}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.exchange_name_fa}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.asset_name_fa}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {new Intl.NumberFormat('fa-IR').format(Math.floor(Number(exchange.total_price)))} تومان
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {new Intl.NumberFormat('fa-IR').format(Math.floor(Number(exchange.total_amount)))} تومان
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">-</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">-</td>
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
            )}
          </tbody>
        </table>
      </div>

      {/* صفحه‌بندی */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <span>
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
      </div>
    </div>
  );
}
