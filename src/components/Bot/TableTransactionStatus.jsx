import React , {useState} from 'react';
import UserBox from "../../components/UserBox4";
import axios from 'axios';

const Accounts = [
  {
    documentNumber: '12345',
    date: '1402/10/15',
    name: 'علی رضایی',
    exchangeName: 'صرافی پارسی',
    transactionType: 'خرید',
    currencyType: 'دلار',
    amount: '1000',
    profit: '50',
  },
  {
    documentNumber: '67890',
    date: '1402/10/16',
    name: 'مریم موسوی',
    exchangeName: 'صرافی ایرانیان',
    transactionType: 'فروش',
    currencyType: 'یورو',
    amount: '2000',
    profit: '70',
  },
];

export default function TableTransactionStatus({autoOrders}) {
  const [userId, setUserId] = useState(null);
   const [filteredData, setFilteredData] = useState(Accounts);
    const [filters2, setFilters2] = useState({});
    const [filteredData2, setFilteredData2] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

   const handleExportExcel = async () => {
    const payload = {
      filters2,  
      data: filteredData2,
    };
 
    try {
      const response = await axios.post("/api/export-excel", payload, {
        responseType: "blob", 
        headers: {
          "Content-Type": "application/json",
        },
      });
 
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.xlsx"); 
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert("مشکلی در ارتباط با سرور رخ داده است");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = autoOrders?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(autoOrders?.length / itemsPerPage);

  return (
    <>
    <div className='flex items-center justify-between py-5'>
    <div className="w-full md:w-1/4 flex flex-col mt-[-3px]">
          <label
            htmlFor="userFilter"
            className="block text-gray-700 text-sm font-bold pb-2 w-28"
          >
            نام کاربر:
          </label>
          <UserBox
            people={Accounts}
            setUserId={setUserId}
          />
        </div>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          خروجی اکسل
        </button>
    </div>
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
          {currentItems?.length > 0 ? (
            currentItems?.map((account, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.documentNumber}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">
                {new Date(account.created_at).toISOString().split('T')[0]}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">-</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.exchanges_name[0].name}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{account.type_label}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">تتر</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">{parseInt(account.amount)}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900">-</td>
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
    </>
  );
}
