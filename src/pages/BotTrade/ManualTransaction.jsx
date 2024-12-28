import  { useState } from "react";
import axios from "axios";

export default function ManualTransaction() {
  const [formData, setFormData] = useState({
    transaction: "",
    exchange: "",
    currency: "",
    amount: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      transaction: "",
      exchange: "",
      currency: "",
      amount: "",
      price: "",
    });
  };

  const handleCheck = async () => {
   console.log(`formData`, formData);
    try {
      const response = await axios.post("https://jsonplaceholder.org/posts", formData);
      console.log("Response:", response.data);
      alert("اطلاعات با موفقیت ارسال شد");
    } catch (error) {
      console.error("Error:", error);
      alert("ارسال اطلاعات ناموفق بود");
    }
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">معامله دستی</h1>
      <div className="flex w-full flex-col md:flex-row gap-3 mt-6">
        {/* نوع معامله */}
        <div className="w-full md:w-1/3">
          <label htmlFor="transaction" className="block text-sm font-medium leading-6 text-gray-900">
            نوع معامله :
          </label>
          <select
            id="transaction"
            name="transaction"
            value={formData.transaction}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">انتخاب کنید ...</option>
            <option value="buy">خرید</option>
            <option value="sell">فروش</option>
          </select>
        </div>

        {/* نوع صرافی */}
        <div className="w-full md:w-1/3">
          <label htmlFor="exchange" className="block text-sm font-medium leading-6 text-gray-900">
            نوع صرافی :
          </label>
          <select
            id="exchange"
            name="exchange"
            value={formData.exchange}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">انتخاب کنید ...</option>
            <option value="Newbex">نیوبیکس</option>
            <option value="November Teter">آبان تتر</option>
            <option value="Lidia">لیدیا</option>
            <option value="Tetherland">تترلند</option>
          </select>
        </div>

        {/* نوع ارز */}
        <div className="w-full md:w-1/3">
          <label htmlFor="currency" className="block text-sm font-medium leading-6 text-gray-900">
            نوع ارز:
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">انتخاب کنید ...</option>
            <option value="usdt">USDT</option>
            <option value="tether">تتر</option>
            <option value="btc">بیت‌کوین</option>
            <option value="eth">اتریوم</option>
          </select>
        </div>
      </div>

      {/* مقدار و قیمت */}
      <div className="flex w-full flex-col md:flex-row gap-3 mt-6">
        <div className="w-full md:w-1/2">
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            مقدار :
          </label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            قیمت :
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex w-full items-center justify-end gap-3 mt-6">
        <button
          onClick={handleCheck}
          className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 md:px-8 rounded"
        >
          بررسی
        </button>
        <button
          onClick={handleCancel}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:px-8"
        >
          لغو
        </button>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:px-8"
        >
          ثبت
        </button>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-lg font-bold text-center mb-4">نتایج معامله</h2>
      
      {/* میزان انجام شده */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold">میزان انجام شده:</p>
        <p className="text-lg font-bold text-green-600">80%</p>
      </div>
      
      {/* میزان خرید یا فروش */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold">میزان خرید/فروش:</p>
        <select 
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={formData.transaction}
          onChange={(e) => setFormData({ ...formData, transaction: e.target.value })}
        >
          <option value="خرید">خرید</option>
          <option value="فروش">فروش</option>
        </select>
      </div>
      
      {/* صرافی */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold">صرافی:</p>
        <select 
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={formData.exchange}
          onChange={(e) => setFormData({ ...formData, exchange: e.target.value })}
        >
          <option value="نیوبیکس">نیوبیکس</option>
          <option value="آبان تتر">آبان تتر</option>
          <option value="بیت لند">بیت لند</option>
        </select>
      </div>
      
      {/* محاسبه میانگین قیمت و سود */}
      <div className="mb-4">
        <p className="text-gray-600 font-semibold">میانگین قیمت:</p>
        <p className="text-lg font-bold">
         ۱۰۰۰۰۰۰۰ ریال
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-600 font-semibold">سود:</p>
        <p className="text-lg font-bold text-blue-600">
          ۳۰۰۰۰۰۰ ریال
        </p>
      </div>
      
      {/* دکمه‌ها */}
      <div className="flex justify-between mt-6">
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(false)}
        >
          بستن
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          ادامه
        </button>
        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          توقف
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
}
