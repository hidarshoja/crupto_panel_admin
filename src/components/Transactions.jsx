import { useState, useEffect } from "react";
import UserBox from "../components/UserBox4";
import axiosClient2 from "../axios-client2";

export default function Transactions({ assets }) {
  const [listTransaction, SetListTransaction] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isUsersInitialized, setIsUsersInitialized] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    currency: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const tableHeaders = [
    "تاریخ و ساعت",
    "کاربر معامله‌گر",
    "نوع معامله",
    "مبلغ",
    "ارز معامله",
    "وضعیت",
    "توضیحات",
    "شماره سند",
  ];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const endpoint = `/transactions?${
          userId ? `f[user_id]=${userId}&` : ""
        }${filters.type ? `f[type]=${filters.type}&` : ""}${
          filters.status ? `f[status]=${filters.status}&` : ""
        }${filters.currency ? `f[asset_id]=${filters.currency}` : ""}`;

        const response = await axiosClient2.get(endpoint);

        SetListTransaction(response.data.data);

        if (!isUsersInitialized) {
          const users = response.data.data.map((item) => item.user);
          const uniqueUsers = Array.from(
            new Map(users.map((user) => [user.id, user])).values()
          );
          setUsers(uniqueUsers);
          setIsUsersInitialized(true);
        }
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    userId,
    filters.type,
    filters.status,
    isUsersInitialized,
    filters.currency,
  ]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listTransaction.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(listTransaction.length / itemsPerPage);

  return (
    <div className="mt-8 flow-root">
      <div className="mb-4 flex flex-col md:flex-row gap-3">
        {/* فیلتر نام کاربر */}
        <div className="w-full md:w-1/4 flex flex-col mt-[-3px]">
          <label
            htmlFor="userFilter"
            className="block text-gray-700 text-sm font-bold pb-2 w-28"
          >
            نام کاربر:
          </label>
          <UserBox people={users} setUserId={setUserId} />
        </div>
        {/* فیلتر نوع معامله */}
        <div className="w-full md:w-1/4">
          <label
            htmlFor="type"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            فیلتر نوع معامله
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">همه</option>
            <option value="1">خرید</option>
            <option value="2">فروش</option>
            <option value="4">دریافت</option>
            <option value="3">برداشت</option>
            <option value="5">اصلاحی</option>
          </select>
        </div>

        {/* فیلتر ارز معامله */}
        <div className="w-full md:w-1/4">
          <label
            htmlFor="currency"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            فیلتر ارز معامله
          </label>
          <select
            id="currency"
            name="currency"
            value={filters.currency}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">همه</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name_fa} ({asset.name})
              </option>
            ))}
          </select>
        </div>

        {/* فیلتر وضعیت معامله */}
        <div className="w-full md:w-1/4">
          <label
            htmlFor="status"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            فیلتر وضعیت معامله
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded w-full"
          >
            <option value="">همه</option>
            <option value="100">تایید شده</option>
            <option value="0">در انتظار بررسی</option>
            <option value="-100">لغو شده</option>
          </select>
        </div>
      </div>

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
              {loading ? (
                <tbody>
                  <tr>
                    <td
                      colSpan={tableHeaders.length}
                      className="py-20 text-center bg-gray-100"
                    >
                      <div className="flex justify-center items-center">
                        <svg
                          className="animate-spin h-10 w-10 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentItems?.length > 0 ? (
                    currentItems?.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {new Date(transaction.created_at)
                            .toISOString()
                            .slice(11, 16) + // استخراج ساعت و دقیقه
                            " " +
                            new Date(transaction.created_at)
                              .toISOString()
                              .slice(0, 10)}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {transaction?.user?.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {transaction?.type_label}
                        </td>
                       
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {parseInt(transaction?.amount).toLocaleString()}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {transaction?.asset?.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {transaction?.status_label}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {transaction?.des}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 text-center">
                          {transaction?.txid}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={tableHeaders.length}
                        className="px-3 py-4 text-sm text-gray-500 text-center"
                      >
                        موردی یافت نشد
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <span>
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
      </div>
    </div>
  );
}
