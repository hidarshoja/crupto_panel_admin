import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient2 from "../../axios-client2"

export default function StreamViewTable() {
  const [accounts, setAccounts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accountId = params.get('accountId');
    const fetchTransactions = async () => {
      try {
        let endpoint = `strategies/status`;
        const response = await axiosClient2.get(endpoint);
        console.log(`response.data.data`, response.data.data);
        const filteredAccounts = response.data.data?.filter(acc => acc.id === Number(accountId));
      
        setAccounts(filteredAccounts);
    
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, [location.search]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'لغو شده':
        return 'bg-red-500 text-white';
      case 'در حال انجام':
        return 'bg-yellow-500 text-white';
      case "تایید شده":
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
            {accounts?.length > 0 ? (
              accounts?.map((account, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.title}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.type_label}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                  {new Intl.NumberFormat('fa-IR').format(Math.floor(Number(account.amount)))}
                     تومان</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.price}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.profit}</td>
                  <td className={`px-6 py-4 text-center text-sm font-medium ${getStatusClass(account?.last_auto_order.status_label)}`}>
                    {account?.last_auto_order.status_label}
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
