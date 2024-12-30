import { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function UserDefinition() {
  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [formData, setFormData] = useState({
    fullName: "",
    nationalCode: "",
    fatherName: "",
    phone: "",
    password: "",
    wallets: [],
  });

  const people = [
    { id: 1, name: "ریال" },
    { id: 2, name: "تتر" },
    { id: 3, name: "BTC" },
    { id: 4, name: "ETH" },
    { id: 5, name: "SOL" },
    { id: 6, name: "DAI" },
    { id: 7, name: "GOLD" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id) => {
    setFormData((prev) => {
      const newWallets = prev.wallets.includes(id)
        ? prev.wallets.filter((wallet) => wallet !== id)
        : [...prev.wallets, id];
      return { ...prev, wallets: newWallets };
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        dateBirth: dateBirth.format("YYYY-MM-DD"),
      };
      const response = await axios.post("https://jsonplaceholder.org/posts", payload);
      console.log("Data submitted successfully:", response.data);
    console.log(`payload`, payload);
      toast.success("اطلاعات با موفقیت ارسال شد")
    } catch (error) {
      console.error("Error submitting data:", error);
      
      toast.error("ارسال اطلاعات با خطا مواجه شد");
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      nationalCode: "",
      fatherName: "",
      phone: "",
      password: "",
      wallets: [],
      Rial :"",
      tether : ""
    });
    setDateBirth(new DateObject());
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">تعریف کاربر</h1>
      <div>
        <div className="flex flex-col gap-4 w-full md:flex-row mt-8">
          <div className="w-full md:w-1/3">
            <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
              نام و نام خانوادگی
            </label>
            <div className="relative mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="نام  را وارد کنید"
                className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="nationalCode" className="block text-sm font-medium leading-6 text-gray-900">
              کدملی
            </label>
            <div className="relative mt-2">
              <input
                id="nationalCode"
                name="nationalCode"
                type="text"
                value={formData.nationalCode}
                onChange={handleInputChange}
                placeholder="کد ملی  را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="fatherName" className="block text-sm font-medium leading-6 text-gray-900">
              نام پدر
            </label>
            <div className="relative mt-2">
              <input
                id="fatherName"
                name="fatherName"
                type="text"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder=" نام پدر  را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full md:flex-row mt-8">
          <div className="w-full md:w-1/3">
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              شماره تماس
            </label>
            <div className="relative mt-2">
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="شماره تماس کاربر را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              رمز کاربر
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder=" رمز  را وارد کنید"
                className="peer block pr-2 w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-1">
            <label htmlFor="dateBirth" className="block text-sm font-medium leading-6 text-gray-900">
              تاریخ تولد
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={dateBirth}
              onChange={setDateBirth}
              calendarPosition="bottom-right"
               inputClass="w-full outline-none rounded"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:flex-row mt-8">
       
          <div className="w-full md:w-1/2">
            <label htmlFor="Rial" className="block text-sm font-medium leading-6 text-gray-900">
              حد اعتباری ریالی
            </label>
            <div className="relative mt-2">
              <input
                id="Rial"
                name="Rial"
                type="text"
                value={formData.Rial}
                onChange={handleInputChange}
                placeholder=" حد اعتبار ریالی  را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="tether" className="block text-sm font-medium leading-6 text-gray-900">
               حد اعتباری تتری
            </label>
            <div className="relative mt-2">
              <input
                id="tether"
                name="tether"
                type="text"
                value={formData.tether}
                onChange={handleInputChange}
                placeholder="  حد اعتبار تتری  را وارد کنید"
                className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              />
            </div>
          </div>
        </div>
        

        <fieldset className="mt-8">
          <legend className="text-md leading-6 text-gray-900">کیف های پول</legend>
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
                    checked={formData.wallets.includes(person.id)}
                    onChange={() => handleCheckboxChange(person.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            انصراف
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
}
