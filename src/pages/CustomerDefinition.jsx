import { useState } from "react";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { convertPersianToEnglish } from "../constant/DateJalili";
import { toast } from "react-hot-toast";

export default function CustomerDefinition() {
  const [dateBirth, setDateBirth] = useState(null);

  const initialFormState = {
    firstName: "",
    nationalCode: "",
    phoneNumber: "",
    birthDate: "",
    fatherName: "",
    buyCreditIRR: "",
    sellCreditIRR: "",
    gmail :"",
    selectedWallets: [],
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const wallets = ["ریال", "Tether", "BTC", "ETH", "SOL", "DAI", "GOLD"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // فیلتر کردن اعداد فقط برای فیلدهای مشخص
    const numericFields = [
      "nationalCode",
      "phoneNumber",
      "buyCreditIRR",
      "sellCreditIRR",
      "buyCreditUSD",
      "sellCreditUSD",
    ];

    const newValue = numericFields.includes(name)
      ? value.replace(/,/g, "").replace(/[^\d]/g, "") // فقط اعداد
      : value; // مقدار بدون تغییر برای سایر فیلدها

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleBlur = (e, currency) => {
    const { name, value } = e.target;

    // فرمت کردن اعداد بر اساس نوع واحد
    let formattedValue = value.replace(/,/g, "");
    if (currency === "IRR") {
      formattedValue = Number(formattedValue).toLocaleString("fa-IR");
    } else if (currency === "USD") {
      formattedValue = Number(formattedValue).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleCheckboxChange = (e, type) => {
    const { name, checked } = e.target;

    setFormData((prevState) => {
      const updatedArray = checked
        ? [...prevState[type], name]
        : prevState[type].filter((item) => item !== name);
      return {
        ...prevState,
        [type]: updatedArray,
      };
    });
  };

  const handleReset = () => {
    setFormData(initialFormState);
    toast.error(" تمام اطلاعات ریست شد!");
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.nationalCode ||
      !formData.phoneNumber ||
      !dateBirth
    ) {
      console.log("عررور");
      toast.error("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }

    try {
      const response = await axios.post(
        "https://jsonplaceholder.org/comments",
        formData
      );
      console.log("Response from server:", response.data);
      toast.success("اطلاعات با موفقیت ثبت شد!");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("خطا در ارسال اطلاعات!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">تعریف مشتری</h1>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* نام و نام خانوادگی */}
        <div className="mb-4 w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">
            نام و نام خانوادگی:
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* کد ملی */}
        <div className="mb-4 w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">کد ملی:</label>
          <input
            type="text"
            name="nationalCode"
            value={formData.nationalCode}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* شماره تماس */}
        <div className="mb-4 w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">شماره تماس:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* تاریخ تولد */}

        <div className="mb-4 w-full md:w-1/2">
          <label className="block text-sm font-medium mb-1">تاریخ تولد:</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={dateBirth}
            onChange={(selectedDate) => {
              setDateBirth(selectedDate);
              setFormData((prev) => ({
                ...prev,
                birthDate: convertPersianToEnglish(selectedDate?.toString()),
              }));
            }}
            inputClass="w-full outline-none rounded"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* نام پدر */}
        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">نام پدر:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* رمز عبور */}
        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">رمز عبور:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
         {/* نام ایمیل */}
         <div className="mb-4 w-full md:w-1/3" dir="ltr">
          <label className="block text-sm font-medium mb-1" dir="rtl"> ایمیل :</label>
          <input
            type="email"
            name="gmail"
            value={formData.gmail}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* حد اعتباری خرید و فروش */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* حد اعتباری خرید (ریال) */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            حد اعتباری  (ریالی):
          </label>
          <input
            type="text"
            name="buyCreditIRR"
            value={formData.buyCreditIRR.toLocaleString("fa-IR")}
            onChange={(e) => handleInputChange(e, "IRR")}
            onBlur={(e) => handleBlur(e, "IRR")}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-right"
            dir="rtl"
          />
          <span className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-500">
            ریال
          </span>
        </div>

        {/* حد اعتباری فروش (ریال) */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            حد اعتباری  (تتری):
          </label>
          <input
            type="text"
            name="sellCreditIRR"
            value={formData.sellCreditIRR.toLocaleString("fa-IR")}
            onChange={(e) => handleInputChange(e, "IRR")}
            onBlur={(e) => handleBlur(e, "IRR")}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-right"
            dir="rtl"
          />
          <span className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-500">
            ریال
          </span>
        </div>

      
      </div>

   

      {/* لیست کیف پول */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">لیست کیف پول:</label>
        <div className="flex items-center flex-wrap gap-3">
          {wallets.map((wallet) => (
            <label
              key={wallet}
              className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition ${
                formData.selectedWallets.includes(wallet)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-green-400 hover:text-white`}
            >
              <input
                type="checkbox"
                name={wallet}
                checked={formData.selectedWallets.includes(wallet)}
                onChange={(e) => handleCheckboxChange(e, "selectedWallets")}
                className="hidden"
              />
              <span className="text-sm">{wallet}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={
                  formData.selectedWallets.includes(wallet) ? "white" : "gray"
                }
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </label>
          ))}
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-600 text-gray-100 rounded hover:bg-red-700 transition"
        >
          انصراف
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-۷00 transition"
        >
          ثبت
        </button>
      </div>
    </div>
  );
}
