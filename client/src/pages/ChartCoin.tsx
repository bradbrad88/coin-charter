import MainChart from "src/components/features/coinChart/MainChart";
import RelatedCharts from "src/components/features/coinChart/RelatedCharts";

const ChartCoin = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[95%] md:h-[600px]">
        <MainChart />
      </div>
      {/* something for post MVP */}
      {/* <div className="flex rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[95%] h-[600px]">
        <RelatedCharts />
      </div> */}
    </div>
  );
};

export default ChartCoin;
