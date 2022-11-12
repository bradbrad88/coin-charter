import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MainChart = ({ chartInfo }: any) => {
  const nav = useNavigate();
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    if (chartInfo) {
      setChartData(chartInfo);
    }
  }, [chartData, chartInfo]);

  const selectUser = () => {
    nav(`/profile/${chartData.userId}`);
  };

  const selectCoin = () => {
    nav(`/coin/${chartData.coinId}`);
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="md:h-[600px] w-full md:w-4/6 flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">
              Chart for:{" "}
              <span
                className="text-indigo-600 hover:cursor-pointer"
                onClick={selectCoin}
              >
                {chartData.coinName}
              </span>
            </h1>
            <h1 className="text-lg font-bold">
              Created by:{" "}
              <span
                className="text-indigo-600 hover:cursor-pointer"
                onClick={selectUser}
              >
                {chartData.username}
              </span>
            </h1>
            <h1 className="text-sm text-gray-500">
              Posted: {chartData.createdAt}
            </h1>
            <div className="flex gap-5 pl-2">
              <h1>
                <i className="fa-regular fa-thumbs-up"></i> {chartData.upVotes}
              </h1>
              <h1>
                <i className="fa-regular fa-thumbs-down"></i>{" "}
                {chartData.downVotes}
              </h1>
            </div>
          </div>
          <p className="text-lg font-bold text-indigo-600">
            {chartData.chartTitle}
          </p>
          <p className="text-sm max-h-16 overflow-y-scroll">
            {chartData.chartDescription}
          </p>
        </div>

        <img className=" h-3/6 md:h-4/6" src={chartData.imageThumbnail} />
      </div>
    </>
  );
};

export default MainChart;
