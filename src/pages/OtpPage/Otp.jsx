import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { errorMessage, successMessage } from "../../utils/Toastiy";
import { ToastContainer } from "react-toastify";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const mobile = localStorage.getItem("mobile");
    const password = localStorage.getItem("password");

    if (!mobile || !password) {
      errorMessage("اطلاعات ورود یافت نشد، لطفاً مجدداً لاگین کنید");
      navigate("/auth/login");
      return;
    }

   let otp = parseInt(otp);

    try {
      const response = await axiosClient.post("/login", {
        mobile,
        password,
        otp,
      });

      const { user, token } = response.data.data;
      localStorage.setItem("USER_INFO", JSON.stringify(user));
      localStorage.setItem("ACCESS_TOKEN", token);

      localStorage.removeItem("mobile");
      localStorage.removeItem("password");

      successMessage("ورود با موفقیت انجام شد");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      errorMessage("کد وارد شده معتبر نیست");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96" dir="rtl">
        <h2 className="text-2xl font-bold text-gray-700 text-center">
          کد تایید را وارد کنید
        </h2>
        <p className="text-gray-500 text-center mt-2">
          کد  ارسال‌شده به شماره شما را وارد کنید.
        </p>

        <form onSubmit={handleVerifyOTP} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              کد تایید
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
              className="block w-full rounded-md border border-gray-300 p-2 text-center text-lg tracking-widest focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 text-white rounded-md py-2 text-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "در حال بررسی..." : "تایید کد"}
          </button>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        rtl={true}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}






