import TopCharts from "./TopCharts";
import OtherCharts from "./OtherCharts";

const CoinCharts = () => {
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[95%] lg:w-[1050px] lg:h-[600px]">
      <div className="flex gap-3">
        <h1 className="text-xl font-bold">Charts</h1>
        <i className="fa-solid fa-chart-line text-lg"></i>
      </div>
      <div className="flex">
        <TopCharts />
        <OtherCharts />
      </div>
    </div>
  );
};

export default CoinCharts;
