import TopCharts from "./TopCharts";
import OtherCharts from "./OtherCharts";
import { CoinType } from "src/pages/CoinProfile";

interface PropTypes {
  coin: CoinType;
}

const CoinCharts = ({ coin }: PropTypes) => {
  const coinId = coin.id;
  return (
    <div className="flex flex-col rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[95%] lg:w-[97%] lg:h-[600px]">
      <div className="flex gap-3">
        <h1 className="text-xl font-bold">Charts</h1>
        <i className="fa-solid fa-chart-line text-lg"></i>
      </div>
      <div className="flex">
        <TopCharts coinId={coinId} />
        <OtherCharts coinId={coinId} />
      </div>
    </div>
  );
};

export default CoinCharts;
