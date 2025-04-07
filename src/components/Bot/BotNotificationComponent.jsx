import { useState } from "react";
import axios from "axios";

export default function BotNotificationComponent() {
  const [data, setData] = useState([
    {
      id: 1,
      fullName: "احمد رضایی",
      customerType: "api",
      phone: "09123456789",
      sms: false,
      email: true,
      telegram: false,
    },
    {
      id: 2,
      fullName: "احمد محمدی",
      customerType: "بات",
      phone: "09123456400",
      sms: false,
      email: true,
      telegram: false,
    },
  ]);

  const [messageType, setMessageType] = useState("deposit"); // deposit, withdrawal, trade
  const [customMessage, setCustomMessage] = useState("");

  const handleChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (user) => {
    try {
      const notificationData = {
        ...user,
        messageType,
        customMessage,
      };
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        notificationData
      );
      console.log(`notificationData`, notificationData);
      alert("اطلاعات با موفقیت ارسال شد: " + response.status);
    } catch (error) {
      alert("خطا در ارسال اطلاعات: " + error.message);
    }
  };

  const tableHeaders = [
    "شماره",
    "نام و نام خانوادگی",
    "نوع مشتری",
    "شماره موبایل",
    "پیامک",
    "ایمیل",
    "تلگرام",
    "عملیات",
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع پیام
          </label>
          <select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="deposit">واریز</option>
            <option value="withdrawal">برداشت</option>
            <option value="trade">معامله</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            متن پیام
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="متن پیام خود را وارد کنید..."
          />
        </div>
      </div>

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
            {data.map((user, index) => (
              <tr key={user.id}>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {index + 1}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.fullName}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {user.customerType}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) =>
                      handleChange(user.id, "phone", e.target.value)
                    }
                    className="border rounded px-1 w-28 py-1"
                    style={{ direction: "ltr" }}
                  />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <input
                    type="checkbox"
                    checked={user.sms}
                    onChange={(e) =>
                      handleChange(user.id, "sms", e.target.checked)
                    }
                  />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <input
                    type="checkbox"
                    checked={user.email}
                    onChange={(e) =>
                      handleChange(user.id, "email", e.target.checked)
                    }
                  />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <input
                    type="checkbox"
                    checked={user.telegram}
                    onChange={(e) =>
                      handleChange(user.id, "telegram", e.target.checked)
                    }
                  />
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSubmit(user)}
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
  );
}
