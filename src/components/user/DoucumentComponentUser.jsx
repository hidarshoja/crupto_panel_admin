import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UsersComponentUsers from "./UserComponentUesrs";
import ExchangeComponentUsers from "./ExchangeComponentUsers";
import axiosClient2 from "../../axios-client2";

export default function DocumentComponentUser({assets}) {
  const [userType, setUserType] = useState("کاربر"); 
  const [users , setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
    const [pri, setPri] = useState(0);
  const navigate = useNavigate();
  const [isUsersInitialized, setIsUsersInitialized] = useState(false);
  const [exchange , setExchange] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    asset_id: '',
    amount: '',
    bank_txid: '',
    coefficient: '1',
    des: '',
    user_id : userId
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount" ) {
      const plainValue = value.replace(/,/g, '');
      const formattedValue = Number(plainValue).toLocaleString('en-US');
  
      setFormData((prev) => ({ ...prev, [name]: formattedValue })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
 
  const handleCancel = () => {
    toast.error(" تمام اطلاعات ریست شد!");
    setFormData({
      type: '',
      asset_id: '',
      amount: '',
      bank_txid: '',
      coefficient: '',
      documentType: '',
      des: '',
    });
  };
 
  const handleSubmit = async () => { 
    const plainAmount = parseFloat(formData.amount.replace(/,/g, ''));
    const finalFormData = {
      ...formData,
      amount: plainAmount, 
      user_id: userId || null,
    };
  
    try {
      await axiosClient2.post('/transactions', finalFormData);
      toast.success("اطلاعات با موفقیت ثبت شد!");
    } catch (error) {
      toast.error('خطا در ارسال اطلاعات.');
    }
  };
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint = `/users?${userId ? `${userId}` : ""}`;
  
        const response = await axiosClient2.get(endpoint);
        setUsers(response.data.data);
  
        if (!isUsersInitialized) {
          const users = response.data.data.map((item) => item.user);
          const uniqueUsers = Array.from(
            new Map(users.map((user) => [user.id, user])).values()
          );
          setUsers(uniqueUsers);
          setIsUsersInitialized(true);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } 
    };
  
    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/exchanges");
        setExchange(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

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
          <UsersComponentUsers
            formData={formData}
            handleChange={handleChange}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            navigate={navigate}
            assets = {assets}
            userId={userId}
            pri={pri}
            setUserId={setUserId}
            setPri={setPri}
            people={users}
          />
        ) : (
          <ExchangeComponentUsers
            formData={formData}
            handleChange={handleChange}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            navigate={navigate}
            setUserId={setUserId}
            people={exchange}
            assets = {assets}
          />
        )}
      </div>
    </div>
  );
}
