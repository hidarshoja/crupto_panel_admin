import { useEffect, useState } from "react";
import ModalStrategy from "../../components/Bot/ModalStrategy";
import StrategyFormComponent from "../../components/Bot/StrategyFormComponent";
import { toast } from "react-toastify";
import axiosClient2 from "../../axios-client2";
import { useNavigate } from "react-router-dom";

export default function Strategy() {
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const [isBuyerModalOpen, setBuyerModalOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    currency: "Tether",
    suppliers: [],
    buyers: [],
    strategyName: "",
    diff_percent: "",
    lower_diff_percent: "",
    stop_loss: "",
    shopping: "",
    type: "",
  });

  const [supplierExchanges, setSupplierExchanges] = useState([]);
  const [buyerExchanges, setBuyerExchanges] = useState([]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "shopping" || name === "amount" || name === "amount") {
      const plainValue = value.replace(/,/g, "");
      const formattedValue = Number(plainValue).toLocaleString("en-US");

      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const amountWithoutCommas = formData.amount
        ? parseInt(formData.amount.replace(/,/g, ""))
        : 0;

      const suppliers = supplierExchanges
        .filter((item) => item.selected)
        .map((item) => ({
          id: item.id,
          min_in_transaction: parseInt(item.min_in_transaction),
          max: parseInt(item.max),
        }));

      const buyers = buyerExchanges
        .filter((item) => item.selected)
        .map((item) => ({
          id: item.id,
          min_in_transaction: item.min_in_transaction,
          max: item.max,
        }));

      const finalFormData = {
        ...formData,
        amount: amountWithoutCommas,
        suppliers,
        buyers,
      };

      const response = await axiosClient2.post("/strategies", finalFormData);
      console.log("Response from server:", response.data);
      toast.success("اطلاعات با موفقیت ثبت شد!");
      navigate("/bot/strategy-list");
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors } = error.response.data;
        toast.error(message || "خطا در ارسال اطلاعات!");
        if (errors) {
          Object.values(errors).forEach((errorMessages) => {
            errorMessages.forEach((errorMessage) => {
              toast.error(errorMessage);
            });
          });
        }
      } else {
        toast.error("خطا در ارسال اطلاعات!");
      }
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosClient2.get("/exchanges");
        const exchanges = response.data.data.map((exchange) => ({
          id: exchange.id,
          name: exchange.name_fa,
          selected: false,
        }));
        setBuyerExchanges(exchanges);
        setSupplierExchanges(exchanges);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  const handleReset = () => {
    setFormData({
      title: "",
      amount: "",
      currency: "USDT",
      suppliers: [],
      buyers: [],
      strategyName: "",
      diff_percent: "",
      lower_diff_percent: "",
      stop_loss: "",
    });
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">ایجاد استراتژی</h1>
      <StrategyFormComponent
        formData={formData}
        handleInputChange={handleInputChange}
        setSupplierModalOpen={setSupplierModalOpen}
        setBuyerModalOpen={setBuyerModalOpen}
      />
      <div className="flex justify-end mt-8 pb-8 gap-3">
        <button
          onClick={handleReset}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
        >
          انصراف
        </button>
        <button className="bg-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-500">
          ویرایش
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          ثبت
        </button>
      </div>

      <ModalStrategy
        formData={formData}
        isOpen={isSupplierModalOpen}
        exchanges={supplierExchanges}
        onUpdate={setSupplierExchanges}
        onClose={() => setSupplierModalOpen(false)}
      />

      <ModalStrategy
        formData={formData}
        isOpen={isBuyerModalOpen}
        exchanges={buyerExchanges}
        onUpdate={setBuyerExchanges}
        onClose={() => setBuyerModalOpen(false)}
      />
    </div>
  );
}
