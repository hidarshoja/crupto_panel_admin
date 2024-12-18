import  { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function KycUser() {
  const initialData = [
    {
      id: 1,
      fullName: "علی احمدی",
      nationalCode: "1234567890",
      birthDate: "1370/01/01",
      phone: "09123456789",
      image: "/img/digital.png",
      status: 2, // تایید
    },
    {
      id: 2,
      fullName: "زهرا محمدی",
      nationalCode: "9876543210",
      birthDate: "1375/02/15",
      phone: "09345678901",
      image: "/img/bit.png",
      status: 1, // رد
    },
  ];

  const [data, setData] = useState(initialData);

 
 

  const handleChangeStatus = async (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: Number(newStatus) } : item
      )
    );
    // ارسال با کلیک بری روی سلکت 
    // try {
    //   const response = await axios.get(
    //     `https://jsonplaceholder.org/posts?id=${id}&status=${newStatus}`
    //   );
    //   console.log("Response:", response.data);
    // } catch (error) {
    //   console.error("Error sending request:", error);
    // }
  };

// ارسال بصورت گروهی
  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://jsonplaceholder.org/posts", data);
      console.log("Response:", response.data);
      toast.success("داده‌ها با موفقیت ثبت شدند");
    } catch (error) {
      toast.error("خطا در ارسال داده‌ها");
      console.error("Error sending data:", error);
    }
  };


  const handleReset = () => {
    setData(initialData);
    toast("تغییرات لغو شدند");
  };

  const tableHeaders = [
    "#",
    "نام و نام خانوادگی",
    "کد ملی",
    "تاریخ تولد",
    "شماره تماس",
    "تصاویر",
    "وضعیت",
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">کاربران KYC</h1>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-3 py-4 text-center text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.id}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.fullName}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.nationalCode}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.birthDate}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.phone}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <img
                    src={user.image}
                    alt="user"
                    className="w-8 h-8 rounded-full mx-auto"
                  />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <select
                    value={user.status}
                    onChange={(e) => handleChangeStatus(user.id, e.target.value)}
                    className="border-gray-300 rounded"
                  >
                    <option value={2}>تایید</option>
                    <option value={1}>رد</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4 gap-4">
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          انصراف
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ثبت
        </button>
      </div>
    </div>
  );
}
