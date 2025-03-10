import  { useState, useEffect } from 'react';
import BoxAccount from '../../components/BoxAccount';
import BoxAccountAll from "../../components/BoxAccountAll";
import Transactions from '../../components/Transactions';
import axios from 'axios';
import axiosClient2 from '../../axios-client2';

export default function Accounting() {
  const [selectedValue, setSelectedValue] = useState("2");
  const [exchange , setExchange] = useState([]);
  const [userId, setUserId] = useState(null);
  const [assets , setAssets] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 

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
  
  const fetchUsers = async () => {
    try {
      let url = "/exchanges/liabilities";
      if (userId) {
        url = `/exchanges/liabilities?exchanges[0]=${userId}${
          selectedValue ? `&user_type=${selectedValue}` : ""
        }`;
      } else if (selectedValue) {
        url = `/exchanges/liabilities?user_type=${selectedValue}`;
      } else if (selectedValue === "") {
        url = "/exchanges";
      }
      const response = await axiosClient2.get(url);
      if(selectedValue !== ""){
        if (response.data.data) {
          let data = response.data.data
      
  const arrayData = Object.values(data).flat().reduce((acc, item) => {
    const existingExchange = acc.find((ex) => ex.exchange_id === item.exchange_id);
    if (existingExchange) {
      existingExchange.assets.push({
        asset_name_fa: item.asset_name_fa,
        total_amount: item.total_amount,
        total_price: item.total_price,
        img : item.exchange_logo
      });
    } else {
      acc.push({
        exchange_id: item.exchange_id,
        exchange_name_fa: item.exchange_name_fa,
        img : item.exchange_logo,
        assets: [
          {
            asset_name_fa: item.asset_name_fa,
            total_amount: item.total_amount,
            total_price: item.total_price,
          },
        ],
      });
    }
    return acc;
  }, []);
  setFilteredData(arrayData);
        } else {
          setExchange(response.data.data)
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  
  useEffect(() => {
    fetchUsers(); 
  }, [userId , selectedValue]); 

  useEffect(() => {
   
    fetchTransactions();
    fetchTransactionsAssetes();
  }, []);


  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [filters, setFilters] = useState({});
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
     <div className='flex flex-col gap-2 items-start '>
      <span className='text-sm font-semibold pl-2'>فیلتر براساس :</span>  
     <select
        value={selectedValue}
        onChange={handleSelectChange}
        className="bg-gray-100 border w-[250px] border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">همه</option>
        <option value="3">کاربران API</option>
        <option value="2" selected>  بات ترید</option>
        <option value="1">کاربران</option>
      </select>
     </div>
     {
        selectedValue !== "" &&
      <BoxAccount
        exchangeWallet={filteredData}
        assets={assets}
        exchange={exchange}
        setUserId={setUserId}
      />
      }
       {
        selectedValue === "" &&
      <BoxAccountAll
        assets={assets}
        exchangeWallet={filteredData}
        exchange={exchange}
        setUserId={setUserId}
      />
      }
     <div className='flex items-center justify-between mt-6'>
     <h1 className="text-lg font-bold mb-4 mt-4">لیست معاملات</h1>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          خروجی اکسل
        </button>
     </div>
     <div className='mt-8'>
     <Transactions assets ={assets} selectedValue={selectedValue}/>
     </div>
    </div>
  );
}

