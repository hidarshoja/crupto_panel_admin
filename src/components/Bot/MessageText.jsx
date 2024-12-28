import React, { useState } from 'react';

const messagesData = [
 {
   id: 1,
   username: 'احمد محمدی',
   messages: {
     withdrawal: 'احمد محمدی درخواست برداشت وجه به مبلغ ۵۰۰ دلار برای خرید تجهیزات کاری ارائه داده است. این برداشت در انتظار تایید مدیر سیستم می‌باشد.',
     deposit: '',
     trade: 'احمد محمدی پیشنهاد خرید ۲ اتریوم به قیمت هر واحد ۱۵۰۰ دلار ارائه داده است. این معامله نیاز به تایید خریدار مقابل دارد.',
   },
 },
 {
   id: 2,
   username: 'سمیه سیدی',
   messages: {
     withdrawal: 'سمیه سیدی درخواست برداشت ۳۰۰ دلار برای پرداخت هزینه‌های شخصی ارسال کرده است. این تراکنش در حال پردازش است.',
     deposit: 'سمیه سیدی مبلغ ۵۰۰ دلار به حساب کاربری خود واریز کرده است تا از خدمات ویژه سامانه استفاده کند.',
     trade: 'سمیه سیدی معامله‌ای برای فروش ۰.۵ بیت‌کوین با قیمت هر واحد ۲۰۰۰۰ دلار ایجاد کرده است.',
   },
 },
 {
   id: 3,
   username: 'هانیه جعفری مقدم',
   messages: {
     withdrawal: 'هانیه جعفری مقدم درخواست برداشت وجه ۲۰۰ دلار برای انتقال به حساب بانکی شخصی خود ثبت کرده است.',
     deposit: 'هانیه جعفری مقدم مبلغ ۱۵۰۰ دلار به حساب ارز دیجیتال خود واریز کرده است تا در معاملات آتی استفاده کند.',
     trade: '',
   },
 },
];

export default function MessageText() {
  const [selectedUser, setSelectedUser] = useState(messagesData[0].id);
  const [activeTab, setActiveTab] = useState('withdrawal');

  const selectedMessages = messagesData.find((user) => user.id === selectedUser)?.messages || {};

  return (
    <div>
      <h1 className="text-md font-bold  mb-8 text-gray-800 mt-4">متن پیام</h1>

      <div className="mb-6">
        <label htmlFor="user-select" className="block mb-2 text-sm font-medium text-gray-700">
          انتخاب کاربر:
        </label>
        <select
          id="user-select"
          className="px-3 py-2 border rounded-lg w-1/2"
          value={selectedUser}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
        >
          {messagesData.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="flex  mb-6">
        {['withdrawal', 'deposit', 'trade'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 mx-2 rounded-lg text-white ${
              activeTab === tab ? 'bg-blue-500' : 'bg-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'withdrawal'
              ? 'پیام برداشت'
              : tab === 'deposit'
              ? 'پیام واریز'
              : 'پیام معامله'}
          </button>
        ))}
      </div>

      <div className=" text-gray-700 text-sm mb-20">
        {selectedMessages[activeTab] ? selectedMessages[activeTab] : 'پیامی از سوی کاربر ارسال نشده است'}
      </div>
    </div>
  );
}
