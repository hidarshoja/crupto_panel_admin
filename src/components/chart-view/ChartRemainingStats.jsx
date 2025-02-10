import  { useEffect , useState } from "react";
import axiosClient2 from "../../axios-client2";

export default function ChartRemainingStats() {
  const [originalData, setOriginalData] = useState([]); // دیتای خام که از API میاد
  const [groupedData, setGroupedData] = useState([]); // دیتای پردازش شده

  // **فراخوانی API فقط یک بار هنگام لود شدن صفحه**
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const endpoint = `/exchanges/liabilities`;
        const response = await axiosClient2.get(endpoint);
        
        if (response.data.data) {
          const arrayData = Object.values(response.data.data).flat();
          setOriginalData(arrayData); // فقط مقدار اولیه رو ذخیره می‌کنیم
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTransactions();
  }, []);

  // **محاسبه groupedData فقط زمانی که originalData تغییر کند**
  useEffect(() => {
    if (originalData.length === 0) return;

    const grouped = Object.values(
      originalData.reduce((acc, item) => {
        const { exchange_id, total_amount, total_price } = item;

        if (!acc[exchange_id]) {
          acc[exchange_id] = { ...item, total_amount: 0, total_price: 0 };
        }

        acc[exchange_id].total_amount += Number(total_amount);
        acc[exchange_id].total_price += Number(total_price);

        return acc;
      }, {})
    );

    setGroupedData(grouped); // مقدار پردازش شده رو تنظیم می‌کنیم
  }, [originalData]); // این useEffect فقط زمانی اجرا می‌شه که originalData تغییر کنه

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center ">
         <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع مشتریان:
        </label>
        <div className="flex gap-2 items-center">
        <select
          id="operationFilter"
          className="border border-gray-300 w-2/3 rounded px-2 py-1"
        
        >
             <option value="all">همه</option>
          <option value="buy">مشتریان API</option>
          <option value="sell">BTC</option>
          
        </select>
        <div className="w-1/3 text-green-500">
          <span>خریداری شده :</span>
          <span>۱۲۰,۰۰۰,۰۰۰</span>
        </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع ارز:
        </label>
         <div className="flex items-center gap-1">
         <select
          id="operationFilter"
          className="border w-2/3 border-gray-300 rounded px-2 py-1"
        
        >
       <option value="1">تتر</option>
          <option value="2">ریال </option>
          <option value="3">تتر ریالی</option>
        </select>
        <div className="w-1/3 text-red-500">
          <span>فروخته شده :</span>
          <span>۱۲۰,۰۰۰,۰۰۰</span>
        </div>
         </div>
      </div>
         </div>
      {groupedData?.map((exchange , index) => (
        <div
          className="group p-6 bg-gradient-to-br from-[#3ABEF9] to-[#3499d9] shadow-xl w-full md:w-[320px] rounded-lg text-center border border-gray-300 hover:shadow-2xl cursor-pointer hover:translate-y-[-5px] transition-all duration-300 hover:scale-105"
          key={index}
        >
          <div className="relative">
            <img
            src={`https://pars-v2.liara.run/${exchange.exchange_logo}`} 
              alt={`${exchange.exchange_id} Logo`}
              className="mx-auto mb-4 w-16 h-16 rounded-full border-2  group-hover:rotate-15 group-hover:scale-30 group-hover:border-slate-600 transition-transform duration-300"
            />
          
          </div>
          <h3 className="text-lg  text-gray-100">{exchange.exchange_name_fa}</h3>
          <p className="text-gray-100 mt-2">
            <strong>کل ارزش خرید:</strong>{" "}
            {exchange?.totalBuy} ریال
          </p>
          <p className="text-gray-100">
            <strong>میزان دارایی:</strong>{" "}
            {Number(exchange?.total_amount)} ریال
          </p>
          <p className="text-gray-100">
            <strong>کل ارز فروخته:</strong>{" "}
            {Number(exchange?.total_price)} ریال
          </p>
        </div>
      ))}
    </div>
  );
}
