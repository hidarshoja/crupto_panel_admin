import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axios-client";
import { errorMessage, successMessage } from "../../utils/Toastiy";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const phoneRef = createRef();
  const passwordRef = createRef();
  const navigate = useNavigate();

 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      mobile: phoneRef.current.value,
      password: passwordRef.current.value,
    };

    if (payload.mobile.length !== 10) {
      setIsLoading(false);
      errorMessage("شماره موبایل ده رقمی را وارد کنید");
      return;
    }

    try {
      const response = await axiosClient.post("/login", payload);
      console.log(`response`, response);
      const { user, token } = response.data.data;
      localStorage.setItem("USER_INFO", JSON.stringify(user));
      localStorage.setItem("ACCESS_TOKEN", token);
      
      successMessage("ورود با موفقیت انجام شد");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (error.response?.status === 401) {
        errorMessage("شماره موبایل و پسورد هم‌خوانی ندارد");
      } else {
        errorMessage("خطایی رخ داده است، لطفاً مجدداً تلاش کنید");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 w-full h-screen">
      <div
        className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-1/2"
        dir="rtl"
      >
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="w-full flex flex-col items-center justify-center">
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-color2">
              به حساب خود وارد شوید
            </h2>
          </div>

          <div className="mt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-color2"
                >
                  شماره موبایل (بدون صفر)
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="phone"
                    type="number"
                    dir="ltr"
                    ref={phoneRef}
                    required
                    className="block w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-color2"
                >
                  پسورد
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    dir="ltr"
                    autoComplete="current-password"
                    ref={passwordRef}
                    required
                    className="block w-full rounded-md border-0 py-1.5 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`mt-8 w-full bg-green-600 text-white flex items-center justify-center rounded-md py-1.5 px-1 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "در حال ورود..." : "ورود"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden flex-1 lg:block w-1/2 bg-white">
        <div className="w-[70%] flex items-center justify-center">
          <img
            className="absolute left-1/4 inset-0 h-full w-[70%]"
            src="/img/login-img.svg"
            alt=""
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
