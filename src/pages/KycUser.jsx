import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiFillPicture } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

export default function KycUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ wallets: [] });

  const initialData = [
    {
      id: 1,
      fullName: "علی احمدی",
      nationalCode: "1234567890",
      birthDate: "1370/01/01",
      phone: "09123456789",
      link: "/download",
      status: 2,
      wallet: [],
    },
    {
      id: 2,
      fullName: "زهرا محمدی",
      nationalCode: "9876543210",
      birthDate: "1375/02/15",
      phone: "09345678901",
      link: "/download",
      status: 1,
      wallet: [],
    },
  ];

  const [data, setData] = useState(initialData);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChangeStatus = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: Number(newStatus) } : item
      )
    );
  };

  const handleCheckboxChange = (wallet) => {
    setFormData((prevData) => {
      const updatedWallets = prevData.wallets.includes(wallet)
        ? prevData.wallets.filter((w) => w !== wallet)
        : [...prevData.wallets, wallet];
      return { ...prevData, wallets: updatedWallets };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.org/posts",
        data
      );
      toast.success("داده‌ها با موفقیت ثبت شدند");
    } catch (error) {
      toast.error("خطا در ارسال داده‌ها");
    }
  };

  const handleReset = () => {
    setData(initialData);
    toast("تغییرات لغو شدند");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">کاربران KYC</h1>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-4 text-center text-sm font-semibold">#</th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                نام و نام خانوادگی
              </th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                کد ملی
              </th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                تاریخ تولد
              </th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                شماره تماس
              </th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                تصاویر
              </th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                کیف پول
              </th>
              <th className="px-3 py-4 text-center text-sm font-semibold">
                وضعیت
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-4 text-center">{user.id}</td>
                <td className="px-3 py-4 text-center">{user.fullName}</td>
                <td className="px-3 py-4 text-center">{user.nationalCode}</td>
                <td className="px-3 py-4 text-center">{user.birthDate}</td>
                <td className="px-3 py-4 text-center">{user.phone}</td>
                <td className="px-3 py-4 text-center">
                  <Link to={user.link}>
                    <AiFillPicture size={20} />
                  </Link>
                </td>
                <td className="px-3 py-4 text-center">
                  <button onClick={openModal}>
                    <FaWallet size={20} />
                  </button>
                </td>
                <td className="px-3 py-4 text-center">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleChangeStatus(user.id, e.target.value)
                    }
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              انتخاب کیف پول
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "کیف ریال",
                "کیف تتر",
                "کیف ارزی",
                "کیف بیت کوین",
                "کیف دلار",
                "کیف پرفکت مانی",
                "کیف وب مانی",
              ].map((wallet) => (
                <label key={wallet} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.wallets.includes(wallet)}
                    onChange={() => handleCheckboxChange(wallet)}
                  />
                  <span>{wallet}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-gray-300 py-2 px-4 rounded-lg"
                onClick={closeModal}
              >
                بستن
              </button>
              <button
                className="bg-blue-500 py-2 px-4 rounded-lg text-white"
                onClick={closeModal}
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
