import  { useState } from "react";
import UserBox2 from "../../components/UserBox2";
import BotNotificationComponent from "../../components/Bot/BotNotificationComponent";
import MessageText from "../../components/Bot/MessageText"

export default function Notification() {
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
        <div className="mt-8">
        <BotNotificationComponent  />
         <MessageText />
        </div>
    </div>
  );
}
