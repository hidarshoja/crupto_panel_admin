import  { useState } from "react";
import TableTransactionStatus from "../../components/Bot/TableTransactionStatus";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function TransactionStatus() {
  const [selectedValue, setSelectedValue] = useState("1");
  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [dateBirth2, setDateBirth2] = useState(new DateObject());

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      selectedValue,
      fromDate: dateBirth.format("YYYY-MM-DD"), // فرمت تاریخ
      toDate: dateBirth2.format("YYYY-MM-DD"),
    };
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4">وضعیت معاملات</h1>
      <div className="flex gap-3 w-full flex-col md:flex-row items-start md:items-center">
        <div className="flex flex-col w-full md:w-1/3 gap-2 items-start">
          <span className="text-sm font-semibold pl-2">فیلتر براساس :</span>
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="bg-gray-100 border w-full border-gray-300 px-2 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">همه</option>
            <option value="2">کاربران API</option>
            <option value="3">بات ترید</option>
            <option value="4">کاربران</option>
          </select>
        </div>
        <div className="flex flex-col w-full md:w-1/3 gap-2 items-start">
          <span className="text-sm font-semibold pl-2">از تاریخ :</span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={dateBirth}
            onChange={setDateBirth}
            calendarPosition="bottom-right"
            inputClass="custom-input"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/3 gap-2 items-start">
          <span className="text-sm font-semibold pl-2">تا تاریخ :</span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={dateBirth2}
            onChange={setDateBirth2}
            calendarPosition="bottom-right"
            inputClass="custom-input"
          />
        </div>
      </div>
      <div className="w-full flex items-start justify-end mt-8 gap-3">
        <button className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600">
          انصراف
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
        >
          جستجو
        </button>
      </div>
      <div className="mt-8">
        <TableTransactionStatus />
      </div>
    </div>
  );
}