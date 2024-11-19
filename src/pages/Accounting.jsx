import React, { useState, useEffect } from 'react';
import BoxAccount from '../components/BoxAccount';
import Transactions from '../components/Transactions';

export default function Accounting() {
  const [selectedValue, setSelectedValue] = useState("1");

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

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">حسابداری</h1>
      
     <div className='flex flex-col md:flex-row gap-1 items-start md:items-center'>
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
     <BoxAccount />
     <h1 className="text-lg font-bold mb-4 mt-4">لیست معاملات</h1>
     <Transactions />
    </div>
  );
}

