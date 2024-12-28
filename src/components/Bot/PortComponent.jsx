import React, { useState } from 'react';

export default function PortComponent() {
  const [formData, setFormData] = useState({
    transactionType: '',
    name: '',
    phone: '',
    account: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // ارسال اطلاعات به سرور یا پردازش دیگر
    console.log('Confirmed Data:', formData);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 mt-4">درگاه</h3>
      <div>
        <div className="flex gap-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="transactionType" className="block text-sm font-medium leading-6 text-gray-900">
              نوع معامله :
            </label>
            <select
              id="transactionType"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="">انتخاب کنید</option>
              <option value="درگاه پی استار">درگاه پی استار</option>
              <option value="درگاه تومن">درگاه تومن</option>
              <option value="درگاه چیست">درگاه چیست</option>
              <option value="درگاه بیت">درگاه بیت</option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <div className="flex w-full flex-col gap-3">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  نام و نام خانوادگی :
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  شماره تلفن :
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-full">
                <label htmlFor="account" className="block text-sm font-medium leading-6 text-gray-900">
                  شماره حساب :
                </label>
                <input
                  type="text"
                  name="account"
                  id="account"
                  value={formData.account}
                  onChange={handleInputChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end py-10 gap-3">
        <button
          onClick={() => setFormData({ transactionType: '', name: '', phone: '', account: '' })}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
        >
          انصراف
        </button>
        <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600">
          ثبت
        </button>
      </div>
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3">
      <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4 text-gray-700">
        اطلاعات وارد شده
      </h2>
      <div className="mb-4">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="font-semibold text-gray-600">نوع معامله:</span>
          <span className="text-gray-800">{formData.transactionType}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="font-semibold text-gray-600">نام و نام خانوادگی:</span>
          <span className="text-gray-800">{formData.name}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="font-semibold text-gray-600">شماره تلفن:</span>
          <span className="text-gray-800">{formData.phone}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="font-semibold text-gray-600">شماره حساب:</span>
          <span className="text-gray-800">{formData.account}</span>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 shadow-md transition duration-300"
        >
          انصراف
        </button>
        <button
          onClick={handleConfirm}
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 shadow-md transition duration-300"
        >
          تایید و ارسال
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
