import { useState , useEffect } from "react";
import { FaPlay , FaPause , FaRegEye  } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { toast } from "react-toastify";
import axiosClient2 from "../../axios-client2";
import LoadingTable from "../../components/LoadingTable";


const ListStrategy = () => {
  const [modalContent, setModalContent] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playState, setPlayState] = useState({});
  const [strategiesList, setStrategiesList] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [countPage , setCountPage] = useState(1);
  const[totalPage , setTotalPage] = useState(0)
  

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
        duration: Infinity, 
      }
    );
  };
  // strategies/STRATEGY_ID/stop

  const repeatStrategy = async (STRATEGY_ID) => {
    try {
      const response = await axiosClient2.post(`/strategies/${STRATEGY_ID}/run`);
      toast.success("استراتژی با موفقیت متوقف شد");
    } catch (error) {
      toast.error("خطا در انجام عملیات!");
    }
  };

  const stopStrategy = async (STRATEGY_ID) => {
    try {
      const response = await axiosClient2.post(`/strategies/${STRATEGY_ID}/stop`);
      toast.success("استراتژی با موفقیت اجرا شد");
    } catch (error) {
      toast.error("خطا در انجام عملیات!");
    }
  };

  const togglePlayStop = (id) => {
   setPlayState((prevState) => {
     const isPlaying = prevState[id];
 
     return {
       ...prevState,
       [id]: !isPlaying,
     };
   });
 };

 useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await axiosClient2.get(`/strategies?page=${countPage}`);
      setStrategiesList(response.data.data);
      setTotalPage(response.data.meta.last_page);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  fetchTransactions();
}, [countPage]);


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
        "نوع استراتژی",
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
  {isloading ? (
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colSpan={10} className="h-[300px] flex items-center justify-center text-center">
          <LoadingTable />
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody className="divide-y divide-gray-200 bg-white">
      {strategiesList?.map((strategy, index) => (
        <tr key={strategy.id}>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">{index + 1}</td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">{strategy.title}</td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">
            {strategy.diff_percent} %
          </td>
          <td className="text-sm text-gray-500">
            <FaRegEye
              onClick={() => handleView(strategy.buyers)}
              className="cursor-pointer mr-10 text-xl"
            />
          </td>
          <td className="text-sm text-gray-500">
            <FaRegEye
              onClick={() => handleView(strategy.suppliers)}
              className="cursor-pointer mr-10 text-xl"
            />
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">
            {strategy.type === "1" ? "فروش" : "خرید"}
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">
            {strategy.lower_diff_percent} %
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">
            {strategy.stop_loss} %
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">
            <button
              onClick={() => togglePlayStop(strategy.id)}
              className="text-xl text-gray-700 hover:text-gray-900"
            >
              {playState[strategy.id] ? (
                <FaPlay style={{ color: "red" }} 
                onClick={() =>  stopStrategy(strategy.id)}
                />
              ) : (
                <FaPause style={{ color: "green" }}
                onClick={() => repeatStrategy(strategy.id)}
                />
              )}
            </button>
          </td>
          <td className="px-3 py-4 text-sm text-gray-500 text-center">
            <MdOutlineReplay
              size={20}
              onClick={() => handleRipet(strategy.id)}
              className="cursor-pointer"
            />
          </td>
        </tr>
      ))}
    </tbody>
  )}
</table>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">لیست</h2>
            <ul className="list-disc list-inside">
              {modalContent.map((item, index) => (
                <li key={index}>{item.name}</li>
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
       <div className="flex justify-between items-center mt-4">
        <button
             disabled={countPage === 1}
             onClick={() =>
               setCountPage((prev) => prev - 1)
             }
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <span>
        صفحه {countPage} از {totalPage}
        </span>
        <button
           disabled={countPage === totalPage}
           onClick={() =>
             setCountPage((prev) => prev + 1)
           }
          className="px-4 py-2 bg-[#090580] text-white rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
      </div>
    </div>
  );
};

export default ListStrategy;
