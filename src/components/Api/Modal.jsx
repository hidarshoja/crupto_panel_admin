import { useState } from 'react';

const Modal = ({ isOpen, closeModal, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

        <h2 className="text-center text-xl font-semibold mb-4">انتخاب کیف پول</h2>
        <div className="grid grid-cols-2 gap-4">
          {["کیف ریال", "کیف تتر", "کیف ارزی", "کیف bth", "کیف بیت کوین", "کیف دلار", "کیف پرفکت مانی", "کیف وب مانی"].map((wallet) => (
            <label key={wallet} className="flex items-center space-x-2">
              <input
                type="checkbox"
            
              />
              <span>{wallet}</span>
            </label>
          ))}
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-between mt-6">
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            onClick={closeModal}
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

export default Modal;
