import { useEffect } from "react";

const Modal = ({ isOpen, closeModal, formData, setFormData, assetAll, assets }) => {
  if (!isOpen) return null;

  // این بخش به‌روزرسانی پیش‌فرض چک‌باکس‌ها و ذخیره کردن کیف پول‌های انتخاب شده را انجام می‌دهد
  useEffect(() => {
    if (assetAll) {
      // استخراج نام‌های name_fa از asset برای تنظیم پیش‌فرض چک‌باکس‌ها
      const selectedWallets = assets.map((item) => item.name_fa);

      setFormData((prevData) => ({
        ...prevData,
        wallets: selectedWallets,
      }));
    }
  }, [assetAll, assets, setFormData]);

  // این تابع برای مدیریت تغییرات چک‌باکس‌ها است
  const handleCheckboxChange = (walletName) => {
    setFormData((prevData) => {
      const updatedWallets = prevData.wallets.includes(walletName)
        ? prevData.wallets.filter((w) => w !== walletName)
        : [...prevData.wallets, walletName];

      // اضافه یا حذف کردن اطلاعات کیف پول از asset
      const updatedAssets = assetAll.filter((wallet) =>
        updatedWallets.includes(wallet.name_fa)
      );

      return {
        ...prevData,
        wallets: updatedWallets,
        asset: updatedAssets,  // بروزرسانی `asset`
      };
    });
  };

  // این تابع برای ذخیره‌سازی داده‌ها و بستن modal است
  const handleSave = () => {
    // گرفتن related_asset برای کیف پول‌های انتخاب شده
    const selectedAssets = assetAll.filter((wallet) =>
      formData.wallets.includes(wallet.name_fa)
    ).map((wallet) => wallet.related_asset); // فقط مقادیر related_asset را ذخیره می‌کنیم

    setFormData((prevData) => ({
      ...prevData,
      assets: selectedAssets, // ذخیره کردن آرایه مربوط به related_asset
    }));

    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white px-4 py-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-4">انتخاب کیف پول</h2>
        <div className="grid grid-cols-2 gap-x-0 gap-y-2">
          {assetAll?.map((wallet, index) => (
            <label key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={formData?.wallets?.includes(wallet.name_fa)} // بررسی اینکه آیا این کیف پول انتخاب شده است یا نه
                onChange={() => handleCheckboxChange(wallet.name_fa)} // تغییر وضعیت انتخاب
              />
              <span className="px-1">{wallet.name_fa} ({wallet.name})</span>
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
            onClick={handleSave} // ذخیره‌سازی و بستن modal
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
