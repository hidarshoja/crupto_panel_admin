import  { useState , useEffect } from "react";
import DocumentComponent from "../components/DoucumentComponent";
import { CiSearch } from "react-icons/ci";
import UserBox from "../components/UserBox4";
import axiosClient2 from "../axios-client2";
import axios from "axios";

export default function DocumentPage() {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [users , setUsers] = useState([]);
  const [isUsersInitialized, setIsUsersInitialized] = useState(false);
   const [userId, setUserId] = useState(null);
   const [assets , setAssets] = useState([]);

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const endpoint = `/users?${userId ? `${userId}` : ""}`;

      const response = await axiosClient2.get(endpoint);
        console.log(response.data.data);
        
      setUsers(response.data.data);

      if (!isUsersInitialized) {
        const users = response.data.data.map((item) => item?.name);
        const uniqueUsers = Array.from(
          new Map(users.map((user) => [user.id, user])).values()
        );
        setUsers(uniqueUsers);
        setIsUsersInitialized(true);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } 
  };

  fetchTransactions();
}, [userId , isUsersInitialized]);

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

useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const endpoint = `/assets`;

      const response = await axiosClient2.get(endpoint);
        
        setAssets(response.data.data);

     
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } 
  };

  fetchTransactions();
}, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-md font-semibold mb-4 mt-4">سند واریز / سند برداشت (مشتریان api)</h1>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          خروجی اکسل
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <div className="w-full flex flex-col mt-[-3px]">
          <label
            htmlFor="userFilter"
            className="block text-gray-700 text-sm font-bold pb-2 w-28"
          >
            نام کاربر:
          </label>
          <UserBox
            people={users}
            setUserId={setUserId}
          />
        </div>
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-sm font-semibold pl-2">جستجوی سند :</span>
          <div className="flex items-center border border-gray-300 rounded-md w-full">
            <input
              type="text"
              placeholder="جستجو کنید"
              className=" w-full p-2 rounded-md focus:outline-none   pl-8" 
            />
            <i className="text-gray-500 pl-2">
              <CiSearch /> 
            </i>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-sm font-semibold pl-2">جستجوی txId :</span>
          <div className="flex items-center border border-gray-300 rounded-md w-full">
            <input
              type="text"
              placeholder="جستجو کنید"
              className=" w-full p-2 rounded-md focus:outline-none  pl-8"
            />
            <i className="text-gray-500 pl-2">
              <CiSearch /> 
            </i>
          </div>
        </div>
      </div>

      <DocumentComponent assets={assets}/>
    </div>
  );
}
