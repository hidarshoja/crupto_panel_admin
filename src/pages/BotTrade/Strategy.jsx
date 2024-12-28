import { useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import axios from "axios";

export default function Strategy() {
  const [formData, setFormData] = useState({
   strategy: "",
   transactionAmount: "",
   currency: "USDT",
   suppliers: [], // تامین‌کنندگان
    buyers: [], // خریداران
    strategyName: "", // نام استراتژی
    desiredProfit: "", // سود مطلوب
    lowerLimit: "", // حد پایین
    trailingStop: "",
 });

 const people = [
  { id: 1, name: "نیوبیکس" },
  { id: 2, name: "آبان تتر" },
  { id: 3, name: "exch" },
  { id: 4, name: "لیدیا" },
  { id: 5, name: "تترلند" },
  { id: 6, name: "DAI" },
  { id: 7, name: "همه" },
];
const people2 = [
 { id: 1, name: "نیوبیکس" },
 { id: 2, name: "آبان تتر" },
 { id: 3, name: "exch" },
 { id: 4, name: "لیدیا" },
 { id: 5, name: "تترلند" },
 { id: 6, name: "DAI" },
 { id: 7, name: "همه" },
];

const handleInputChange = (e) => {
 const { name, value } = e.target;
 setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleCheckboxChange = (type, id) => {
 setFormData((prev) => {
   const key = type === "suppliers" ? "suppliers" : "buyers";
   const updatedArray = prev[key].includes(id)
     ? prev[key].filter((item) => item !== id)
     : [...prev[key], id];
   return { ...prev, [key]: updatedArray };
 });
};

const handleSubmit = async () => {
 try {
   const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
   console.log("Response:", response.data);
   alert("فرم با موفقیت ارسال شد!");
 } catch (error) {
   console.error("Error:", error);
   alert("خطا در ارسال فرم. لطفاً دوباره تلاش کنید.");
 }
};

const handleReset = () => {
 setFormData({
  strategy: "",
  transactionAmount: "",
  currency: "USDT",
  suppliers: [], 
   buyers: [],
   strategyName: "", 
   desiredProfit: "", 
   lowerLimit: "",
   trailingStop: "",
 });
};
  

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">ایجاد استراتژی</h1>
      <div className="flex flex-col w-full md:flex-row items-center gap-3 border-b-2 border-gray-300 pb-3 mt-8">
        <div className="w-full md:w-1/2 flex flex-col  gap-2 items-start">
          <span className="text-sm font-semibold pl-2"> استراتژی :</span>
          <select
            name="strategy"
            value={formData.strategy}
            onChange={handleInputChange}
            className="bg-gray-100 border w-full mt-1 border-gray-300 p-[7px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">همه</option>
            <option value="2">استراتژی ۲</option>
            <option value="3">استراتژی ۳</option>
            <option value="4">استراتژی ۴</option>
          </select>
        </div>
        <div className="w-full md:w-1/2" style={{direction:"ltr"}}>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
            style={{direction:"rtl"}}
          >
            میزان معامله (حجم معامله) :
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
                name="transactionAmount"
                type="text"
                value={formData.transactionAmount}
                onChange={handleInputChange}
              placeholder="0.00"
              className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                   name="currency"
                   value={formData.currency}
                   onChange={handleInputChange}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>USDT</option>
                <option>CAD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
      <fieldset className="mt-4 w-full">
          <legend className="text-md leading-6 text-gray-900">تامین کنندگان</legend>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {people.map((person) => (
              <div
                key={person.id}
                className="relative w-full md:w-1/6 border hover:bg-slate-200 border-gray-300 rounded-lg flex items-start py-3 px-2"
              >
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`person-${person.id}`}
                    className="select-none font-medium text-gray-900"
                  >
                    {person.name}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <input
                    id={`person-${person.id}`}
                    name={`person-${person.id}`}
                    type="checkbox"
                    checked={formData.suppliers.includes(person.id)}
                    onChange={() => handleCheckboxChange("suppliers", person.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
       
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
      <fieldset className="mt-4 w-full">
          <legend className="text-md leading-6 text-gray-900">خریدارن</legend>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {people2.map((person) => (
              <div
                key={person.id}
                className="relative w-full md:w-1/6 border hover:bg-slate-200 border-gray-300 rounded-lg flex items-start py-3 px-2"
              >
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor={`person-${person.id}`}
                    className="select-none font-medium text-gray-900"
                  >
                    {person.name}
                  </label>
                </div>
                <div className="ml-3 flex h-6 items-center">
                  <input
                    id={`person-${person.id}`}
                    name={`person-${person.id}`}
                    type="checkbox"
                    checked={formData.buyers.includes(person.id)}
                   onChange={() => handleCheckboxChange("buyers", person.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>
       
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
          <div className="w-full md:w-1/2">
            <label htmlFor="strategyName" className="block text-sm font-medium leading-6 text-gray-900">
              نام استراتژی 
            </label>
            <div className="relative mt-2">
              <input
                id="ststrategyNamerategy"
                name="strategyName"
                type="text"
                value={formData.strategyName}
                onChange={handleInputChange}
                placeholder="نام  استزاتژی را وارد کنید"
                className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="desiredProfit" className="block text-sm font-medium leading-6 text-gray-900">
               سود مطلوب(به درصد)
            </label>
            <div className="relative mt-2">
              <input
                id="desiredProfit"
                name="desiredProfit"
                type="text"
                value={formData.desiredProfit}
                onChange={(e) => {
                 const value = e.target.value;
                 if (/^\d{0,2}$/.test(value)) {
                   handleInputChange(e);
                 }
               }}
                placeholder=" سود  مطلوب  را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <AiOutlinePercentage  className="absolute left-2 top-2"/>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
          <div className="w-full md:w-1/2">
            <label htmlFor="lowerLimit" className="block text-sm font-medium leading-6 text-gray-900">
               حد پایین (به درصد)  
            </label>
            <div className="relative mt-2">
              <input
                id="lowerLimit"
                name="lowerLimit"
                type="text"
                value={formData.lowerLimit}
                onChange={(e) => {
                 const value = e.target.value;
                 if (/^\d{0,2}$/.test(value)) {
                   handleInputChange(e);
                 }
               }}
                placeholder="  حد پایین را وارد کنید"
                className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <AiOutlinePercentage  className="absolute left-2 top-2"/>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="trailingStop" className="block text-sm font-medium leading-6 text-gray-900">
                استاپ ترلینگ(به درصد)
            </label>
            <div className="relative mt-2">
              <input
                id="trailingStop"
                name="trailingStop"
                type="text"
                value={formData.trailingStop}
                onChange={(e) => {
                 const value = e.target.value;
                 if (/^\d{0,2}$/.test(value)) {
                   handleInputChange(e);
                 }
               }}
                placeholder="   استاپ ترلینگ  را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <AiOutlinePercentage  className="absolute left-2 top-2"/>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
      </div>
      <div className="flex justify-end mt-8 pb-8 gap-3">
      <button
          onClick={handleReset}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
        >
          انصراف
        </button>
        <button
         
          className="bg-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-500"
        >
          ویرایش
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          ثبت
        </button>
       
      </div>
    </div>
  );
}
