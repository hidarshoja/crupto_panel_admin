import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export default function ExcelPage() {
  const [successfulExports, setSuccessfulExports] = useState([]);

  const getAuthHeaders = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("توکن دسترسی پیدا نشد");
    }
    return { Authorization: `Bearer ${accessToken}` };
  };

  const checkExportStatus = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL2}/excel-exports`,
        { headers: getAuthHeaders() }
      );

      // فیلتر کردن داده‌هایی که status آنها برابر با 100 است
      const successfulData = response.data.data.filter(
        (item) => item.status === 100
      );

      // ذخیره کردن داده‌های فیلتر شده در state
      setSuccessfulExports(successfulData);

      console.log(successfulData);
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    }
  };

  useEffect(() => {
    checkExportStatus();
  }, []);

  const downloadExcelFile = async (exportId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL2
        }/excel-exports/${exportId}/download`,
        {
          responseType: "blob",
          headers: getAuthHeaders(),
        }
      );

      if (!response.data) {
        throw new Error("خطا در دانلود فایل اکسل");
      }

      const fileName = `transactions_${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    } catch (error) {
      toast.error("خطا در دانلود فایل اکسل");
      console.error("خطا در دانلود:", error);
    }
  };

  // اگر لیست خالی باشد، پیام مناسب نمایش داده می‌شود
  if (successfulExports.length === 0) {
    return (
      <>
         <h1 className="text-xl py-6 font-semibold">دانلود اکسل ها</h1>
      <div className="flex items-center justify-center h-80">
        <h1 className="text-md font-bold">
          درخواستی برای دانلود فایل اکسل ثبت نشده است
        </h1>
      </div>
      </>
    );
  }

  return (
    <div>
      <h1 className="text-xl py-6 font-semibold">دانلود اکسل ها</h1>
      <ul>
        {successfulExports.slice(0, 5).map((item) => (
          <li
            key={item.id}
            className="bg-white p-4 rounded-md border border-gray-200 flex gap-2 items-center justify-between mb-3"
          >
            <p>شماره درخواست: {item.id}</p>
            <p>
              برای کاربر : {item.user.name} {item.user.lastname}
            </p>
            <p>وضعیت: {item.status_label}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => downloadExcelFile(item.id)}
            >
              دانلود فایل
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
