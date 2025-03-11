import { useState, useEffect } from "react";
import Modal from "./Modal";
import LicenseModal from "./LicenseModal";
import { FaWallet, FaLock , FaRegEye} from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import axiosClient2 from "../../axios-client2";
import { toast } from "react-toastify";

const TableAccessLevels = () => {
  const [accessLevels, setAccessLevels] = useState([]);
  const tableHeaders = [
    "نام و نام خانوادگی",
    "شماره",
    "کدملی",
    "نوع مشتری",
    "کیف پول ها",
    "مجوزها",
    "API KEY",
    "TOKEN API",
    "دسترسی",
    "عملیات",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [assetAll, setAssetAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedAssets2, setSelectedAssets2] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [countPage , setCountPage] = useState(1);
  const[totalPage , setTotalPage] = useState(0)
  const [formData, setFormData] = useState({
    transaction: "100000",
    exchange: "30000",
    assets: [],
    access: "1",
    CustomerType: "1",
    credit_irr_limit: "",
    credit_usdt_limit: "",
  });
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
      dataToSend.type = updatedItem.customerType;
    }

    if (updatedItem.access) {
      dataToSend.status = updatedItem.access;
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
        const {  errors } = error.response.data;
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
        const response = await axiosClient2.get(`/users?include=assets&f[type]=3&page=${countPage}`);
        setLoading(true);
        setAccessLevels(response.data.data);
        setTotalPage(response.data.meta.last_page);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        if (error.response && error.response.data) {
          const {  errors } = error.response.data;
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
      } finally {
        setLoading(false);
      }
    };
    fetchTransactionsAssetes();
    fetchTransactions();
  }, [countPage]);

  const handleShowModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(modalContent);
    toast.success("کپی شد!");
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
                  {accessLevels?.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.name} - {transaction.lastname}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.mobile}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.national_code}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        {transaction.type === 1
                          ? "کاربر عادی"
                          : transaction.type === 3
                          ? "کاربر API"
                          : transaction.type === 2
                          ? "صرافی"
                          : "نامشخص"}
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
                        <button
                          onClick={() => handleShowModal(transaction.mobile)}
                        >
                           <FaRegEye size={20}/>
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <button
                          onClick={() => handleShowModal(transaction.national_code)}
                        >
                          <FaRegEye size={20}/>
                        </button>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500 text-center">
                        <select
                          value={transaction.access}
                          onChange={(e) =>
                            handleChange(
                              transaction.id,
                              "access",
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
           onClick={() =>
             setCountPage((prev) => prev - 1)
           }
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <span>
        صفحه {countPage} از {totalPage}
        </span>
        <button
           disabled={countPage === totalPage}
           onClick={() =>
             setCountPage((prev) => prev + 1)
           }
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
         {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <h2 className="text-lg font-bold mb-2">مشاهده اطلاعات</h2>
            <input
              type="text"
              value={modalContent}
              readOnly
              className="w-full border p-2 mb-4"
            />
            <div className="flex justify-between absolute top-4 left-4">
              <button
                className="bg-gray-500 text-white p-1 rounded-full"
                onClick={() => setModalOpen(false)}
              >
               <IoCloseOutline size={20} /> 
              </button>
            </div>
             <div className="flex items-end justify-end mt-4">
             <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleCopy}
              >
                کپی
              </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAccessLevels;
