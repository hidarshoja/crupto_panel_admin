import React from "react";

export default function Remaining() {
  const RemainData = [
    {
      name: "صرافی احمدی",
      currency: "دلار",
      buyAmount: "1500",
      sellAmount: "1300",
      rialPayment: "7500000",
      currencyPayment: "200 دلار",
    },
    {
      name: "صرافی سمیه",
      currency: "یورو",
      buyAmount: "800",
      sellAmount: "600",
      rialPayment: "4500000",
      currencyPayment: "150 یورو",
    },
    {
      name: "صرافی هانیه",
      currency: "بیت‌کوین",
      buyAmount: "2",
      sellAmount: "1.5",
      rialPayment: "950000000",
      currencyPayment: "0.5 بیت‌کوین",
    },
  ];

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
            {RemainData.length > 0 ? (
              RemainData.map((exchange, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.name}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{exchange.currency}</td>
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
