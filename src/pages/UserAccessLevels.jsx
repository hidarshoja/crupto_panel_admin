import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaWallet } from "react-icons/fa6";

export default function UserAccessLevels() {
  const initialData = [
    {
      id: 1,
      fullName: "علی احمدی",
      nationalCode: "1234567890",
      phone: "09123456789",
      wallet: [],
      kyc: 1,
      Validity: 2,
      status: 2,
    },
    {
      id: 2,
      fullName: "زهرا محمدی",
      nationalCode: "9876543210",
      phone: "09345678901",
      wallet: [],
      kyc: 1,
      Validity: 1,
      status: 1,
    },
  ];

  const options = [
    { id: "gold", label: "Gold" },
    { id: "sol", label: "Sol" },
    { id: "tether", label: "تتر" },
    { id: "rial", label: "ریال" },
    { id: "btc", label: "BTC" },
    { id: "eth", label: "ETH" },
    { id: "dai", label: "DAI" },
  ];

  const [data, setData] = useState(initialData);
  const [selectedUser, setSelectedUser] = useState(null);

  // مدیریت تغییر کیف پول‌ها
  const handleCheckboxChange = (userId, walletId) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === userId
          ? {
              ...user,
              wallet: user.wallet.includes(walletId)
                ? user.wallet.filter((id) => id !== walletId)
                : [...user.wallet, walletId],
            }
          : user
      )
    );
  };

  // ارسال اطلاعات کاربر با Axios
  const handleSubmit = async (user) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", user);
      toast.success(`اطلاعات ${user.fullName} با موفقیت ثبت شد.`);
      console.log("Response:", response.data);
    } catch (error) {
      toast.error(`خطا در ثبت اطلاعات ${user.fullName}.`);
      console.error(error);
    }
  };

  const tableHeaders = [
    "#",
    "نام و نام خانوادگی",
    "کد ملی",
    "شماره تماس",
    "کیف پول‌ها",
    "kyc",
    "اعتبار",
    "وضعیت",
    "#",
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">سطوح دسترسی کاربر</h1>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                  {user.phone}
                </td>
                <td className="text-sm text-gray-500 text-center">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="p-1 text-sm"
                  >
                     <FaWallet />
                  </button>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <select
                    value={user.kyc}
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData.map((u) =>
                          u.id === user.id
                            ? { ...u, kyc: Number(e.target.value) }
                            : u
                        )
                      )
                    }
                    className="border-gray-300 rounded"
                  >
                    <option value={2}>رد</option>
                    <option value={1}>تایید</option>
                  </select>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <select
                    value={user.Validity}
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData.map((u) =>
                          u.id === user.id
                            ? { ...u, Validity: Number(e.target.value) }
                            : u
                        )
                      )
                    }
                    className="border-gray-300 rounded"
                  >
                    <option value={2}>ندارد</option>
                    <option value={1}>دارد</option>
                  </select>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      setData((prevData) =>
                        prevData.map((u) =>
                          u.id === user.id
                            ? { ...u, status: Number(e.target.value) }
                            : u
                        )
                      )
                    }
                    className="border-gray-300 rounded"
                  >
                    <option value={2}>تایید</option>
                    <option value={1}>رد</option>
                  </select>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <button
                    onClick={() => handleSubmit(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    ثبت
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow p-6 w-2/3 md:w-1/3">
            <h2 className="text-lg font-semibold mb-4">
              انتخاب کیف پول برای {selectedUser.fullName}
            </h2>
            {options.map((option) => (
              <div key={option.id} className="flex gap-3 items-center mb-2">
                <input
                  type="checkbox"
                  id={`${selectedUser.id}-${option.id}`}
                  checked={
                    data.find((user) => user.id === selectedUser.id)?.wallet.includes(option.id) ||
                    false
                  }
                  onChange={() =>
                    handleCheckboxChange(selectedUser.id, option.id)
                  }
                  className="mr-2"
                />
                <label htmlFor={`${selectedUser.id}-${option.id}`} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
