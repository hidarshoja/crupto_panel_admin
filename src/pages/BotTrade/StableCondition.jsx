import  { useState , useEffect } from "react";
import axiosClient2 from "../../axios-client2";




export default function StableCondition() {
  const [status , setStatus] = useState(null);
 const exchangeData = [
  { name: "صرافی نوبیتکس", status: "تایید شده", reviewTime: 5 },
  { name: "صرافی والکس", status: "رد شده", reviewTime: 10 },
  { name: "صرافی رمزینکس", status: "در انتظار بررسی", reviewTime: 15 },
  { name: "صرافی اکسیر", status: "تایید شده", reviewTime: 7 },
  { name: "صرافی بایننس", status: "رد شده", reviewTime: 20 },
];

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
        console.log(`response.data`, response.data);
        setStatus(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 mt-4">لیست صرافی‌ها</h3>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
            {status?.length > 0 ? (
              status?.map((exchange, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange?.exchange.name_fa}</td>
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
    </div>
  );
}
