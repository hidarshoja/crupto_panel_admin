import React from "react";

export default function TableAccount() {
  const Accounts = [
    {
      sourceAccount: "123456789",
      accountHolderName: "علی رضایی",
      destinationAccount: "987654321",
      gatewayName: "درگاه پرداخت ملت",
      identifier: "ID12345",
    },
    {
      sourceAccount: "1122334455",
      accountHolderName: "سمیه محمدی",
      destinationAccount: "5566778899",
      gatewayName: "درگاه پرداخت سامان",
      identifier: "ID67890",
    },
    {
      sourceAccount: "9988776655",
      accountHolderName: "حسین شریفی",
      destinationAccount: "4433221100",
      gatewayName: "درگاه پرداخت پاسارگاد",
      identifier: "ID54321",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 mt-4">لیست حساب‌ها و شناسه‌ها</h3>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                حساب مبدا
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام صاحب حساب
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                حساب مقصد
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام درگاه
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                شناسه
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Accounts.length > 0 ? (
              Accounts.map((account, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.sourceAccount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.accountHolderName}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.destinationAccount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.gatewayName}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.identifier}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  حسابی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
