import  { useState , useEffect } from "react";
import axiosClient2 from "../../axios-client2";




export default function StableCondition() {
  const [status , setStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusCircle = (status) => {
    switch (status) {
      case true:
        return <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>;
      case false:
        return <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>;
      case "در انتظار بررسی":
        return <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/exchanges/status");
      
        setStatus(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = status?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(status?.length / itemsPerPage);


  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 mt-4">لیست صرافی‌ها</h3>
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
                وضعیت
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                زمان بررسی (دقیقه)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems?.length > 0 ? (
              currentItems?.map((exchange, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.id}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.name_fa}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      {getStatusCircle(exchange.status)}
                      <span>{exchange.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                  {exchange.last_updated_at ? new Date(exchange.last_updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}
            </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                  صرافی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
       {/* صفحه بندی */}
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
