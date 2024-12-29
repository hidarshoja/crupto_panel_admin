import { useState } from 'react';
import Modal from './Modal';  
import LicenseModal from './LicenseModal';
import { FaWallet, FaLock } from "react-icons/fa";

const TableAccessLevels = () => {
  const initialData = [
    {
      id: 1,
      fullName: 'علی رضایی',
      phone: '09121234567',
      nationalCode: '1234567890',
      customerType: 'حقیقی',
      wallet: 'کیف ریال',
      permission: 'خرید',
      access: 'فعال',
      api: '1234509',
      token: 'r43ik8',
    },
    {
      id: 2,
      fullName: 'زهرا محمدی',
      phone: '09351234567',
      nationalCode: '9876543210',
      customerType: 'حقوقی',
      wallet: 'کیف تتر',
      permission: 'فروش',
      access: 'غیر فعال',
      api: '1234509',
      token: 'r43ik8',
    },
  ];

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

  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [formData, setFormData] = useState({
    transaction: 'خرید',
    exchange: 'نیوبیکس',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const handleChange = (id, field, value) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setData(updatedData);
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
                {data?.map((transaction) => (
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
                          handleChange(transaction.id, 'customerType', e.target.value)
                        }
                      >
                        <option value="حقیقی">حقیقی</option>
                        <option value="حقوقی">حقوقی</option>
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
                        <option value="فعال">فعال</option>
                        <option value="غیر فعال">غیر فعال</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 text-center">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded">
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

      {/* نمایش مدال */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} formData={formData} setFormData={setFormData} />
      <LicenseModal isOpen2={isModalOpen2} closeModal2={closeModal2} formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default TableAccessLevels;
