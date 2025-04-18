import { useState, useEffect } from "react";
import Modal from "./../components/Api/Modal";
import LicenseModal from "./../components/Api/LicenseModal";
import { FaWallet, FaLock } from "react-icons/fa";
import axiosClient2 from "../axios-client2";
import { toast } from "react-toastify";

const TableAccessLevels = () => {
  const [accessLevels, setAccessLevels] = useState([]);
  const tableHeaders = [
    "#",
    "نام و نام خانوادگی",
    "کدملی",
    "موبایل",
    "kyc",
    "کیف پول ها",
    "اعتبار",
    "وضعیت",
    "عملیات",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [assetAll, setAssetAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedAssets2, setSelectedAssets2] = useState([]);
  const [formData, setFormData] = useState({
    transaction: "",
    exchange: "",
    assets: [],
    status: "1",
    CustomerType: "1",
    credit_irr_limit: "",
    credit_usdt_limit: "",
  });
  const [countPage, setCountPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const handleChange = (id, field, value) => {
    setAccessLevels((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFormSubmit = async (transaction) => {
    const updatedItem = accessLevels.find((item) => item.id === transaction.id);

    const dataToSend = {};

    if (updatedItem.customerType) {
      dataToSend.kyc = updatedItem.customerType;
    }

    if (updatedItem.status) {
      dataToSend.status = updatedItem.status;
    }

    if (formData.assets && formData.assets.length > 0) {
      dataToSend.assets = formData.assets;
    }
    if (formData.transaction) {
      dataToSend.credit_irr_limit = Number(formData.transaction);
    }
    if (formData.exchange) {
      dataToSend.credit_usdt_limit = Number(formData.exchange);
    }

    try {
      const response = await axiosClient2.put(
        `/users/${transaction.id}`,
        dataToSend
      );
      if (response.status === 200) {
        toast.success("تغییرات با موفقیت ثبت شد");
      } else {
        toast.error("خطا در اعمال تغییرات، لطفاً دوباره تلاش کنید");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        toast.error(message || "خطا در ارسال اطلاعات!");
        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            errorMessages.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        }
      } else {
        toast.error("خطا در ارسال اطلاعات!");
      }
    }
  };

  const fetchTransactionsAssetes = async () => {
    try {
      const endpoint = `/assets`;
      const response = await axiosClient2.get(endpoint);
      setAssetAll(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get(
          `/users?include=assets&f[type]=1&page=${countPage}`
        );
        setLoading(true);
        setAccessLevels(response.data.data);
        setTotalPage(response.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactionsAssetes();
    fetchTransactions();
  }, [countPage]);

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
                  {[...accessLevels]?.reverse().map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.id}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.national_code}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.mobile}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <select
                          value={transaction.kyc}
                          onChange={(e) =>
                            handleChange(
                              transaction.id,
                              "customerType",
                              e.target.value
                            )
                          }
                        >
                          <option value="1">تایید</option>
                          <option value="2">رد</option>
                        </select>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedAssets(transaction.assets);
                            openModal();
                          }}
                        >
                          <FaWallet size={20} />
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedAssets2(transaction);
                            openModal2();
                          }}
                        >
                          <FaLock size={20} />
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <select
                          value={transaction.status}
                          onChange={(e) =>
                            handleChange(
                              transaction.id,
                              "status",
                              e.target.value
                            )
                          }
                        >
                          <option value="100">فعال</option>
                          <option value="-100">غیر فعال</option>
                        </select>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => handleFormSubmit(transaction)}
                        >
                          ثبت
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {/* صفحه بندی */}
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
      {/* نمایش مدال */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        assets={selectedAssets}
        formData={formData}
        setFormData={setFormData}
        assetAll={assetAll}
      />
      <LicenseModal
        isOpen2={isModalOpen2}
        closeModal2={closeModal2}
        formData={formData}
        setFormData={setFormData}
        currentItems={selectedAssets2}
      />
    </div>
  );
};

export default TableAccessLevels;
