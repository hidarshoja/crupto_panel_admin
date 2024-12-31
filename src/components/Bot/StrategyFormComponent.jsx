// StrategyFormComponent.js
import React from 'react';
import { AiOutlinePercentage } from 'react-icons/ai';

const StrategyFormComponent = ({
  formData,
  handleInputChange,
  setSupplierModalOpen,
  setBuyerModalOpen,
}) => {
  return (
    <div>
      <div className="flex flex-col w-full md:flex-row items-center gap-3 border-b-2 border-gray-300 pb-3 mt-8">
        <div className="w-full md:w-1/2 flex flex-col gap-2 items-start">
          <span className="text-sm font-semibold pl-2"> استراتژی :</span>
          <select
            name="strategy"
            value={formData.strategy}
            onChange={handleInputChange}
            className="bg-gray-100 border w-full mt-1 border-gray-300 p-[7px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">همه</option>
            <option value="2">استراتژی ۲</option>
            <option value="3">استراتژی ۳</option>
            <option value="4">استراتژی ۴</option>
          </select>
        </div>
        <div className="w-full md:w-1/2" style={{ direction: 'ltr' }}>
          <label
            htmlFor="price"
            className="block text-sm font-medium leading-6 text-gray-900"
            style={{ direction: 'rtl' }}
          >
            میزان معامله (حجم معامله) :
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              name="transactionAmount"
              type="text"
              value={formData.transactionAmount}
              onChange={handleInputChange}
              placeholder="000"
              className="block w-full rounded-md border-0 py-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>USDT</option>
                <option>CAD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b-2 border-gray-300 py-3">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setSupplierModalOpen(true)}
        >
          تامین کنندگان
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setBuyerModalOpen(true)}
        >
          خریداران
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="strategyName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            نام استراتژی
          </label>
          <div className="relative mt-2">
            <input
              id="strategyName"
              name="strategyName"
              type="text"
              value={formData.strategyName}
              onChange={handleInputChange}
              placeholder="نام استراتژی را وارد کنید"
              className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="desiredProfit"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            سود مطلوب(به درصد)
          </label>
          <div className="relative mt-2">
            <input
              id="desiredProfit"
              name="desiredProfit"
              type="text"
              value={formData.desiredProfit}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                  handleInputChange(e);
                }
              }}
              placeholder=" سود مطلوب را وارد کنید"
              className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <AiOutlinePercentage className="absolute left-2 top-2" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="Purchase"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            سقف خرید
          </label>
          <div className="relative mt-2">
            <input
              id="Purchase"
              name="Purchase"
              type="text"
              value={formData?.Purchase}
              onChange={handleInputChange}
              placeholder=" سقف خرید را وارد کنید"
              className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="shopping"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            کف خرید
          </label>
          <div className="relative mt-2">
            <input
              id="shopping"
              name="shopping"
              type="text"
              
              value={formData.shopping}
              onChange={handleInputChange}
              placeholder=" کف خرید را وارد کنید"
              className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-3 border-b-2 border-gray-300 py-3">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="lowerLimit"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            حد پایین (به درصد)
          </label>
          <div className="relative mt-2">
            <input
              id="lowerLimit"
              name="lowerLimit"
              type="text"
              value={formData.lowerLimit}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                  handleInputChange(e);
                }
              }}
              placeholder=" حد پایین را وارد کنید"
              className="peer block w-full border-0 pr-2 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <AiOutlinePercentage className="absolute left-2 top-2" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="trailingStop"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            استاپ ترلینگ(به درصد)
          </label>
          <div className="relative mt-2">
            <input
              id="trailingStop"
              name="trailingStop"
              type="text"
              value={formData.trailingStop}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                  handleInputChange(e);
                }
              }}
              placeholder=" استاپ ترلینگ را وارد کنید"
              className="peer block w-full pr-2 border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            />
            <AiOutlinePercentage className="absolute left-2 top-2" />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyFormComponent;