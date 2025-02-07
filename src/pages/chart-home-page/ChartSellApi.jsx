import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SellingCurrency from "../../components/SellingCurrency";
import SellingUserCurrency from "../../components/SellingUserCurrency";
import SellingBots from "../../components/SellingBots";
import BuyBots from "../../components/BuyBots";
import BuyCurrency from "../../components/BuyCurrency";
import BuyUserCurrency from "../../components/BuyUserCurrency";

export default function ChartSellApi() {
  const location = useLocation();
  const [chartKey, setChartKey] = useState("");

  useEffect(() => {
    const parts = location.pathname.split("/");
    if (parts.length > 2) {
      setChartKey(parts[2]); 
    }
  }, [location.pathname]);


  const chartTitles = {
    chart_sell_api: "فروش API",
    chart_sell_user: "فروش کاربر",
    chart_sell_bots: "فروش بات",
    chart_buy_bots: "خرید API",
    chart_buy_user: "خرید کاربر",
    chart_buy_api: "خرید بات ترید",
  };

 
  const chartComponents = {
    chart_sell_api: SellingCurrency,
    chart_sell_user: SellingUserCurrency,
    chart_sell_bots: SellingBots,
    chart_buy_bots: BuyUserCurrency,
    chart_buy_user: BuyCurrency,
    chart_buy_api: BuyBots,
  };

  const ChartComponent = chartComponents[chartKey] || null;

  return (
    <div>
      <h1 className="text-center mt-6 font-bold text-lg">
        نمودار {chartTitles[chartKey] || "نامشخص"}
      </h1>

      <div className="mt-4">
        {ChartComponent ? <ChartComponent /> : "چارتی یافت نشد"}
      </div>
    </div>
  );
}
