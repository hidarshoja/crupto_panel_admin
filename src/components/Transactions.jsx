import { useState, useEffect } from "react";
import UserBox from "../components/UserBox4";
import axiosClient2 from "../axios-client2";
import CvExcel from "./CvExcel";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Transactions({ assets, selectedValue }) {
  const [listTransaction, SetListTransaction] = useState([]);
  const [listExcel, SetListExcel] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isUsersInitialized, setIsUsersInitialized] = useState(false);
  const [countPage, setCountPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    currency: "",
  });

  const tableHeaders = [
    "#",
    "تاریخ و ساعت",
    "کاربر معامله‌گر",
    "نوع معامله",
    "مبلغ",
    "ارز معامله",
    "وضعیت",
    "توضیحات",
    "شماره سند",
    "شماره سند سیستمی",
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
        const endpoint = `/transactions?f[user.type]=${selectedValue}&excel=true&page=${countPage}${
          userId ? `&f[user_id]=${userId}` : ""
        }${filters.type ? `&f[type]=${filters.type}` : ""}${
          filters.status ? `&f[status]=${filters.status}` : ""
        }${filters.currency ? `&f[asset_id]=${filters.currency}` : ""}`;

        const response = await axiosClient2.get(endpoint);
        SetListTransaction(response.data.data);
        setTotalPage(response.data.meta.last_page);

        const users = response.data.data.map((item) => item.user);
        const uniqueUsers = Array.from(
          new Map(users.map((user) => [user.id, user])).values()
        );
        setUsers(uniqueUsers);
        setIsUsersInitialized(true);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactionsExecl = async () => {
      setLoading(true);
      try {
        const endpoint = `/transactions?f[user.type]=${selectedValue}&per_page=999${
          userId ? `&f[user_id]=${userId}` : ""
        }${filters.type ? `&f[type]=${filters.type}` : ""}${
          filters.status ? `&f[status]=${filters.status}` : ""
        }${filters.currency ? `&f[asset_id]=${filters.currency}` : ""}`;

        const response = await axiosClient2.get(endpoint);
        SetListExcel(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
    fetchTransactionsExecl();
  }, [
    userId,
    filters.type,
    filters.status,
    isUsersInitialized,
    filters.currency,
    countPage,
    selectedValue,
  ]);

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("توکن دسترسی پیدا نشد");
    }
    return { Authorization: `Bearer ${accessToken}` };
  };


  const requestExport = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL2
      }/transactions?export=true&f[user.type]=${selectedValue}&excel=true&page=${countPage}${
          userId ? `&f[user_id]=${userId}` : ""
        }${filters.type ? `&f[type]=${filters.type}` : ""}${
          filters.status ? `&f[status]=${filters.status}` : ""
        }${filters.currency ? `&f[asset_id]=${filters.currency}` : ""}`,
      { headers: getAuthHeaders() }
    );
  
    const exportId = response.data.data.id;
   
    return exportId;
  };

  const checkExportStatus = async (exportId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL2}/excel-exports`,
      { headers: getAuthHeaders() }
    );

    const exportStatus = response.data.data.find(
      (item) => item.id === exportId
    );
    if (!exportStatus) {
      throw new Error("وضعیت فایل اکسل یافت نشد");
    }
    return exportStatus.status;
  };

  const startExcelDownload = async () => {
    setLoading2(true);
    const toastId = toast.loading("در حال آماده‌سازی فایل اکسل...");

    try {
      // Step 1: Request export
      const exportId = await requestExport();

      // Step 2: Poll for status
      let isReady = false;
      let attempts = 0;
      const maxAttempts = 50;
      const pollInterval = 10000;

      while (!isReady && attempts < maxAttempts) {
        const status = await checkExportStatus(exportId);

        if (status === 100) {
          isReady = true;
          navigate(`/excelPage`);
        } else if (status === -100) {
          throw new Error("خطا در تولید فایل اکسل");
        } else {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
          attempts++;
        }
      }

      if (!isReady) {
        throw new Error("زمان آماده‌سازی فایل اکسل به پایان رسید");
      }

      // Step 3: Download the file
      // await downloadExcelFile(exportId);

      toast.update(toastId, {
        render: "فایل اکسل با موفیقت بارگیری شد",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("خطا در دانلود اکسل:", error);
      toast.update(toastId, {
        render: error.message || "خطا در دانلود فایل اکسل",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading2(false);
    }
  };

  return (
    <>
      <div className="flex justify-end items-center gap-2">
        <CvExcel listTransaction={listExcel} />
        <button
          onClick={startExcelDownload}
          className={`bg-green-500 px-5 py-2 text-white rounded-lg text-sm cursor-pointer ${
            loading2 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading2}
        >
          {loading2 ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 inline-block"
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
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : null}
          {loading2 ? "در حال آماده سازی..." : "دریافت تمام اکسل"}
        </button>
      </div>
      <div className="mt-8 flow-root">
        <div className="mb-4 flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-1/4 flex flex-col mt-[-3px]">
            <label
              htmlFor="userFilter"
              className="block text-gray-700 text-sm font-bold pb-2 w-28"
            >
              نام کاربر:
            </label>
            <UserBox people={users} setUserId={setUserId} />
          </div>
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
              {assets?.map((asset) => (
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
                    {listTransaction?.length > 0 ? (
                      [...listTransaction]?.reverse().map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-3 py-4 text-sm text-gray-500 text-center">
                            {transaction?.id}
                          </td>
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
                            {transaction?.bank_txid}
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
            disabled={countPage === 1}
            onClick={() => setCountPage((prev) => prev - 1)}
            className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
          >
            صفحه قبل
          </button>
          <span>
            صفحه {countPage} از {totalPage}
          </span>
          <button
            disabled={countPage === totalPage}
            onClick={() => setCountPage((prev) => prev + 1)}
            className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
          >
            صفحه بعد
          </button>
        </div>
      </div>
    </>
  );
}
