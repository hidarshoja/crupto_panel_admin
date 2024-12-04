
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import UsersComponent from './UserComponent';
import ExchangeComponent from './ExchangeComponent';

export default function DocumentComponent() {
  const [userType, setUserType] = useState("کاربر"); 
  const [formData, setFormData] = useState({
    type: '',
    currencyType: '',
    amount: '',
    documentNumber: '',
    source: '',
    documentType: '',
    description: '',
  });
  const [formData2, setFormData2] = useState({
    type: '',
    currencyType: '',
    amount: '',
    documentNumber: '',
    source: '',
    documentType: '',
    description: '',
  });
  const people = [
    { id: 1, name: 'علی', lastname: 'شجاع' },
    { id: 2, name: 'رضا', lastname: 'محمدی' },
    { id: 3, name: 'مریم', lastname: 'کریمی' },
    { id: 4, name: 'سارا', lastname: 'حسینی' },
];
const [userId, setUserId] = useState(null);
    const [pri, setPri] = useState(0);
  const navigate = useNavigate();

  // برای بروزرسانی مقادیر فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // پاک کردن فرم
  const handleCancel = () => {
    toast.error(" تمام اطلاعات ریست شد!");
    setFormData({
      type: '',
      currencyType: '',
      amount: '',
      documentNumber: '',
      source: '',
      documentType: '',
      description: '',
    });
  };
  const handleCancel2 = () => {
    toast.error(" تمام اطلاعات ریست شد!");
    setFormData2({
      type: '',
      currencyType: '',
      amount: '',
      documentNumber: '',
      source: '',
      documentType: '',
      description: '',
    });
  };
  // ارسال اطلاعات به API
  const handleSubmit = async () => {
    if (
        !formData.type ||
        !formData.currencyType ||
        !formData.amount 
       
      ) {
       
        toast.error("لطفاً تمام فیلدهای ضروری را پر کنید.");
        return;
      }
    try {
      await axios.post('https://jsonplaceholder.org/users', formData);
      toast.success("اطلاعات با موفقیت ثبت شد!");
     console.log(`formData`, formData);
    } catch (error) {
      console.error('ارسال اطلاعات با مشکل مواجه شد', error);
    }
  };

  const handleSubmit2 = async () => {
    // بررسی فیلدهای ضروری
    if (!formData2.type || !formData2.currencyType || !formData2.amount) {
      toast.error("لطفاً تمام فیلدهای ضروری را پر کنید.");
      return;
    }
    const selectedPerson = people.filter((person) => person.id === userId)[0];
   
    // افزودن اطلاعات کاربر انتخاب‌شده به داده‌های فرم
    const finalFormData = {
      ...formData2,
      userId: userId || null,
      userName: selectedPerson ? selectedPerson.name : null,
      userLastName: selectedPerson ? selectedPerson.lastname : null,
    };
  
    try {
      // ارسال داده‌ها به سرور
      await axios.post('https://jsonplaceholder.org/users', finalFormData);
      toast.success("اطلاعات با موفقیت ثبت شد!");
      console.log(`ارسال شده:`, finalFormData);
    } catch (error) {
      console.error('ارسال اطلاعات با مشکل مواجه شد', error);
      toast.error('خطا در ارسال اطلاعات.');
    }
  };
  

  return (
    <div className=" rounded-lg shadow-lg mt-10">
      <div className="mb-4">
        <label
          htmlFor="userType"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          نوع کاربر:
        </label>
        <select
          id="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="block w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="کاربر">کاربر</option>
          <option value="صرافی">صرافی</option>
        </select>
      </div>

      <div className="mt-6">
        {userType === "کاربر" ? (
           <UsersComponent 
            formData2={formData2}
            handleChange2 ={handleChange2}
            handleCancel2={handleCancel2}
            handleSubmit2={handleSubmit2}
            navigate = {navigate}
            userId={userId}
            pri={pri}
            setUserId={setUserId}
            setPri={setPri}
            people={people}
           
           />
        ) : (
          <ExchangeComponent 
          formData={formData}
          handleChange ={handleChange}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          navigate = {navigate}
         />
        )}
      </div>
    </div>
  );
}
