import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axiosClient from "../../axios-client";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { addMonths, format, parseISO, setDate } from "date-fns";
import "moment/locale/fa";
import UserBox from "../userBox";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Chart,
  BarElement, // Import BarElement
  CategoryScale, // x axis
  LinearScale, // y axis
  Legend,
  Tooltip,
} from "chart.js";
import { formatDate } from "../../utils/change-date";

Chart.register(
  BarElement, // Register BarElement
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const DepositChart = () => {
  const [receivedData, setReceivedData] = useState([]);
  const [xData, setXData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [dateBirth, setDateBirth] = useState(new DateObject());
  const [userId, setUserId] = useState(0);
  const [people, setPeople] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setReceivedData([]);
      setXData([]);
      const { formattedDateFrom, formattedDateTo } = formatDate(
        dateBirth,
        dateBirth
      );

      // تبدیل تاریخ‌ها به یکم ماه
      const newFormattedDateFrom = format(
        setDate(parseISO(formattedDateFrom), 1),
        "yyyy-MM-dd"
      );
      const newFormattedDateTo = format(
        setDate(parseISO(formattedDateTo), 1),
        "yyyy-MM-dd"
      );

      // اضافه کردن یک ماه به formattedDateTo
      const finalDateTo = addMonths(new Date(newFormattedDateTo), 1);
      const finalFormattedDateTo = format(finalDateTo, "yyyy-MM-dd");

      console.log(finalFormattedDateTo); // تاریخ جدید را چاپ کنید

      const url = `/admin/statistics/time-frame?start_date=${newFormattedDateFrom} 00:00:00&end_date=${finalFormattedDateTo} 23:59:59&transaction_type=1&asset_id=${selectedWallet}${
        userId ? `&user_id=${userId}` : ""
      }`;

      try {
        const response = await axiosClient.get(url);
        setChartValues(response.data.data);
        console.log("مقدار چارت", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateBirth, userId, selectedWallet]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/admin/users?per_page=200000");
        setPeople(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [people]);

  const setChartValues = (chart) => {
    setReceivedData([]);
    if (chart.length > 0) {
      console.log(chart);
      chart?.map((items) => {
        setReceivedData((prev) => [...prev, items.user.name]);
        setXData((prev) => [...prev, items.sum_deposits]);
      });
    }
  };

  useEffect(() => {
    let totalAmount = 0;
    receivedData.forEach((amount) => {
      totalAmount += parseInt(amount.y);
    });
    setAmount(totalAmount);
  }, [receivedData]);

  const labels = receivedData;
  const chartData = xData;

  const data = {
    labels: labels, // Use generated labels for x-axis
    datasets: [
      {
        label: "واریز",
        data: chartData,
        backgroundColor: "#008000",
        borderColor: "#009000",
        borderWidth: 1,
      },
    ],
  };

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

  const containerStyle = {
    width: "100%", // Set the width to 100%
    height: "100%",
    padding: "20px",
    cursor: "pointer",
  };

  const handleSelectChange = (e) => {
    const newValue = e.target.value;
    setSelectedWallet(newValue);
  };

  return (
    <div className="w-full">
       <div className="w-full flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="w-full flex flex-col gap-1 md:w-1/2">
          <span className="block text-gray-700 text-sm font-bold mb-2 w-28">
                 نام کاربر :
              </span>
            <UserBox setUserId={setUserId} people={people} />
          </div>
          <div className="flex w-full md:w-1/2 flex-col md:flex-row gap-2 lg:flex-row justify-center items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-1">
              <span className="block text-gray-700 text-sm font-bold mb-2 w-28">
                انتخاب ماه :
              </span>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={dateBirth}
                onChange={setDateBirth}
                calendarPosition="bottom-right"
                inputClass="custom-input"
                onlyMonthPicker
                calendarDirection="ltr"
                format="YYYY/MM"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-1">
              <span className="px-1"> نوع کیف پول :</span>
              <select
                name="nameWallet"
                id="nameWallet"
                className="px-3 mt-1 py-1.5 border border-gray-300 rounded w-full"
                value={selectedWallet}
                onChange={handleSelectChange}
              >
                <option value="1">pos</option>
                <option value="2"> اینترنتی</option>
                <option value="3">حساب </option>
                <option value="4">چک</option>
                <option value="5">vip </option>
                <option value="6"> کارت</option>
              </select>
            </div>
          </div>
        </div>

      <Bar data={data} options={options} style={containerStyle}></Bar>
    </div>
  );
};

export default DepositChart;
