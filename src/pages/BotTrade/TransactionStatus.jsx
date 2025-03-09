import  { useState , useEffect } from "react";
import TableTransactionStatus from "../../components/Bot/TableTransactionStatus";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


export default function TransactionStatus() {
  const [selectedValue, setSelectedValue] = useState("3");
  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [dateBirth2, setDateBirth2] = useState(new DateObject());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const convertPersianToEnglishNumbers = (str) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
    let result = str;
    persianNumbers.forEach((persian, index) => {
      result = result.replace(new RegExp(persian, 'g'), englishNumbers[index]);
    });
  
    return result;
  };

  const handleFilterByDate = () => {
    const startDateFormatted = convertPersianToEnglishNumbers(dateBirth.format("YYYY-MM-DD"));
    const endDateFormatted = convertPersianToEnglishNumbers(dateBirth2.format("YYYY-MM-DD"));
    setStartDate(startDateFormatted); 
    setEndDate(endDateFormatted); 
  };

  const handleRemoveDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
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
        className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">همه</option>
        <option value="3" selected>مشتریان API</option>
        <option value="2">  بات ترید</option>
        <option value="1">کاربران</option>
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
      <button  onClick={handleRemoveDateFilter} className="bg-[#800505] hover:bg-[#f93aa3] text-white w-full text-sm md:w-1/6 px-4 mt-[23px]  rounded h-[43px]">حذف تاریخ</button>
      <button
        onClick={handleFilterByDate}
        className="bg-[#090580] hover:bg-[#3ABEF9] text-white w-full text-sm md:w-1/6 px-4 mt-[23px]  rounded h-[43px]"
      >
        فیلتر براساس تاریخ
            </button>
      </div>
      <div className="mt-8">
        <TableTransactionStatus selectedValue={selectedValue} startDate={startDate} endDate={endDate}/>
      </div>
    </div>
  );
}
