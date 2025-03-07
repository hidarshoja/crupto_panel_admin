import { useState , useEffect } from "react";
import { Line } from "react-chartjs-2";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import UserBox from "../UserBox";
import jalaali from "jalaali-js";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import axiosClient2 from "../../axios-client2";

export default function ChartAllUsers({assets}) {

  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [dateBirth2, setDateBirth2] = useState(new DateObject());
  const [dataChart, setDataChart] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    asset_id: '',
  });

const [userId, setUserId] = useState(null);
const[users , setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const convertPersianToEnglishNumbers = (str) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
    let result = str;
    persianNumbers.forEach((persian, index) => {
      result = result.replace(new RegExp(persian, 'g'), englishNumbers[index]);
    });
  
    return result;
  };
  
  const handleFilterByDate = () => {
    const startDateFormatted = convertPersianToEnglishNumbers(dateBirth.format("YYYY-MM-DD"));
    const endDateFormatted = convertPersianToEnglishNumbers(dateBirth2.format("YYYY-MM-DD"));
    setStartDate(startDateFormatted); 
    setEndDate(endDateFormatted); 
  };

  const handleRemoveDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let endpoint = `/statistics/daily-user-asset?user_type=3`;
  
        const queryParams = [];
        if (startDate && endDate) {
          queryParams.push(`start_date=${startDate}`);
          queryParams.push(`end_date=${endDate}`);
        }
        if (formData.type) queryParams.push(`type=${formData.type}`);
        if (formData.asset_id) queryParams.push(`asset_id=${formData.asset_id}`);
        if (userId) queryParams.push(`user_id=${userId}`);
  
   
        if (queryParams.length > 0) {
          endpoint += `&${queryParams.join("&")}`;
        }
  
        const response = await axiosClient2.get(endpoint);
        console.log("response.data.data", response.data.data);
  
        
         if (Array.isArray(response.data.data)) {
                  const sortedData = response.data.data.sort((a, b) => new Date(a.date) - new Date(b.date));
                 
                  const groupedData = sortedData.reduce((acc, item) => {
                    if (!acc[item.date]) {
                      acc[item.date] = { buy: 0, sell: 0 , name: item.asset.name , userName: item.user.name};
                    }
                    if (item.type === 1) {
                      acc[item.date].buy += parseFloat(item.total_price);
                    } else {
                      acc[item.date].sell += parseFloat(item.total_price);
                    }
                    return acc;
                  }, {});
                  const dates = Object.keys(groupedData).map(date => {
                    const d = new Date(date);
                    const { jy, jm, jd } = jalaali.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
                    return `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
                  });
          
                  const buyValues = Object.keys(groupedData).map(date => groupedData[date].buy);
                  const sellValues = Object.keys(groupedData).map(date => groupedData[date].sell);
                  const walletValues = Object.keys(groupedData).map(date => groupedData[date].name);
                  const userValues = Object.keys(groupedData).map(date => groupedData[date].userName);
          
                  setDataChart({
                    labels: dates, 
                    datasets: [
                      {
                        label: 'خرید',
                        data: buyValues,
                        backgroundColor: 'rgba(0, 255, 0, 0.8)',
                        borderColor: 'rgba(0, 255, 0, 3)',
                        borderWidth: 1,
                        wallet : walletValues,
                        userName: userValues
                      },
                      {
                        label: 'فروش',
                        data: sellValues,
                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                        borderColor: 'rgba(255, 0, 0, 3)',
                        borderWidth: 1,
                        wallet : walletValues,
                        userName: userValues
                      },
                    ],
                  });
                } else {
                  console.error("Invalid data structure:", response.data.data);
                }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
  
    fetchTransactions();
  }, [startDate ,endDate ,formData.type, formData.asset_id , userId]);


    useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);
  
  



  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            family: "vazir",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleAlign: "center",
        bodyAlign: "center",
        caretPadding: 12,
        caretSize: 8,
        position: "nearest",
        yAlign: "bottom",
        displayColors: false,
        titleFont: {
          family: "vazir", 
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          family: "vazir", 
          size: 13,
        },
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const transaction = dataChart?.datasets[context.datasetIndex].data[index];
            const name = dataChart?.datasets[context.datasetIndex].wallet[index];
            const userName = dataChart?.datasets[context.datasetIndex].userName[index];
            if (transaction) {
              return [
                `نام ارز: ${name || "نامشخص"}`,
                `نام کاربر: ${userName || "نامشخص"}`,
                `مبلغ: ${parseInt(transaction).toLocaleString()} تومان`,
              ];
            }
  
            return "";
          },
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "vazir",
          },
        },
        title: {
          display: true,
          text: "",
          padding: {
            bottom: 10,
          },
          font: {
            size: 14,
            family: "vazir",
          },
        },
        min: 50,
      },
      x: {
        ticks: {
          font: {
            size: 12,
            weight: "bold",
            family: "vazir",
          },
        },
        title: {
          display: true,
          text: "",
          padding: {
            top: 10,
          },
          font: {
            size: 14,
            family: "vazir",
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 10, 
        tension: 0.5, 
        borderJoinStyle: "round",

      },
    },
  };


 
 
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 w-full mt-6">
      
       <div className="w-full md:w-1/2 flex flex-col mt-[-3px]">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
           نوع کاربر:
        </label>
      
          <UserBox
                people={users}
                 setUserId={setUserId}
             />
       </div>
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="currencyFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع ارز:
        </label>
        <select
          id="currencyFilter"
          name="asset_id" 
          className="border border-gray-300 rounded px-2 py-1"
          value={formData.asset_id}
          onChange={handleChange}
        >
             <option value="">همه</option>
             {assets?.map((wallet) => (
              <option key={wallet.id} value={wallet.related_asset}>
                {wallet.name_fa} ({wallet.symbol})
              </option>
            ))}
        </select>
      </div>
      </div>
      <div className="my-4 flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-2/6 flex flex-col gap-1">
                <span className="block text-gray-700 text-sm font-bold  w-28">
                   از تاریخ :
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={dateBirth}
                  onChange={setDateBirth}
                  calendarPosition="bottom-right"
                  inputClass="custom-input"
                />
              </div>
              <div className="w-full md:w-2/6 flex flex-col gap-1">
                <span className="block text-gray-700 text-sm font-bold  w-28">
                   تا تاریخ :
                </span>
                <DatePicker
                  calendar={persian}
                  locale={persian_fa}
                  value={dateBirth2}
                  onChange={setDateBirth2}
                  calendarPosition="bottom-right"
                  inputClass="custom-input"
                />
              </div>
              <button  onClick={handleRemoveDateFilter} className="bg-[#800505] hover:bg-[#f93aa3] text-white w-full text-sm md:w-1/6 px-4 mt-[23px]  rounded h-[43px]">حذف تاریخ</button>
              
              <button
        onClick={handleFilterByDate}
        className="bg-[#090580] hover:bg-[#3ABEF9] text-white w-full text-sm md:w-1/6 px-4 mt-[23px]  rounded h-[43px]"
      >
        فیلتر براساس تاریخ
            </button>
      </div>
      <h1 className="text-center font-bold text-lg mt-6">نمودار آمار کلی خرید و فروش   </h1>
      <div>
      {dataChart ? (
        <Line data={dataChart} options={options} />
      ) : (
        <div>
        <p
                    
                    className="py-20 text-center bg-gray-100"
                  >
                    <div className="flex justify-center items-center">
                      <svg
                        className="animate-spin h-20 w-20 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        ></path>
                      </svg>
                    </div>
                  </p>
      </div>
      )}
    </div>
    </div>
  );
}