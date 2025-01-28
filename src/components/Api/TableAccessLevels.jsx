import { useState , useEffect } from 'react';
import Modal from './Modal';  
import LicenseModal from './LicenseModal';
import { FaWallet, FaLock } from "react-icons/fa";
import axiosClient2 from "../../axios-client2";
import { toast } from 'react-toastify';

const TableAccessLevels = () => {

  const [accessLevels , setAccessLevels] = useState([]);
  const tableHeaders = [
    'نام و نام خانوادگی',
    'شماره',
    'کدملی',
    'نوع مشتری',
    'کیف پول ها',
    'مجوزها',
    'api ke',
    'token api',
    'دسترسی',
    'عملیات',
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    transaction: "100000",
    exchange: "30000",
    wallets : [],
    access :"1",
    CustomerType:"1"
    
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const handleChange = (id, field, value) => {
    setAccessLevels((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleFormSubmit = async (transaction) => {
    const updatedItem = accessLevels.find((item) => item.id === transaction.id);
    try {
      const response = await axiosClient2.put(`/users/${transaction.id}`, {
        ...transaction,
        customerType: updatedItem.customerType,
        access: updatedItem.access,
      });
      toast.success('تغییرات با موفقیت ثبت شد')
    } catch (error) {
      toast.error("خطا در اعمال تغییرات")
    }
  };
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get(`/users`);
          setLoading(true);
          setAccessLevels(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accessLevels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(accessLevels.length / itemsPerPage);

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
                {currentItems?.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.name} -  {transaction.lastname}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.mobile}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.national_code}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <select
                        value={transaction.customerType}
                        onChange={(e) =>
                          handleChange(transaction.id, 'customerType', e.target.value)
                        }
                      >
                        <option value="1">کاربر</option>
                        <option value="3">مشتری api</option>
                        <option value="2">صرافی</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <button className="cursor-pointer" onClick={openModal}>
                        <FaWallet size={20} />
                      </button>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <button className="cursor-pointer" onClick={openModal2}>
                        <FaLock size={20}/>
                      </button>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.api}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      {transaction.token}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <select
                        value={transaction.access}
                        onChange={(e) =>
                          handleChange(transaction.id, 'access', e.target.value)
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
      </div>
      {/* نمایش مدال */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} formData={formData} setFormData={setFormData} />
      <LicenseModal isOpen2={isModalOpen2} closeModal2={closeModal2} formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default TableAccessLevels;
