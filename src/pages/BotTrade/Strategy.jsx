import { useState } from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import axios from "axios";
import Modal from "../../components/Bot/ModalStrategy";
import StrategyFormComponent from "../../components/Bot/StrategyFormComponent";

export default function Strategy() {
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const [isBuyerModalOpen, setBuyerModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    strategy: "",
    transactionAmount: "",
    currency: "USDT",
    suppliers: [],
    buyers: [], 
    strategyName: "", 
    desiredProfit: "", 
    lowerLimit: "", 
    trailingStop: "",
    shopping : "",
    Purchase : "",
  });

  const [supplierExchanges, setSupplierExchanges] = useState([
    { id: 1, name: "نیوبیکس", selected: true },
    { id: 2, name: "آبان تتر", selected: true },
    { id: 3, name: "exch", selected: true },
    { id: 4, name: "لیدیا", selected: true },
    { id: 5, name: "تترلند", selected: true },
    { id: 6, name: "DAI", selected: true },
    { id: 7, name: "همه", selected: true },
  ]);
  const [buyerExchanges, setBuyerExchanges] = useState([
    { id: 1, name: "نیوبیکس", selected: true },
    { id: 2, name: "آبان تتر", selected: true },
    { id: 3, name: "exch", selected: true },
    { id: 4, name: "لیدیا", selected: true },
    { id: 5, name: "تترلند", selected: true },
    { id: 6, name: "DAI", selected: true },
    { id: 7, name: "همه", selected: true },
  ]);

  const toggleSelection = (index, type) => {
    const isSupplier = type === "supplier";
    const exchanges = isSupplier ? [...supplierExchanges] : [...buyerExchanges];
  
    exchanges[index].selected = !exchanges[index].selected;
  
    if (isSupplier) {
      setSupplierExchanges(exchanges);
    } else {
      setBuyerExchanges(exchanges);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "shopping" || name === "Purchase" || name === "transactionAmount") {
      const plainValue = value.replace(/,/g, '');
      const formattedValue = Number(plainValue).toLocaleString('en-US');
  
      setFormData((prev) => ({ ...prev, [name]: formattedValue })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = () => {
    // افزودن تامین‌کنندگان و خریداران انتخاب‌شده به فرم
    const suppliers = supplierExchanges.filter((item) => item.selected).map((item) => item.name);
    const buyers = buyerExchanges.filter((item) => item.selected).map((item) => item.name);
  
    const finalFormData = {
      ...formData,
      suppliers,
      buyers,
    };
  
    // لاگ آبجکت نهایی فرم
    console.log("Final Form Data:", finalFormData);
  
    // ارسال به سرور (در صورت نیاز)
    /*
    axios.post("https://jsonplaceholder.typicode.com/posts", finalFormData)
      .then((response) => {
        console.log("Response:", response.data);
        alert("فرم با موفقیت ارسال شد!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("خطا در ارسال فرم. لطفاً دوباره تلاش کنید.");
      });
    */
  };
  

  const handleReset = () => {
    setFormData({
      strategy: "",
      transactionAmount: "",
      currency: "USDT",
      suppliers: [],
      buyers: [],
      strategyName: "",
      desiredProfit: "",
      lowerLimit: "",
      trailingStop: "",
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
      <Modal
  isOpen={isSupplierModalOpen}
  exchanges={supplierExchanges}
  toggleSelection={(index) => toggleSelection(index, "supplier")}
  onClose={() => setSupplierModalOpen(false)}
/>

<Modal
  isOpen={isBuyerModalOpen}
  exchanges={buyerExchanges}
  toggleSelection={(index) => toggleSelection(index, "buyer")}
  onClose={() => setBuyerModalOpen(false)}
/>
    </div>
  );
}
