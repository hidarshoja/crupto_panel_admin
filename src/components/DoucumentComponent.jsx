
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

export default function DocumentComponent() {
  const [userType, setUserType] = useState("کاربر"); 
  const [formData, setFormData] = useState({
    type: '',
    currencyType: '',
    amount: '',
    documentNumber: '',
    source: '',
    documentType: '',
    description: '',
  });

  const navigate = useNavigate();

  // برای بروزرسانی مقادیر فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // پاک کردن فرم
  const handleCancel = () => {
    toast.error(" تمام اطلاعات ریست شد!");
    setFormData({
      type: '',
      currencyType: '',
      amount: '',
      documentNumber: '',
      source: '',
      documentType: '',
      description: '',
    });
  };

  // ارسال اطلاعات به API
  const handleSubmit = async () => {
    if (
        !formData.type ||
        !formData.currencyType ||
        !formData.amount 
       
      ) {
       
        toast.error("لطفاً تمام فیلدهای ضروری را پر کنید.");
        return;
      }
    try {
      await axios.post('https://jsonplaceholder.org/users', formData);
      toast.success("اطلاعات با موفقیت ثبت شد!");
     console.log(`formData`, formData);
    } catch (error) {
      console.error('ارسال اطلاعات با مشکل مواجه شد', error);
    }
  };


  return (
    <div className=" rounded-lg shadow-lg mt-10">
      <div className="mb-4">
        <label
          htmlFor="userType"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          نوع کاربر:
        </label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="block w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="کاربر">کاربر</option>
          <option value="صرافی">صرافی</option>
        </select>
      </div>

      <div className="mt-6">
        {userType === "کاربر" ? (
          <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">بخش ۱</h2>
            <p className="text-gray-700">این بخش برای کاربران عادی است.</p>
          </div>
        ) : (
            <div className="p-4 bg-green-50 border w-full flex flex-wrap gap-6 border-green-300 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
                <span className="text-sm font-semibold pl-2">نوع:</span>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">انتخاب کنید</option>
                  <option value="1">برداشت</option>
                  <option value="2">واریز</option>
                </select>
              </div>
      
              <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
                <span className="text-sm font-semibold pl-2">نوع ارز:</span>
                <select
                  name="currencyType"
                  value={formData.currencyType}
                  onChange={handleChange}
                  className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">انتخاب کنید</option>
                  <option value="1">ریال</option>
                  <option value="2">BTC</option>
                  <option value="3">ETH</option>
                  <option value="4">SOL</option>
                </select>
              </div>
            </div>
      
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
                <span className="text-sm font-semibold pl-2">مبلغ بر اساس ارز پایه:</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="مبلغ را وارد کنید"
                  className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
                <span className="text-sm font-semibold pl-2">شماره سند بدل:</span>
                <input
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  placeholder="شماره سند را وارد کنید"
                  className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
      
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
                <span className="text-sm font-semibold pl-2">از محل:</span>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">انتخاب کنید</option>
                  <option value="1">درگاه بیت</option>
                  <option value="2">درگاه تومان</option>
                  <option value="3">حساب بانکی</option>
                  <option value="4">حساب مشتری</option>
                  <option value="5">شخصی</option>
                </select>
              </div>
      
              <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
                <span className="text-sm font-semibold pl-2">کلیت سند:</span>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                   <option value="">انتخاب کنید</option>
                  <option value="1">اصلاحی</option>
                  <option value="2">قطعی</option>
                </select>
              </div>
            </div>
      
            <div className="flex flex-col gap-1 items-start w-full">
              <span className="text-sm font-semibold pl-2">توضیحات:</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="توضیحات را وارد کنید"
                rows="4"
                className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
      
            {/* دکمه‌ها */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                انصراف
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                بازگشت
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                ثبت
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
