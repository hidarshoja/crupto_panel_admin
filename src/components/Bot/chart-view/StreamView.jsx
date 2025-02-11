import  { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import axiosClient2 from '../../../axios-client2';

export default function StreamView() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
 const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();
  const handleIconClick = (accountId) => {
    navigate(`/bot/streamViewTable?accountId=${accountId}`);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let endpoint = `strategies/status`;
  
      
  
        const response = await axiosClient2.get(endpoint);
        console.log(`response.data.data`, response.data.data);
   
      
        setAccounts(response.data.data);
    
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = accounts.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(accounts.length / itemsPerPage);

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
            {currentItems?.length > 0 ? (
              currentItems?.map((account, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.id}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">{account.title}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
  {parseInt(account.amount) ? (
    <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
      <div
        className="bg-green-500 h-2.5 rounded-full"
        style={{
          width: `${(account?.last_auto_order?.remain_amount 
            ? parseInt(account.amount) / account.last_auto_order.remain_amount 
            : parseInt(account.amount) / parseInt(account.amount)) - 1}%`
        }}
      />
      <span
        className="absolute top-[-18px] left-1/2 transform -translate-x-1/2 text-xs text-green-500"
      >
        {(account?.last_auto_order?.remain_amount 
          ? parseInt(account.amount) / account.last_auto_order.remain_amount 
          : parseInt(account.amount) / parseInt(account.amount)) - 1}%
      </span>
    </div>
  ) : (
    'تمام شده'
  )}
</td>

                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                  {new Intl.NumberFormat('fa-IR').format(Math.floor(Number(account.amount)))}
                     تومان</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-900">
                    <button onClick={() => handleIconClick(account.id)}>
                      <FaEye className="text-blue-500" size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
             
                
              <tr>
                
                <td></td>
                <td></td>
                <td
                  
                  className="py-20 text-center"
                >
                  <div className="flex justify-center items-center">
                    <svg
                      className="animate-spin h-10 w-10 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  </div>
                </td>
              </tr>
           
            )}
          </tbody>
        </table>
      </div>
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
    </div>
  );
}
