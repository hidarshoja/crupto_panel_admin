import React, { useState } from "react";

// استفاده از useState برای ذخیره مقادیر ورودی
const ModalStrategy = ({ isOpen, exchanges, onClose, toggleSelection, type }) => {
  const [buyers, setBuyers] = useState(exchanges);

  // این تابع برای بروزرسانی مقادیر min و max هر خریدار است
  const handleMinMaxChange = (index, field, value) => {
    const updatedBuyers = [...buyers];
    updatedBuyers[index][field] = value;
    setBuyers(updatedBuyers);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w:12/12 md:w-6/12  h-[80vh] overflow-y-scroll">
        <h2 className="text-lg font-bold mb-4">
          {type === "supplier" ? "لیست تامین‌کنندگان" : "لیست خریداران"}
        </h2>
        <div className="flex flex-wrap">
          {buyers?.map((buyer, index) => (
            <div key={index} className="w-full mb-4">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={buyer.selected}
                  onChange={() => toggleSelection(index, type)}
                />
                <span className="px-1">{buyer.name}</span>
              </label>
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <label htmlFor={`min_${buyer.id}`} className="text-sm">حداقل معامله</label>
                  <input
                    type="number"
                    id={`min_${buyer.id}`}
                    value={buyer.min_in_transaction}
                    onChange={(e) => handleMinMaxChange(index, "min_in_transaction", e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`max_${buyer.id}`} className="text-sm">حداکثر</label>
                  <input
                    type="number"
                    id={`max_${buyer.id}`}
                    value={buyer.max}
                    onChange={(e) => handleMinMaxChange(index, "max", e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={onClose}
          >
            بستن
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => {
              // ارسال مقادیر جدید به فرم یا هر عملی که می‌خواهید انجام دهید
              onClose();
              console.log("Updated Buyers:", buyers);
            }}
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStrategy;
