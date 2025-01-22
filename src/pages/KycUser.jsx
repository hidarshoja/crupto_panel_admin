import { useState, useEffect } from "react";
import axiosClient2 from "../axios-client2";
import { AiFillPicture } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import LoadingTable from "../components/LoadingTable";

export default function KycUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
const [isloading , setIsloading] = useState(true);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosClient2.get("/users");
        setUsers(response.data.data);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle status change (Approved / Rejected)
  const handleChangeStatus = async (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );

    try {
      const response = await axiosClient2.put(`/users/${id}`, {
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
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
          {isloading ? (
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
          <LoadingTable />
        
      </tr>
    </tbody>
  ) : (
    <tbody className="divide-y divide-gray-200 bg-white">
    {users?.map((user , index) => (
      <tr key={user.id}>
        <td className="px-3 py-4 text-center">{index + 1}</td>
        <td className="px-3 py-4 text-center">
          {user.name} - {user.lastname}
        </td>
        <td className="px-3 py-4 text-center">{user.national_code}</td>
        <td className="px-3 py-4 text-center">{user.birthdate}</td>
        <td className="px-3 py-4 text-center">{user.mobile}</td>
        <td className="px-3 py-4 text-center">
          <Link to={`/download/${user.id}`}>
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
            <option value={100}>تایید</option>
            <option value={-100}>رد</option>
          </select>
        </td>
      </tr>
    ))}
  </tbody>
  )}
         
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
                  <input type="checkbox" />
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
