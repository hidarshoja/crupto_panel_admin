import { useState } from "react";


const ModalStrategy = ({ isOpen, exchanges, onClose, toggleSelection, type , formData }) => {
  const [buyers, setBuyers] = useState(exchanges);


  const handleMinMaxChange = (index, field, value) => {
    const plainValue = value.replace(/,/g, ""); // حذف کاماها برای مقدار خام
    if (!/^\d*$/.test(plainValue)) return; // فقط عدد مجاز است
  
    const updatedBuyers = [...buyers];
    updatedBuyers[index][field] = plainValue; // مقدار بدون کاما را ذخیره کن
  
    setBuyers(updatedBuyers);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w:12/12 md:w-6/12  h-[80vh] overflow-y-scroll">
      
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
                    type="text"
                    id={`min_${buyer.id}`}
                    value={buyers[index].min_in_transaction
                      ? Number(buyers[index].min_in_transaction).toLocaleString("en-US")
                      : ""}
                    onChange={(e) => handleMinMaxChange(index, "min_in_transaction", e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`max_${buyer.id}`} className="text-sm">حداکثر</label>
                  <input
                    type="text"
                    id={`max_${buyer.id}`}
                    value={buyers[index].max
                      ? Number(buyers[index].max).toLocaleString("en-US")
                      : ""}
                    onChange={(e) => handleMinMaxChange(index, "max", e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="mt-6 px-1">
                  <span className="border-b-2 p-2">{formData?.currency}</span>
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
