import  {useState , useEffect} from 'react';
import UserBox from "../../components/UserBox4";
import axios from 'axios';
import axiosClient2 from '../../axios-client2';

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

export default function TableTransactionStatus() {
  const [userId, setUserId] = useState(null);
    const [filters2, setFilters2] = useState({});
    const [filteredData2, setFilteredData2] = useState([]);
    const [autoOrders, setAutoOrders] = useState([]);
    const [countPage , setCountPage] = useState(1);
  const[totalPage , setTotalPage] = useState(0);

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

  useEffect(() => {
    const fetchAutoOrders = async () => {
      try {
        const response = await axiosClient2.get(`/auto-orders?page=${countPage}`);
        setAutoOrders(response.data.data);
        setTotalPage(response.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching auto orders:", error);
      }
    };

    fetchAutoOrders();
  }, [countPage]);

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
          {autoOrders?.length > 0 ? (
            autoOrders?.map((account, index) => (
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
           disabled={countPage === 1}
           onClick={() =>
             setCountPage((prev) => prev - 1)
           }
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <span>
        صفحه {countPage} از {totalPage}
        </span>
        <button
              disabled={countPage === totalPage}
              onClick={() =>
                setCountPage((prev) => prev + 1)
              }
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
      </div>
    </>
  );
}
