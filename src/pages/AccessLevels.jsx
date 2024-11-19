import  { useState } from "react";
import axios from "axios";

export default function AccessLevels() {
  const initialData = [
    {
      id: 1,
      fullName: "علی رضایی",
      phone: "09121234567",
      nationalCode: "1234567890",
      customerType: "حقیقی",
      wallet: "کیف ریال",
      permission: "خرید",
      access: "فعال",
    },
    {
      id: 2,
      fullName: "زهرا محمدی",
      phone: "09351234567",
      nationalCode: "9876543210",
      customerType: "حقوقی",
      wallet: "کیف تتر",
      permission: "فروش",
      access: "غیر فعال",
    },
  ];

  const tableHeaders = [
    "نام و نام خانوادگی",
    "شماره",
    "کدملی",
    "نوع مشتری",
    "کیف پول ها",
    "مجوزها",
    "دسترسی",
    "عملیات",
  ];

  const [data, setData] = useState(initialData);

  const handleChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };

  const handleSubmitAll = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", data)
      .then((response) => {
        alert("کل اطلاعات با موفقیت ارسال شد!");
        console.log(`data`, data);
      })
      .catch((error) => {
        console.error("خطا در ارسال اطلاعات:", error);
      });
  };

  const handleReset = () => {
    setData(initialData);
  };

  const handleSubmit = (rowData) => {
    axios
      .post("https://jsonplaceholder.typicode.com/users", rowData)
      .then((response) => {
        alert("اطلاعات با موفقیت ارسال شد!");
        console.log(`rowData`, rowData);
      })
      .catch((error) => {
        console.error("خطا در ارسال اطلاعات:", error);
      });
  };

  return (
    <div className="mt-8 flow-root">
      <h1 className="text-lg font-bold mb-4 mt-4">سطوح دسترسی</h1>
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-3 py-4 text-center text-sm font-semibold text-gray-900"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.fullName}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.phone}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.nationalCode}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <select
                        value={transaction.customerType}
                        onChange={(e) =>
                          handleChange(transaction.id, "customerType", e.target.value)
                        }
                      >
                        <option value="حقیقی">حقیقی</option>
                        <option value="حقوقی">حقوقی</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <select
                        value={transaction.wallet}
                        onChange={(e) =>
                          handleChange(transaction.id, "wallet", e.target.value)
                        }
                      >
                        <option value="کیف ریال">کیف ریال</option>
                        <option value="کیف تتر">کیف تتر</option>
                        <option value="کیف ارزی">کیف ارزی</option>
                        <option value="کیف bth">کیف bth</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <select
                        value={transaction.permission}
                        onChange={(e) =>
                          handleChange(transaction.id, "permission", e.target.value)
                        }
                      >
                        <option value="خرید">خرید</option>
                        <option value="فروش">فروش</option>
                        <option value="هر دو">هر دو</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <select
                        value={transaction.access}
                        onChange={(e) =>
                          handleChange(transaction.id, "access", e.target.value)
                        }
                      >
                        <option value="فعال">فعال</option>
                        <option value="غیر فعال">غیر فعال</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleSubmit(transaction)}
                      >
                        ثبت
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          انصراف
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmitAll}
        >
          ثبت
        </button>
      </div>
    </div>
  );
}
