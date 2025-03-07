import { useState , useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { convertPersianToEnglish } from "../constant/DateJalili";
import { toast } from "react-toastify";
import axiosClient2 from "../axios-client2";

export default function CustomerDefinition() {
  const [dateBirth, setDateBirth] = useState(null);
  const [assets , setAssets] = useState([]);

  const initialFormState = {
    name :"",
    lastname: "",
    national_code: "",
    mobile: "",
    birthdate: "",
    father_name: "",
    credit_irr_limit: "",
    credit_usdt_limit: "",
    email :"",
    assets: [],
    password: "",
    status: 100,
    user_api: true,
    type : "1",
    valid_ips : ["192.1.23.36"]
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint = `/assets`;
  
        const response = await axiosClient2.get(endpoint);
          console.log(response.data.data);
          
          setAssets(response.data.data);
  
       
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } 
    };
  
    fetchTransactions();
  }, []);

  const [formData, setFormData] = useState(initialFormState);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "credit_irr_limit" || name === "credit_usdt_limit" ) {
      const plainValue = value.replace(/,/g, '');
      const formattedValue = Number(plainValue).toLocaleString('en-US');
  
      setFormData((prev) => ({ ...prev, [name]: formattedValue })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };



  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    let updatedSelectedWallets;
  
    if (checked) {
      updatedSelectedWallets = [...formData.assets, value];
    } else {
      updatedSelectedWallets = formData.assets.filter(
        (asset) => asset !== value
      );
    }
  
    setFormData((prev) => ({
      ...prev,
      [field]: updatedSelectedWallets,
    }));
  };
  

  const handleReset = () => {
    setFormData(initialFormState);
    toast.error(" تمام اطلاعات ریست شد!");
  };

  const handleSubmit = async () => {
    if (
      !formData.lastname ||
      !formData.national_code ||
      !formData.mobile ||
      !dateBirth
    ) {
      console.log("عررور");
      toast.error("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }

    const formattedData = {
      ...formData,
      credit_irr_limit: Number(formData.credit_irr_limit.replace(/,/g, "")), 
      credit_usdt_limit: Number(formData.credit_usdt_limit.replace(/,/g, ""))
    };

    try {
      const response = await axiosClient2.post(
        "/users",
        formattedData
      );
      console.log("Response from server:", response.data);
      toast.success("اطلاعات کاربر با موفقیت ثبت شد");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("خطا در ارسال اطلاعات!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">تعریف کاربر </h1>

      <div className="flex flex-col md:flex-row items-center gap-6">
         {/* نام */}
         <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">
          نام  :
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        
        {/*  نام خانوادگی */}
        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">
            نام  خانوادگی:
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* کد ملی */}
        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">کد ملی:</label>
          <input
            type="text"
            name="national_code"
            value={formData.national_code}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* شماره تماس */}
        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">شماره تماس:</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* نوع */}
        <div className="mb-4 w-full md:w-1/3">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            نوع مشتری :
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className=" block w-full rounded-md border-0 py-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
          
        <option value="1" selected>کاربران</option>
        <option value="3">مشتریان API</option>
        <option value="2">  بات ترید</option>
          </select>
        </div>
        {/* تاریخ تولد */}

        <div className="mb-4 w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">تاریخ تولد:</label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={dateBirth}
            onChange={(selectedDate) => {
              setDateBirth(selectedDate);
              setFormData((prev) => ({
                ...prev,
                birthdate: convertPersianToEnglish(selectedDate?.toString()),
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
            name="father_name"
            value={formData.father_name}
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
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>

      {/* حد اعتباری خرید و فروش */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            حد اعتباری  (ریالی):
          </label>
          <input
            type="text"
            name="credit_irr_limit"
            value={formData.credit_irr_limit.toLocaleString("fa-IR")}
            onChange={(e) => handleInputChange(e, "IRR")}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-right"
            dir="rtl"
          />
          <span className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-500">
            ریال
          </span>
        </div>

     
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            حد اعتباری  (تتری):
          </label>
          <input
            type="text"
            name="credit_usdt_limit"
            value={formData.credit_usdt_limit.toLocaleString("fa-IR")}
            onChange={(e) => handleInputChange(e, "IRR")}
            className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-right"
            dir="rtl"
          />
          <span className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-500">
            تتر
          </span>
        </div>

      
      </div>


 

      {/* لیست کیف پول */}
      <div className="mb-4">
  <label className="block text-sm font-medium mb-2">لیست کیف پول:</label>
  <div className="flex items-center flex-wrap gap-3">
    {assets?.map((wallet) => (
      <label
        key={wallet.id}
        className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition ${
          formData.assets.includes(String(wallet.related_asset))
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-800"
        } hover:bg-green-400 hover:text-white`}
      >
        <input
          type="checkbox"
          value={wallet.related_asset}
          checked={formData.assets.includes(String(wallet.related_asset))}
          onChange={(e) => handleCheckboxChange(e, "assets")}
          className="hidden"
        />
        <span className="text-sm">{wallet.name_fa} ({wallet.name})</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke={formData.assets.includes(String(wallet.related_asset))
            ? "white"
            : "gray"}
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
