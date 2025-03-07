import { useState , useEffect } from "react";
import { Bar } from "react-chartjs-2";
import UserBox from "../../UserBox1";
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
import axiosClient2 from "../../../axios-client2";

export default function ChartAllUsers({assets}) {
  const [dataChart, setDataChart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [exchange , setExchange] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    asset_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
      setFormData((prev) => ({ ...prev, [name]: value }));
    
  };


  
 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let endpoint = `/statistics/daily-user-asset?user_type=1`;
  
        const queryParams = [];
        if (formData.type) queryParams.push(`type=${formData.type}`);
        if (formData.asset_id) queryParams.push(`asset_id=${formData.asset_id}`);
        if (userId) queryParams.push(`user_id=${userId}`);
  
   
        if (queryParams.length > 0) {
          endpoint += `&${queryParams.join("&")}`;
        }
  
        const response = await axiosClient2.get(endpoint);
         console.log(`response`, response);
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
                borderWidth: 3,
                tension: 0.4,
              },
              {
                label: 'فروش',
                data: sellValues,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                borderColor: 'rgba(255, 0, 0, 3)',
                borderWidth: 3,
                tension: 0.4,
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
  }, [formData.type, formData.asset_id , userId]);


  

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
      
       <div className="w-full md:w-1/2 flex flex-col mt-[-3px]">
        <label htmlFor="operationFilter" className="block text-gray-700 text-sm font-bold  w-28">
           نوع صرافی:
        </label>
      
          <UserBox
                people={exchange}
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
            <option value="">انتخاب کنید</option>
              <option value="1">ریال</option>
              <option value="2">تتر</option>
        </select>
      </div>
      </div>
      
      <h1 className="text-center font-bold text-lg mt-6">نمودار آمار کلی خرید و فروش   </h1>
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