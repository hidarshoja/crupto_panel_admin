import React from 'react';

export default function TableTransactionStatus() {
  const Accounts = [
    {
      documentNumber: '12345',
      date: '1402/10/15',
      customerName: 'علی رضایی',
      exchangeName: 'صرافی پارسی',
      transactionType: 'خرید',
      currencyType: 'دلار',
      amount: '1000',
      profit: '50',
    },
    {
      documentNumber: '67890',
      date: '1402/10/16',
      customerName: 'مریم موسوی',
      exchangeName: 'صرافی ایرانیان',
      transactionType: 'فروش',
      currencyType: 'یورو',
      amount: '2000',
      profit: '70',
    },
  ];

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              ردیف
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              شماره سند
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              تاریخ
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              نام مشتری
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              نام صرافی
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              نوع معامله
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              نوع ارز
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              مقدار
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              سود
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Accounts.length > 0 ? (
            Accounts.map((account, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.documentNumber}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.date}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.customerName}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.exchangeName}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.transactionType}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.currencyType}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.amount}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.profit}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                اطلاعاتی یافت نشد
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
