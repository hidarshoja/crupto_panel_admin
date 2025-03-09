import  {useState , useEffect} from 'react';
import UserBox from "../../components/UserBox3";
import UserBox5 from '../../components/UserBox5';
import axios from 'axios';
import axiosClient2 from '../../axios-client2';


export default function TableTransactionStatus({selectedValue  , startDate , endDate}) {
  const [userId, setUserId] = useState(null);
  const [userIdSt, setUserIdSt] = useState(null);
    const [filters2, setFilters2] = useState({});
    const [filteredData2, setFilteredData2] = useState([]);
    const [autoOrders, setAutoOrders] = useState([]);
    const [strategiesList,setStrategiesList] = useState([]);
    const [countPage , setCountPage] = useState(1);
  const[totalPage , setTotalPage] = useState(0);
  const [exchange , setExchange] = useState([]);
  const [assets , setAssets] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    currency: "",
  });

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const fetchTransactions = async () => {
    try {
      const response = await axiosClient2.get("/exchanges");
      setExchange(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const fetchTransactionsAssetes = async () => {
    try {
      const endpoint = `/assets`;
      const response = await axiosClient2.get(endpoint);
        setAssets(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } 
  };
  const fetchAutoOrders = async () => {
    console.log(`startData`, startDate);
    console.log(`endDate`, endDate);
    try {
    
      const endpoint = `/auto-orders?page=${countPage}${
        userId ? `&f[user_id]=${userId}` : ""
      }${
        userIdSt ? `&f[strategy_id]=${userIdSt}` : ""
      }${filters.type ? `&f[type]=${filters.type}` : ""}${
        filters.status ? `&f[status]=${filters.status}` : ""
      }${filters.currency ? `&f[asset_id]=${filters.currency}` : ""}${
        selectedValue ? `&user_type=${selectedValue}` : ""
      }${
        startDate ? `&start_date=${startDate}` : ""
      }${
        endDate ? `&end_date=${endDate}` : ""
      }`;

      const response = await axiosClient2.get(endpoint);
      setAutoOrders(response.data.data);
      setTotalPage(response.data.meta.last_page);
    } catch (error) {
      console.error("Error fetching auto orders:", error);
    }
  };

  const fetchStrategies = async () => {
    try {
      const response = await axiosClient2.get(`/strategies`);
      setStrategiesList(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
   
    fetchAutoOrders();
  }, [countPage , userId , filters.type, filters.currency ,userIdSt , selectedValue , startDate , endDate]);
useEffect(() => {
  fetchTransactions();
  fetchTransactionsAssetes();
  fetchStrategies();
},[])

  return (
    <>
    <div className='flex items-center justify-between py-5'>
    <div className="w-full md:w-1/5 flex flex-col mt-[-3px]">
          <label
            htmlFor="userFilter"
            className="block text-gray-700 text-sm font-bold pb-2 w-28"
          >
            نام صرافی:
          </label>
          <UserBox
            people={exchange}
            setUserId={setUserId}
          />
        </div>
        <div className="w-full md:w-1/5 flex flex-col mt-[-3px]">
          <label
            htmlFor="userFilter"
            className="block text-gray-700 text-sm font-bold pb-2 w-28"
          >
            نام استراتژی:
          </label>
          <UserBox5
            people={strategiesList}
            setUserId={setUserIdSt}
          />
        </div>
         {/* فیلتر نوع معامله */}
         <div className="w-full md:w-1/5">
          <label
            htmlFor="type"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            فیلتر نوع معامله
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">همه</option>
            <option value="1">خرید</option>
            <option value="-1">فروش</option>
          </select>
        </div>
        <div className="w-full md:w-1/5">
          <label
            htmlFor="currency"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            فیلتر ارز معامله
          </label>
          <select
            id="currency"
            name="currency"
            value={filters.currency}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">همه</option>
            {assets?.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name_fa} ({asset.name})
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleExportExcel}
          className="px-4 py-3 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
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
              نام استراتژی
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
                <td className="px-6 py-4 text-center text-sm text-gray-900">{parseInt(account.amount).toLocaleString()}</td>
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
