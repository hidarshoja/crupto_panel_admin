import React from "react";




export default function StableCondition() {
 const exchangeData = [
  { name: "صرافی نوبیتکس", status: "تایید شده", reviewTime: 5 },
  { name: "صرافی والکس", status: "رد شده", reviewTime: 10 },
  { name: "صرافی رمزینکس", status: "در انتظار بررسی", reviewTime: 15 },
  { name: "صرافی اکسیر", status: "تایید شده", reviewTime: 7 },
  { name: "صرافی بایننس", status: "رد شده", reviewTime: 20 },
];

  const getStatusCircle = (status) => {
    switch (status) {
      case "تایید شده":
        return <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>;
      case "رد شده":
        return <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>;
      case "در انتظار بررسی":
        return <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>;
      default:
        return null;
    }
  };

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
            {exchangeData.length > 0 ? (
              exchangeData.map((exchange, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.name}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      {getStatusCircle(exchange.status)}
                      <span>{exchange.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.reviewTime}</td>
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
