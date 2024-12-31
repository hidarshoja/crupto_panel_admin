import { useState } from "react";
import UserBox from "../../components/UserBox4";
import axios from "axios";
const transactionsData = [
 {
   id: 1,
   date: "1402/08/15",
   time: "12:45",
   name: "علی احمدی",
   type: "خرید",
   amount: "123456",
   currency: "دلار",
   status: "تایید شده",
   description: "پرداخت از حساب کاربری",
 },
 {
   id: 2,
   date: "1402/08/16",
   time: "14:30",
   name: "محمد رضایی",
   type: "فروش",
   amount: "654321",
   currency: "یورو",
   status: "در انتظار بررسی",
   description: "بازگشت وجه",
 },
];
export default function BoxAccountBot() {
 const [filters2, setFilters2] = useState({});
 const [filteredData, setFilteredData] = useState(transactionsData);


const tableHeaders = [
  "تاریخ و ساعت",
  "کاربر معامله‌گر",
  "نوع معامله",
  "میزان شماره‌مند",
  "مبلغ",
  "ارز معامله",
  "وضعیت",
  "توضیحات",
];


const [userId, setUserId] = useState(null);
const [filters, setFilters] = useState({
  type: "همه",
  currency: "همه",
  status: "همه",
  date: "",
});

const handleFilterChange = (e) => {
  const { name, value } = e.target;
  setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
};

const filteredData2 = transactionsData.filter((transaction) => {
  const isUserMatch = userId ? transaction.id === userId : true;
  return (
    isUserMatch &&
    (filters.type === "همه" || transaction.type === filters.type) &&
    (filters.currency === "همه" || transaction.currency === filters.currency) &&
    (filters.status === "همه" || transaction.status === filters.status) &&
    (filters.date === "" || transaction.date.includes(filters.date))
  );
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
  return (
    <div className="mt-10">
      <div className='flex items-center justify-between'>
     <h1 className="text-lg font-bold mb-4 mt-4">لیست معاملات</h1>
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          خروجی اکسل
        </button>
     </div>
     <div className="mt-8 flow-root">
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        {/* فیلتر نام کاربر */}
        <div className="w-full md:w-1/4 flex flex-col mt-[-3px]">
          <label
            htmlFor="userFilter"
            className="block text-gray-700 text-sm font-bold pb-2 w-28"
          >
            نام کاربر:
          </label>
          <UserBox
            people={transactionsData}
            setUserId={setUserId}
          />
        </div>

        {/* فیلتر نوع معامله */}
        <div className="w-full md:w-1/4">
          <label htmlFor="type" className="block mb-1 text-sm font-medium text-gray-700">
            فیلتر نوع معامله
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="همه">همه</option>
            <option value="خرید">خرید</option>
            <option value="فروش">فروش</option>
          </select>
        </div>

        {/* فیلتر ارز معامله */}
        <div className="w-full md:w-1/4">
          <label htmlFor="currency" className="block mb-1 text-sm font-medium text-gray-700">
            فیلتر ارز معامله
          </label>
          <select
            id="currency"
            name="currency"
            value={filters.currency}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="همه">همه</option>
            <option value="دلار">دلار</option>
            <option value="یورو">یورو</option>
          </select>
        </div>

        {/* فیلتر وضعیت معامله */}
        <div className="w-full md:w-1/4">
          <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700">
            فیلتر وضعیت معامله
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="همه">همه</option>
            <option value="تایید شده">تایید شده</option>
            <option value="در انتظار بررسی">در انتظار بررسی</option>
            <option value="لغو شده">لغو شده</option>
          </select>
        </div>
      </div>

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-3 py-4 text-center text-sm font-semibold text-gray-900"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.date} - {transaction.time}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.type}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.amount}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.currency}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.status}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="px-3 py-4 text-sm text-gray-500 text-center"
                    >
                      موردی یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
