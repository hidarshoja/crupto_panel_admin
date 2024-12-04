import React, { useState } from 'react';
import axios from 'axios';

export default function StatusPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const [lightsStatus, setLightsStatus] = useState({
    customers: [
      { id: 1, color: 'green', isActive: true },
      { id: 2, color: 'red', isActive: false },
      { id: 3, color: 'yellow', isActive: true },
    ],
    suppliers: [
      { id: 1, color: 'green', isActive: false },
      { id: 2, color: 'red', isActive: true },
      { id: 3, color: 'yellow', isActive: false },
    ],
    sustainability: [
      { id: 1, color: 'green', isActive: true },
      { id: 2, color: 'red', isActive: false },
      { id: 3, color: 'yellow', isActive: true },
    ],
  });

  const categories = [
    { name: 'مشتریان', key: 'customers' },
    { name: 'تامین‌کنندگان', key: 'suppliers' },
    { name: 'وضعیت پایداری', key: 'sustainability' },
  ];

  const handleCategoryClick = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setUserDetails([
      {
        id: 1,
        name: 'کاربر اول',
        issue: 'فعال',
        date: '1402/09/13',
      },
      {
        id: 2,
        name: 'کاربر دوم',
        issue: 'غیر فعال',
        date: '1402/09/12',
      },
    ]);
  };

  const handleRetry = (user) => {
    console.log(`user`, user);
    // axios.post('/api/retry', {
    //   userId: user.id,
    //   name: user.name,
    //   issue: user.issue,
    //   date: user.date,
    // })
    //   .then((response) => {
    //     alert('اطلاعات با موفقیت ارسال شد');
    //   })
    //   .catch((error) => {
    //     console.error('خطا در ارسال اطلاعات:', error);
    //   });
  };

  const handleIssueChange = (userId, newIssue) => {
    setUserDetails((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, issue: newIssue } : user
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
            light.isActive ? `bg-${light.color}-500` : 'bg-gray-200'
          }`}
        />
      ));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">وضعیت کاربران</h1>
      <div>
    {/* <div className="overflow-x-auto">
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
              <td className="border px-4 py-2">{renderLights(category.key, 'green')}</td>
              <td className="border px-4 py-2">{renderLights(category.key, 'red')}</td>
              <td className="border px-4 py-2">{renderLights(category.key, 'yellow')}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-blue-500 underline"
                  onClick={() => handleCategoryClick(category.key)}
                >
                  لیست
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
  </div>

      {selectedCategory && (
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">جدول {selectedCategory}</h2>
          <table className="w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2">نام</th>
                <th className="border px-4 py-2">مشکل</th>
                <th className="border px-4 py-2">تاریخ</th>
                <th className="border px-4 py-2">بررسی مجدد</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">
                    <select
                      value={user.issue}
                      onChange={(e) => handleIssueChange(user.id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="فعال">فعال</option>
                      <option value="غیر فعال">غیر فعال</option>
                      <option value="مشکل در کاربر">مشکل در کاربر</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">{user.date}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => handleRetry(user)}
                    >
                      ارسال
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
