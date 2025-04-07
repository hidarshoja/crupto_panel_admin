import  { useState } from "react";
import UserBox2 from "../../components/UserBox2";
import BotNotificationComponent from "../../components/Bot/BotNotificationComponent";
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

export default function Notification() {
  const [selectedUser, setSelectedUser] = useState(messagesData[0].id);
  const [activeTab, setActiveTab] = useState('withdrawal');

  const selectedMessages = messagesData.find((user) => user.id === selectedUser)?.messages || {};
  const [selectedValue, setSelectedValue] = useState("1");
  const people = [
    { id: 1, name: 'علی شجاع' },
    { id: 2, name: 'رضا محمدی' },
    { id: 3, name: 'مریم کریمی' },
    { id: 4, name: 'سارا حسینی' },
];
const [userId, setUserId] = useState(null);
   const [pri, setPri] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">اطلاع رسانی</h1>
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
     <div className="flex flex-col w-full md:w-1/2  gap-2 items-start mt-8">
        <span className="text-sm font-semibold pl-2"> نحوه اطلاع رسانی :</span>
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className="bg-gray-100 border w-full border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="1">همه</option>
          <option value="2">کاربران API</option>
          <option value="3"> بات ترید</option>
          <option value="4">کاربران</option>
        </select>
      </div>
      <div className="flex flex-col w-full md:w-1/2  gap-2 items-start mt-8">
        <span className="text-sm font-semibold pl-2">   جستجو براساس نام کاربر :</span>
        <UserBox2 
          people={people}
          setUserId={setUserId}
          setPri={setPri}
        />
      </div>
        </div>
        <div>
      <h1 className="text-md font-bold  mb-8 text-gray-800 mt-4">متن پیام</h1>

     
{/* 
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
      </div> */}

      {/* <div className=" text-gray-700 text-sm mb-20">
        {selectedMessages[activeTab] ? selectedMessages[activeTab] : 'پیامی از سوی کاربر ارسال نشده است'}
      </div> */}
    </div>
        <div className="mt-8">
        <BotNotificationComponent  />
         
        </div>
    </div>
  );
}
