import { useState } from "react";
import Modal from "../../components/Bot/ModalStrategy";
import StrategyFormComponent from "../../components/Bot/StrategyFormComponent";
import { toast } from "react-toastify";
import axiosClient2 from "../../axios-client2";

export default function Strategy() {
  const [isSupplierModalOpen, setSupplierModalOpen] = useState(false);
  const [isBuyerModalOpen, setBuyerModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    currency: "USDT",
    suppliers: [],
    buyers: [], 
    strategyName: "", 
    diff_percent: "", 
    lower_diff_percent: "", 
    stop_loss: "",
    shopping : "",
    type : "",
  });

  const [supplierExchanges, setSupplierExchanges] = useState([
    { id: 1, name: "نیوبیکس", selected: false },
    { id: 2, name: "آبان تتر", selected: false },
    { id: 3, name: "exch", selected: false },
    { id: 4, name: "لیدیا", selected: false },
    { id: 5, name: "تترلند", selected: false },
    { id: 6, name: "DAI", selected: false },
    { id: 7, name: "همه", selected: false },
  ]);
  const [buyerExchanges, setBuyerExchanges] = useState([
    { id: 1, name: "نیوبیکس", selected: false },
    { id: 2, name: "آبان تتر", selected: false },
    { id: 3, name: "exch", selected: false },
    { id: 4, name: "لیدیا", selected: false },
    { id: 5, name: "تترلند", selected: false },
    { id: 6, name: "DAI", selected: false },
    { id: 7, name: "همه", selected: false },
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
    if (name === "shopping" || name === "amount" || name === "amount") {
      const plainValue = value.replace(/,/g, '');
      const formattedValue = Number(plainValue).toLocaleString('en-US');
  
      setFormData((prev) => ({ ...prev, [name]: formattedValue })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async () => {
    try {
      const amountWithoutCommas = formData.amount 
        ? parseInt(formData.amount.replace(/,/g, '')) 
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
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
        toast.error("خطا در ارسال اطلاعات!");
      } else {
        toast.error("خطای داخلی! لطفا دوباره تلاش کنید.");
      }
    }
  };
  


  

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


  // const handleSubmit = async () => {
  //   if (
  //     !formData.lastname ||
  //     !formData.national_code ||
  //     !formData.mobile ||
      
  //   ) {
  //     console.log("عررور");
  //     toast.error("لطفاً تمام فیلدهای ضروری را پر کنید.");
  //     return;
  //   }

  //   try {
  //     const response = await axiosClient2.post(
  //       "/users",
  //       formData
  //     );
  //     console.log("Response from server:", response.data);
  //     toast.success("اطلاعات با موفقیت ثبت شد!");
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     toast.error("خطا در ارسال اطلاعات!");
  //   }
  // };

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
