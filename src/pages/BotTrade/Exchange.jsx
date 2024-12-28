import React, { useState } from "react";
import axios from "axios";

export default function Exchange() {
  const [formData, setFormData] = useState({
    exchange: "",
    apiToken: "",
    apiKey: "",
    buyLimit: "",
    sellLimit: "",
    fee: "",
    permissions: {
      apiClients: false,
      customers: false,
      botTrade: false,
    },
  });

  const exchanges = [
    {
      name: "صرافی ۱",
      apiToken: "توکن ۱",
      apiKey: "کلید ۱",
      buyLimit: "۱۰۰۰",
      sellLimit: "۵۰۰",
      fee: "۲٪",
    },
    {
      name: "صرافی ۲",
      apiToken: "توکن ۲",
      apiKey: "کلید ۲",
      buyLimit: "۲۰۰۰",
      sellLimit: "۱۰۰۰",
      fee: "۱.۵٪",
    },
    // لیست صرافی‌های دیگر را اینجا اضافه کنید
  ];

  const handleSelectChange = (e) => {
    const selectedExchange = exchanges.find((ex) => ex.name === e.target.value);
    setFormData({
      ...formData,
      exchange: selectedExchange.name,
      apiToken: selectedExchange.apiToken,
      apiKey: selectedExchange.apiKey,
      buyLimit: selectedExchange.buyLimit,
      sellLimit: selectedExchange.sellLimit,
      fee: selectedExchange.fee,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        permissions: { ...formData.permissions, [name]: checked },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    console.log(`Sending data:`, formData);
    axios
      .post("https://jsonplaceholder.org/posts", formData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReset = () => {
    setFormData({
      exchange: "",
      apiToken: "",
      apiKey: "",
      buyLimit: "",
      sellLimit: "",
      fee: "",
      permissions: {
        apiClients: false,
        customers: false,
        botTrade: false,
      },
    });
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">صرافی‌ها</h1>
      <form>
        <div className="mb-4">
          <label>انتخاب صرافی:</label>
          <select
            className="border p-2 w-full"
            value={formData.exchange}
            onChange={handleSelectChange}
          >
            <option value="">انتخاب کنید</option>
            {exchanges.map((exchange) => (
              <option key={exchange.name} value={exchange.name}>
                {exchange.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "نام صرافی", name: "exchange" },
            { label: "توکن API", name: "apiToken" },
            { label: "کلید API", name: "apiKey" },
            { label: "حد خرید", name: "buyLimit" },
            { label: "حد فروش", name: "sellLimit" },
            { label: "کارمزد", name: "fee" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label>{label}:</label>
              <input
                className="border p-2 w-full"
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
        <div className="mb-4 mt-6">
          <label>امکانات:</label>
          <div className="flex gap-8 items-center">
            {[
              { label: "مشتریان API", name: "apiClients" },
              { label: "مشتریان", name: "customers" },
              { label: "ترید  بات", name: "botTrade" },
            ].map(({ label, name }) => (
              <label key={name}>
                <input
                  type="checkbox"
                  name={name}
                  checked={formData.permissions[name]}
                  onChange={handleInputChange}
                  className="ml-2"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2"
            onClick={handleReset}
          >
            تنظیمات مجدد
          </button>
          <button type="button" className="bg-red-500 text-white px-4 py-2">
            انصراف
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2"
            onClick={handleSubmit}
          >
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
}
