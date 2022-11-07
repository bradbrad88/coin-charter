import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const Chart = () => {
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 pb-7 m-5 w-[95%] lg:w-[97%] lg:h-[600px]">
      <AdvancedRealTimeChart
        theme="dark"
        autosize
        symbol="LINKUSDT"
      ></AdvancedRealTimeChart>
    </div>
  );
};

export default Chart;
