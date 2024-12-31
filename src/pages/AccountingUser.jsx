import  { useState, useEffect } from 'react';
import BoxAccountUser from '../components/user/BoxAccountUser';
import TransactionsUser from '../components/user/TransactionsUser';

export default function AccountingUser() {
  const [selectedValue, setSelectedValue] = useState("4");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://jsonplaceholder.org/users?filter=${selectedValue}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedValue]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const handleExportExcel = async () => {
    const payload = {
      filters,  
      data: filteredData,
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
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">حسابداری</h1>
     <div className='flex flex-col gap-2 items-start'>
      <span className='text-sm font-semibold pl-2'>فیلتر براساس :</span>  
     <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="bg-gray-100 border w-[250px] border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="1">همه</option>
        <option value="2">کاربران API</option>
        <option value="3">  بات ترید</option>
        <option value="4">کاربران</option>
      </select>
     </div>
     <BoxAccountUser />
     <div className='flex items-center justify-between'>
     <h1 className="text-lg font-bold mb-4 mt-4">لیست معاملات</h1>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          خروجی اکسل
        </button>
     </div>
     <TransactionsUser />
    </div>
  );
}