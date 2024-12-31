import { useState } from "react";
import { FaPlay , FaPause , FaRegEye  } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { toast } from "react-hot-toast";
import axios from "axios";


const ListStrategy = () => {
  const [modalContent, setModalContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playState, setPlayState] = useState({});
  

  const strategies = [
    {
      id: 1,
      name: "استراتژی اول",
      progress: "75%",
      buyers: ["علی", "حسین", "زهرا"],
      suppliers: ["شرکت A", "شرکت B"],
      profit: "20%",
      lowerLimit: "1000",
      trailingStop: "5%",
      repeat: true,
    },
    {
      id: 2,
      name: "استراتژی دوم",
      progress: "50%",
      buyers: ["محمد", "مریم"],
      suppliers: ["شرکت C", "شرکت D"],
      profit: "15%",
      lowerLimit: "2000",
      trailingStop: "10%",
      repeat: false,
    },
  ];

  const handleView = (list) => {
    setModalContent(list);
    setIsModalOpen(true);
  };
  const handleRipet = (strategyId) => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="mt-8">آیا از تکرار مطمئن هستید؟</p>
          <div className="flex justify-center gap-4 my-10">
          <button
              className="px-4 py-2 bg-gray-300 text-black rounded"
              onClick={() => toast.dismiss(t.id)} 
            >
              خیر
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => {
                toast.dismiss(t.id);
                repeatStrategy(strategyId); 
              }}
            >
              بله
            </button>
          
          </div>
        </div>
      ),
      {
        duration: Infinity, // پیام تا زمانی که کاربر تصمیم بگیرد باز می‌ماند
      }
    );
  };
  
  // ارسال مشخصات به API
  const repeatStrategy = async (strategyId) => {
    try {
      const response = await axios.post("/api/repeat-strategy", { id: strategyId });
      toast.success("استراتژی با موفقیت تکرار شد");
      console.log("API Response:", response.data);
    } catch (error) {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      console.error("API Error:", error);
    }
  };

  const togglePlayStop = (id) => {
   setPlayState((prevState) => {
     const isPlaying = prevState[id];
     alert(isPlaying ? "استوپ شد" : "پلی شد");
     return {
       ...prevState,
       [id]: !isPlaying,
     };
   });
 };

  return (
    <div>
      <h1 className="text-lg font-bold mb-4 mt-4">لیست استراتژی‌ها</h1>
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ردیف",
                "نام استراتژی",
                "درصد انجام شده",
                "خریداران",
                "تامین کنندگان",
                "سود مطلوب",
                "حد پایین",
                "استاپ ترلینگ",
                "توقف",
                "تکرار",
              ].map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-4 text-center text-sm font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {strategies.map((strategy, index) => (
              <tr key={strategy.id}>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">{index + 1}</td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.name}</td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.progress}</td>
                <td className=" text-sm text-gray-500">
                  <FaRegEye   onClick={() => handleView(strategy.buyers)} className="cursor-pointer mr-10 text-xl"/>
                
                </td>
                <td className="text-sm text-gray-500">
                <FaRegEye   onClick={() => handleView(strategy.suppliers)}  className="cursor-pointer mr-10 text-xl"/>
                  
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.profit}</td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.lowerLimit}</td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.trailingStop}</td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  <button
                    onClick={() => togglePlayStop(strategy.id)}
                    className="text-xl text-gray-700 hover:text-gray-900"
                  >
                    {playState[strategy.id] ? <FaPlay style={{ color: "red" }} /> : <FaPause style={{ color: "green" }}/>}
                  </button>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 text-center">
                  {/* {strategy.repeat ? "بله" : "خیر"} */}
                  <MdOutlineReplay
                   size={20}
                  onClick={() => handleRipet(strategy.id)}
                  className="cursor-pointer"
                   />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">لیست</h2>
            <ul className="list-disc list-inside">
              {modalContent.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setIsModalOpen(false)}
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListStrategy;
