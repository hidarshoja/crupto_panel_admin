import { useState } from "react";
import axios from "axios";
import TableReview from "../../components/Bot/TableReview";
import TableRegistration from "../../components/Bot/TableRegistration";
import axiosClient2 from "../../axios-client2";
import { toast } from "react-hot-toast";

export default function ManualTransaction() {
  const[review , setReview] = useState(false);
  const[registration , setRegistration] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    user_id: "",
    currency: "",
    amount: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" || name === "price") {
      const plainValue = value.replace(/,/g, '');
      const formattedValue = Number(plainValue).toLocaleString('en-US');
  
      setFormData((prev) => ({ ...prev, [name]: formattedValue })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    setFormData({
      type: "",
      user_id: "",
      currency: "",
      amount: "",
      price: "",
      coefficient: 1,
      des: "de",
      bank_txid: "85T",
      reference_num: 123
    });
  };

  const handleCheck = async () => {
    setReview(true)
    console.log(`formData`, formData);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.org/posts",
        formData
      );
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

  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

  const handleRegister = async () => {
    setRegistration(true)
    console.log("ثبت شد:", formData);
    try {
      await axiosClient2.post('/transactions', formData);
      toast.success("اطلاعات با موفقیت ثبت شد!");
    } catch (error) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  };
  


  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">معامله دستی</h1>
      <div className="flex w-full flex-col md:flex-row gap-3 mt-6">
        {/* نوع معامله */}
        <div className="w-full md:w-1/3">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            نوع معامله :
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">انتخاب کنید ...</option>
            <option value="4">واریز</option>
            <option value="3">برداشت</option>
            <option value="5">اصلاحی</option>
          </select>
        </div>

        <div className="w-full md:w-1/3">
          <label
            htmlFor="user_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            نام صرافی :
          </label>
          <div
            onClick={handleSubmit}
            className="mt-2 cursor-pointer flex items-center justify-center w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 hover:bg-green-500 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            انتخاب نام صرافی
          </div>
        </div>

        {/* نوع ارز */}
        <div className="w-full md:w-1/3">
          <label
            htmlFor="currency"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
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
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
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
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
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
          onClick={handleRegister}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:px-8"
        >
          ثبت
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-end">
              <button className="text-re" onClick={handleCancel2}>
                x
              </button>
            </div>
            <div className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              {[
                { value: "1", label: "نیوبیکس" },
                { value: "2", label: "آبان تتر" },
                { value: "3", label: "لیدیا" },
                { value: "4", label: "تترلند" },
              ].map((option) => (
                <div key={option.value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`user_id-${option.value}`}
                    name="user_id"
                    value={option.value}
                    checked={formData.user_id.includes(option.value)}
                    onChange={(e) => {
                      const { value, checked } = e.target;
                      if (checked) {
                        handleInputChange({
                          target: {
                            name: "user_id",
                            value: [...formData.user_id, value],
                          },
                        });
                      } else {
                        handleInputChange({
                          target: {
                            name: "user_id",
                            value: formData.user_id.filter(
                              (item) => item !== value
                            ),
                          },
                        });
                      }
                    }}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`user_id-${option.value}`}
                    className="text-sm text-gray-900"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
         <div className="flex items-center justify-end">
         <button className="bg-green-500 p-1 rounded-md mt-1 text-white" onClick={handleCancel2}>
                ذخیره 
              </button>
         </div>
          </div>
        </div>
      )}
      {review &&
      <div className="mt-10">
      <h1 className="text-lg font-bold mb-4 mt-4">وضعیت بررسی</h1>
      <TableReview />
      </div>
      }
        {registration &&
      <div className="mt-10">
      <h1 className="text-lg font-bold mb-4 mt-4">وضعیت ثبت ها</h1>
      <TableRegistration />
      </div>
      }
    </div>
  );
}
