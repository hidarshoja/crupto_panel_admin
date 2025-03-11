import  { useState , useEffect } from "react";
import DocumentComponentUser from "../components/user/DoucumentComponentUser";
import { CiSearch } from "react-icons/ci";
import axiosClient2 from "../axios-client2";
import { toast } from "react-toastify";

export default function DocumentPage() {
  const [assets , setAssets] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint = `/assets`;
  
        const response = await axiosClient2.get(endpoint);
          console.log(response.data.data);
          
          setAssets(response.data.data);
  
       
      } catch (error) {
        if (error.response && error.response.data) {
          const { message, errors } = error.response.data;
          toast.error(message || "خطا در ارسال اطلاعات!");
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              errorMessages.forEach((errorMessage) => {
                toast.error(errorMessage);
              });
            });
          }
        } else {
          toast.error("خطا در ارسال اطلاعات!");
        }
      } 
    };
  
    fetchTransactions();
  }, []);
  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">
        سند واریز / سند برداشت (کاربر)
      </h1>
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-sm font-semibold pl-2">جستجوی سند :</span>
          <div className="flex items-center border border-gray-300 rounded-md w-full md:w-[250px]">
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
          <div className="flex items-center border border-gray-300 rounded-md w-full md:w-[250px]">
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

      <DocumentComponentUser assets={assets} />
    </div>
  );
}
