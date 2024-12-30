import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function DownloadPhoto() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get("userName");

  const [documents, setDocuments] = useState({
    idCardFront: null,
    idCardBack: null,
    birthCertificate: null,
    accountOpening: null,
    degreeCertificate: null,
    postalCodeInquiry: null,
  });

  const handleFileChange = (field, file) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSave = () => {
    const formData = new FormData();
    for (const [key, file] of Object.entries(documents)) {
      if (file) {
        formData.append(key, file);
      }
    }

    console.log("ارسال فرم:", formData);
    alert("تغییرات با موفقیت ذخیره شد.");
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold my-4">دانلود تصاویر</h1>
      <p className="text-sm mb-4">تصاویر مربوط به: {userName}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "عکس روی کارت ملی", field: "idCardFront" },
          { label: "عکس پشت کارت ملی", field: "idCardBack" },
          { label: "عکس اول شناسنامه", field: "birthCertificate" },
          { label: "عکس برگ افتتاح حساب", field: "accountOpening" },
          { label: "عکس مدرک تحصیلی", field: "degreeCertificate" },
          { label: "عکس برگه استعلام کد پستی", field: "postalCodeInquiry" },
        ].map(({ label, field }) => (
          <div key={field} className="flex flex-col items-center border p-4 rounded">
            <label className="text-sm mb-2">{label}</label>
            <div className="w-52 h-52 border rounded bg-gray-100 flex items-center justify-center">
              {documents[field] ? (
                <img
                  src={URL.createObjectURL(documents[field])}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">بدون تصویر</span>
              )}
            </div>
            <label className="mt-2 text-blue-500 cursor-pointer">
              انتخاب فایل
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(field, e.target.files[0])}
                className="hidden"
              />
            </label>
            {documents[field] && (
              <span className="text-xs text-green-500 mt-1">
                فایل انتخاب شد: {documents[field].name}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}
