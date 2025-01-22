import { useState, useEffect } from "react";
import axiosClient2 from "../axios-client2";
import { toast } from "react-hot-toast";

export default function StatusPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [listUsers, setListUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); 
  const [lightsStatus, setLightsStatus] = useState({
    customers: [
      { id: 1, color: "green", isActive: true },
      { id: 2, color: "red", isActive: false },
      { id: 3, color: "amber", isActive: false },
    ],
    suppliers: [
      { id: 1, color: "green", isActive: false },
      { id: 2, color: "red", isActive: true },
      { id: 3, color: "amber", isActive: true },
    ],
    sustainability: [
      { id: 1, color: "green", isActive: true },
      { id: 2, color: "red", isActive: false },
      { id: 3, color: "amber", isActive: false },
    ],
  });

  const UserType = {
    USER: "user",
    EXCHANGE: "exchange",
  };
  

  const categories = [
    { name: "مشتریان", key: "customers" },
    { name: "تامین‌کنندگان", key: "suppliers" },
    { name: "وضعیت پایداری", key: "sustainability" },
  ];

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setCurrentPage(1);
  };

  const handleRetry = (user, type) => {
    const exchangeId = type === UserType.USER ? user.id : user.exchange_id;
  
    axiosClient2.patch("/exchanges/update-balance", {
      exchange_id: exchangeId,  
    })
    .then((response) => {
      toast.success('اطلاعات با موفقیت ارسال شد')
    })
    .catch((error) => {
      console.error('خطا در ارسال اطلاعات:', error);
    });
  };
  
  const handleIssueChange = (userId, newStatus) => {
    setListUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status_text: newStatus } : user
      )
    );
  };
  

  const renderLights = (categoryKey, filterColor) =>
    lightsStatus[categoryKey]
      ?.filter((light) => light.color === filterColor)
      .map((light) => (
        <div
          key={light.id}
          className={`w-4 h-4 rounded-full cursor-pointer inline-block mx-1 ${
            light.isActive ? `bg-${light.color}-500` : "bg-gray-200"
          }`}
        />
      ));

      const fetchTransactions = async () => {
        try {
          const response = await axiosClient2.get("/exchanges/status");
          setStatus(response.data);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
    
      const fetchUsers = async () => {
        try {
          const response = await axiosClient2.get("/users");
          setListUsers(response.data.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      useEffect(() => {
        fetchTransactions();
        fetchUsers();
      }, []);

       // محاسبه آیتم‌های فعلی در صفحه
  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderPagination = (dataLength) => {
    const totalPages = Math.ceil(dataLength / itemsPerPage);
    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 mx-1 rounded border ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    );
  };

  
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">وضعیت کاربران</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full text-right">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">فعال</th>
                <th className="border px-4 py-2">غیر فعال</th>
                <th className="border px-4 py-2">مشکل در کاربر</th>
                <th className="border px-4 py-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.key} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{category.name}</td>
                  <td className="border px-4 py-2">
                    {renderLights(category.key, "green")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderLights(category.key, "red")}
                  </td>
                  <td className="border px-4 py-2">
                    {renderLights(category.key, "amber")}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-500 underline flex items-center"
                      onClick={() => handleCategoryClick(category.key)}
                    >
                      <span className="px-1">مشاهده لیست</span>
                      <span className="px-1">{category.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         
        </div>
      </div>

      {selectedCategory && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">
          جدول {categories.find((cat) => cat.key === selectedCategory)?.name}
          </h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">نام</th>
                <th className="border px-4 py-2">مشکل</th>
                <th className="border px-4 py-2">تاریخ</th>
                <th className="border px-4 py-2">بررسی مجدد</th>
              </tr>
            </thead>
            {selectedCategory === "suppliers" && (
              <>
                <tbody>
                  {status && status.length > 0 ? (
                     paginateData(status || [])?.map((user) => (
                      <tr key={user.exchange_id}>
                        <td className="border px-4 py-2">
                          {user.exchange.name}
                        </td>

                        <td className="border px-4 py-2">
                          <select
                            value={user.status ? "فعال" : "غیر فعال"}
                            onChange={(e) =>
                              handleIssueChange(user.exchange_id, e.target.value)
                            }
                            className="border px-2 py-1 rounded"
                          >
                            <option value="1">فعال</option>
                            <option value="-1">غیر فعال</option>
                            <option value="0">مشکل در کاربر</option>
                          </select>
                        </td>

                        {/* نمایش تاریخ */}
                        <td className="border px-4 py-2">
                          {user.last_updated_at}
                        </td>

                        {/* دکمه ارسال */}
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleRetry(user, UserType.EXCHANGE)} 
                          >
                            ارسال
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="border px-4 py-2 text-center">
                        داده‌ای برای نمایش موجود نیست.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
            {selectedCategory === "customers" && (
              <>
                <tbody>
                {listUsers && listUsers.length > 0 ? (
               paginateData(listUsers)?.map((user) => (
                      <tr key={user.exchange_id}>
                        <td className="border px-4 py-2">
                          {user.name}
                        </td>
                        <td className="border px-4 py-2">
            <select
              value={user.status_text} 
              onChange={(e) =>
                handleIssueChange(user.id, e.target.value) 
              }
              className="border px-2 py-1 rounded"
            >
              <option value="فعال">فعال</option>
              <option value="غیر فعال">غیر فعال</option>
              <option value="مشکل در کاربر">مشکل در کاربر</option>
            </select>
          </td>

                        {/* نمایش تاریخ */}
                        <td className="border px-4 py-2">
                          {user.updated_at}
                        </td>

                        {/* دکمه ارسال */}
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={() => handleRetry(user, UserType.USER)}
                          >
                            ارسال
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="border px-4 py-2 text-center">
                        داده‌ای برای نمایش موجود نیست.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
       
          </table>
          {renderPagination(
  selectedCategory === "suppliers"
    ? status?.length || 0
    : listUsers?.length || 0
)}
           
        </div>
      )}
      
    </div>
  );
}



