import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'; // آیکون برای مشاهده

export default function StreamView() {
 const [accounts, setAccounts] = useState([
  {
    id: 1,
    sourceAccount: '12345',
    accountHolderName: 'استراتژی الف',
    destinationAccount: '67890',
    gatewayName: 'گیت‌وی 1',
    isOngoingTransaction: true,
    transactionProgress: 45,
    profit: '500,000 تومان',
    exchangeName: 'صرافی 1',
    transactionType: 'خرید', 
    amount: '10,000', 
    price: '50,000 تومان', 
    status: 'در حال انجام', 
  },
  {
    id: 2,
    sourceAccount: '54321',
    accountHolderName: 'استراتژی مشارکت',
    destinationAccount: '98765',
    gatewayName: 'گیت‌وی 2',
    isOngoingTransaction: false,
    transactionProgress: 0,
    profit: '1,200,000 تومان',
    exchangeName: 'صرافی 2',
    transactionType: 'فروش',
    amount: '20,000',
    price: '45,000 تومان',
    status: 'تمام شده',
  },
  {
    id: 3,
    sourceAccount: '67890',
    accountHolderName: 'استراتژی سود در لحظه',
    destinationAccount: '54321',
    gatewayName: 'گیت‌وی 3',
    isOngoingTransaction: true,
    transactionProgress: 80,
    profit: '750,000 تومان',
    exchangeName: 'صرافی 3',
    transactionType: 'خرید',
    amount: '15,000',
    price: '60,000 تومان',
    status: 'در حال انجام',
  },
]);

  const navigate = useNavigate();

  const handleIconClick = (accountId) => {
    navigate(`/bot/streamViewTable?accountId=${accountId}`);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 mt-4">جدول نگاه جریانی</h3>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">آیدی</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">نام استراتژی</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">لیست معاملات در حال انجام</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">میزان سود کسب شده</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">جزییات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts?.length > 0 ? (
              accounts?.map((account, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.sourceAccount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.accountHolderName}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    {account.isOngoingTransaction ? (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${account.transactionProgress}%` }}
                        />
                        <span
                          className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 text-xs text-green-500"
                        >
                          {account.transactionProgress}%
                        </span>
                      </div>
                    ) : (
                      'تمام شده'
                    )}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.profit}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    <button onClick={() => handleIconClick(account.id)}>
                      <FaEye className="text-blue-500" size={20} />
                    </button>
                  </td>
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
