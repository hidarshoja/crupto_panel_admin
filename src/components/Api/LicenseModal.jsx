import { useState, useEffect } from 'react';

const LicenseModal = ({ isOpen2, closeModal2, formData, setFormData, currentItems }) => {
  if (!isOpen2) return null;

  // این متغیر برای جلوگیری از به روز رسانی دوباره استیت استفاده می‌شود
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      // بارگذاری مقادیر اولیه فقط یکبار انجام می‌شود
      let result = currentItems?.credit_irr_limit;
      let result2 = currentItems?.credit_usdt_limit;

      const irrLimit = currentItems?.credit_irr_limit 
        ? parseFloat(currentItems.credit_irr_limit) 
        : 0;
      const usdtLimit = currentItems?.credit_usdt_limit 
        ? parseFloat(currentItems.credit_usdt_limit) 
        : 0;

      // بروزرسانی استیت فقط اگر مقادیر جدید متفاوت از مقادیر فعلی باشد
      if (irrLimit !== formData?.transaction || usdtLimit !== formData?.exchange) {
        setFormData((prevData) => ({
          ...prevData,
          transaction: irrLimit,
          exchange: usdtLimit,
        }));
      }

      // پس از اولین بار که مقادیر بارگذاری شدند، پرچم را تغییر می‌دهیم
      setIsInitialized(true);
    }
  }, [currentItems, formData, isInitialized, setFormData]); // اضافه کردن isInitialized به dependency list

  const handleInputChange = (field, value) => {
    // هنگام تغییر فیلد، مقدار جدید را در استیت ذخیره می‌کنیم
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // آپدیت مقادیر جدید در کامپوننت والد
    setFormData({
      ...formData, 
    });
    closeModal2(); // بستن مودال بعد از ذخیره
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-4">مقدار اعتبار</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">مبلغ اعتبار ریالی</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={formData?.transaction ?? 0}  // مقدار پیش‌فرض 0 به جای ''
            onChange={(e) => handleInputChange("transaction", e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">مبلغ اعتبار تتری</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded"
            value={formData?.exchange ?? 0}  // مقدار پیش‌فرض 0 به جای ''
            onChange={(e) => handleInputChange("exchange", e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
            onClick={closeModal2}
          >
            بستن
          </button>
          <button 
            onClick={handleSave} // فراخوانی تابع ذخیره
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
