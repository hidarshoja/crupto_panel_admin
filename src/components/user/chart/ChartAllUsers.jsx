import { useState , useEffect } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
import axiosClient2 from "../../../axios-client2";

export default function ChartAllUsers() {

  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [dateBirth2, setDateBirth2] = useState(new DateObject());
  const [dataChart, setDataChart] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    asset_id: '',
  });

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
  
  const  handleFilterByDate = () => {
    const startDate = convertPersianToEnglishNumbers(dateBirth.format("YYYY-MM-DD"));
    const endDate = convertPersianToEnglishNumbers(dateBirth2.format("YYYY-MM-DD"));
  
  
    let endpoint = `/statistics/daily-user-asset?start_date=${startDate}&end_date=${endDate}`;
  
    const response = axiosClient2.get(endpoint);
    console.log("response.data.data", response.data.data);
    
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let endpoint = `/statistics/daily-user-asset`;
  
        const queryParams = [];
        if (formData.type) queryParams.push(`type=${formData.type}`);
        if (formData.asset_id) queryParams.push(`asset_id=${formData.asset_id}`);
  
      
        if (queryParams.length > 0) {
          endpoint += `?${queryParams.join("&")}`;
        }
  
        const response = await axiosClient2.get(endpoint);
        console.log("response.data.data", response.data.data);
  
        if (Array.isArray(response.data.data)) {
          const buyData = response.data.data.filter(item => item.type === 1);
          const sellData = response.data.data.filter(item => item.type === 2);
  
          const buyLabels = buyData.map(item => item.asset.name);
          const sellLabels = sellData.map(item => item.asset.name);
  
          const buyValues = buyData.map(item => parseFloat(item.total_price));
          const sellValues = sellData.map(item => parseFloat(item.total_price));
  
          setDataChart({
            labels: [...buyLabels, ...sellLabels],
            datasets: [
              {
                label: 'خرید',
                data: buyValues,
                backgroundColor: 'rgba(0, 255, 0, 0.8)', 
                borderColor: 'rgba(0, 255, 0, 3)',
                borderWidth: 1,
              },
              {
                label: 'فروش',
                data: sellValues,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                borderColor: 'rgba(255, 0, 0, 3)',
                borderWidth: 1,
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
  }, [formData.type, formData.asset_id]);
  



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
  };


 
  

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 w-full mt-6">
      <div className="w-full md:w-1/2 flex flex-col gap-1">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
          نوع عملیات:
        </label>
        <select
          id="operationFilter"
           name="type"
          className="border border-gray-300 rounded px-2 py-1"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">همه</option>
          <option value="1">خرید</option>
          <option value="2">فروش</option>
        </select>
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
            <option value="">انتخاب کنید</option>
              <option value="1">ریال</option>
              <option value="2">تتر</option>
        </select>
      </div>
      </div>
      <div className="my-4 flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-2/5 flex flex-col gap-1">
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
              <div className="w-full md:w-2/5 flex flex-col gap-1">
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
              <button
        onClick={handleFilterByDate}
        className="bg-[#090580] hover:bg-[#3ABEF9] text-white w-full text-sm md:w-1/5 px-4 mt-[23px]  rounded h-[43px]"
      >
        فیلتر براساس تاریخ
            </button>
      </div>
      <h1 className="text-center font-bold text-lg mt-6">نمودار آمار کلی خرید و فروش   </h1>
      {/* <Bar data={dataChart} options={options} /> */}
      <div>
      {dataChart ? (
        <Bar data={dataChart} options={options} />
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





