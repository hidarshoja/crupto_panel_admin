import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function StreamViewTable() {
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
      status: 'لغو شده',
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

  const location = useLocation();
  const [filteredAccounts, setFilteredAccounts] = useState(accounts);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accountId = params.get('accountId');

    if (accountId) {
      const filtered = accounts.filter(account => account.id === parseInt(accountId));
      setFilteredAccounts(filtered);
    } else {
      setFilteredAccounts(accounts);
    }
  }, [location.search, accounts]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'لغو شده':
        return 'bg-red-500 text-white';
      case 'در حال انجام':
        return 'bg-yellow-500 text-white';
      case 'تمام شده':
        return 'bg-green-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 mt-4">جدول نگاه جریانی</h3>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">نام صرافی</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">نوع معامله</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">مقدار</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">میزان سود</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.exchangeName}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.transactionType}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.amount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.price}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.profit}</td>
                  <td className={`px-6 py-4 text-center text-sm font-medium ${getStatusClass(account.status)}`}>
                    {account.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
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
