
import SellingCurrency from "./SellingCurrency";
import SellingUserCurrency from "./SellingUserCurrency";
import SellingBots from "./SellingBots";
import BuyBots from "./BuyBots";
import BuyCurrency from "./BuyCurrency";
import BuyUserCurrency from "./BuyUserCurrency";
import { Link } from "react-router-dom";

export default function BoxChartHome() {
  let chartItem = [
    { id: 1, name: "فروش api", price: 1000000, chart: <SellingCurrency /> , link :"/home/chart_sell_api" },
    { id: 2, name: "فروش  کاربر", price: 1000000, chart: <SellingUserCurrency /> , link :"/home/chart_sell_user" },
    { id: 3, name: "فروش  بات ترید", price: 1300000, chart: <SellingBots /> , link :"/home/chart_sell_bots" },
    { id: 4, name: "خرید  بات ترید", price: 1500000, chart: <BuyUserCurrency /> , link :"/home/chart_buy_bots"},
    { id: 5, name: "خرید  کاربر", price: 1060000, chart: <BuyCurrency /> , link :"/home/chart_buy_user"},
    { id: 6, name: "خرید api ", price: 1007000, chart: <BuyBots />, link :"/home/chart_buy_api" },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-6">
      {chartItem?.map((item) => (
        <div key={item.id} className="group">
          <div
            className="w-[300px] h-[200px] bg-[#3abef9] rounded-xl shadow-lg p-4 flex flex-col items-center transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl"
          >
            <div className="flex-1 w-full">{item.chart}</div>
          </div>
          <Link to={`${item.link}?chartType=${item.name}`}>
            <h3 className="mt-3 text-lg font-bold text-gray-800 text-center group-hover:text-indigo-500 transition-colors duration-300">
                {item.name}
              </h3>
         </Link>
          <p className="text-gray-600 text-sm mt-1 text-center group-hover:text-gray-800 transition-colors duration-300">
            مجموع: {item.price.toLocaleString()} تومان
          </p>
        </div>
      ))}
    </div>
  );
}

