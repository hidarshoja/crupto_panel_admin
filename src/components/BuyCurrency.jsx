import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
Chart.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);
import axiosClient2 from "../axios-client2";

export default function BuyCurrency() {
  const [dataChart, setDataChart] = useState(null);
  const [dataChart2 , setDataChart2] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    asset_id: '',
  });

 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let endpoint = `/statistics/total?user_type=1`;
        const queryParams = [];
        if (formData.type) queryParams.push(`type=${formData.type}`);
        if (formData.asset_id) queryParams.push(`asset_id=${formData.asset_id}`);
        if (queryParams.length > 0) endpoint += `?${queryParams.join("&")}`;

        const response = await axiosClient2.get(endpoint);
        setDataChart2(response.data.data)
        if (Array.isArray(response.data.data)) {
          const sellData = response.data.data.filter(item => item.type === 1);
          const sellLabels = sellData.map(item => item.type_label); 
          const sellValues = sellData.map(item => parseFloat(item.total_price));

          setDataChart({
            labels: sellLabels,
            datasets: [
              {
                label: 'خرید',
                data: sellValues,
                borderColor: "#00ff00",
                borderWidth: 2,
                pointBorderColor: "#00ff00",
                tension: 0.5,
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
        display: false,
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
            const transaction = dataChart2?.filter(item => item.type === 2)[index];
  
            if (transaction) {
              return [
                `تاریخ: ${transaction?.date || "نامشخص"}`,
                `مبلغ: ${parseInt(transaction?.total_price).toLocaleString()} تومان`,
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
          display: false,
        },
        title: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    },
  };


  const totalPriceSum = dataChart2?.filter(item => item.type === 1)  
  .reduce((sum, item) => sum + parseFloat(item.total_price), 0);

  return (
    <>
    <div>
      {dataChart ? (
        <Line data={dataChart} options={options} />
      ) : (
        <div>
          <p className="py-20 text-center">
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-6 w-12 text-blue-500"
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
    {
    (totalPriceSum  || totalPriceSum  == 0 )&&
     <p className="text-gray-100 text-sm mt-1 text-center group-hover:text-gray-800 transition-colors duration-300">
     مجموع: {totalPriceSum?.toLocaleString()} تومان
   </p>
   }
    </>
  );
}
