import MainChart from "src/components/features/coinChart/MainChart";
import RelatedCharts from "src/components/features/coinChart/RelatedCharts";

const ChartCoin = () => {
  return (
    <div>
      <div className="flex rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[1480px] h-[600px]">
        <MainChart />
      </div>
      <div className="flex rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[1480px] h-[600px]">
        <RelatedCharts />
      </div>
    </div>
  );
};

export default ChartCoin;
