import React from 'react'

export default function ExchangeComponentUsers({ formData, handleSubmit, handleChange , handleCancel , navigate }) {
    return (
        <div className="p-4 bg-green-50 border w-full flex flex-wrap gap-6 border-green-300 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">نوع:</span>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">انتخاب کنید</option>
              <option value="1">برداشت</option>
              <option value="2">واریز</option>
            </select>
          </div>
    
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">نوع ارز:</span>
            <select
              name="currencyType"
              value={formData.currencyType}
              onChange={handleChange}
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">انتخاب کنید</option>
              <option value="1">ریال</option>
              <option value="2">BTC</option>
              <option value="3">ETH</option>
              <option value="4">SOL</option>
            </select>
          </div>
        </div>
    
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">مبلغ بر اساس ارز پایه:</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="مبلغ را وارد کنید"
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
    
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">شماره سند بدل:</span>
            <input
              type="text"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              placeholder="شماره سند را وارد کنید"
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
    
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">از محل:</span>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">انتخاب کنید</option>
              <option value="1">درگاه بیت</option>
              <option value="2">درگاه تومان</option>
              <option value="3">حساب بانکی</option>
              <option value="4">حساب مشتری</option>
              <option value="5">شخصی</option>
            </select>
          </div>
    
          <div className="flex flex-col gap-1 items-start w-full md:w-1/2">
            <span className="text-sm font-semibold pl-2">کلیت سند:</span>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
               <option value="">انتخاب کنید</option>
              <option value="1">اصلاحی</option>
              <option value="2">قطعی</option>
            </select>
          </div>
        </div>
    
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="text-sm font-semibold pl-2">توضیحات:</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="توضیحات را وارد کنید"
            rows="4"
            className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
    
        {/* دکمه‌ها */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            انصراف
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            بازگشت
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            ثبت
          </button>
        </div>
      </div>
      )
    }
