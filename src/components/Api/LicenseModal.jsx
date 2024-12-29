
import { useState } from 'react';

const LicenseModal = ({ isOpen2, closeModal2, formData, setFormData }) => {
  if (!isOpen2) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-center text-xl font-semibold mb-4">مقدار اعتبار</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">مبلغ اعتبار ریالی</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">مبلغ اعتبار تتری</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* دکمه‌ها */}
        <div className="flex justify-between mt-6">
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            onClick={closeModal2}
          >
            بستن
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            ذخیره
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default LicenseModal;

