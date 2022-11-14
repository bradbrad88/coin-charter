import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_COIN_CHART } from "src/graphql/queries";

interface CoinId {
  coinId: string;
}

const TopCharts = ({ coinId }: CoinId) => {
  const { data } = useQuery(QUERY_COIN_CHART, {
    variables: { coinId },
  });
  const [topRatedChart, setTopRatedChart] = useState<Chart | null>(null);

  useEffect(() => {
    const coinData = data?.coin?.coinCharts;
    if (coinData) {
      topRated(coinData);
    }
  }, [data]);

  const topRated = (coinData: Chart[]) => {
    const mostUpvotedChart = coinData.reduce<Chart | null>(
      (topChart, currentChart) => {
        if (!topChart) return currentChart;
        return currentChart.upVotes > topChart.upVotes
          ? topChart
          : currentChart;
      },
      null,
    );
    setTopRatedChart(mostUpvotedChart);
  };

  return (
    <div className="flex w-4/6 h-full">
      <div className="border-r pr-4 flex flex-col w-full h-full">
        <h1 className="text-lg font-bold">Top Rated Chart</h1>
        {!topRatedChart ? (
          <div className="h-full">
            No charts have been made yet. Submit one above to be the first!
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex gap-3 items-center">
              <h1 className="font-bold text-md text-indigo-600">
                <p>{topRatedChart.chartTitle}</p>
              </h1>
              <p className="italic font-bold text-sm text-slate-500">
                By{" "}
                <Link to={`/profile/${topRatedChart.userId}`}>
                  <span className="hover:cursor-pointer">
                    {topRatedChart.username}
                  </span>
                </Link>
              </p>
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                <p className="text-[8px]">{topRatedChart.upVotes.length}</p>
              </div>
              <div className="flex flex-col">
                <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                <p className="text-[8px]">{topRatedChart.downVotes.length}</p>
              </div>
            </div>
            <p>{topRatedChart.chartDescription}</p>
            <Link to={`/chart/${topRatedChart._id}`}>
              <img
                src={topRatedChart.imageThumbnail}
                className="h-[400px] w-full mt-2 hover:brightness-50 hover:cursor-pointer"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCharts;
