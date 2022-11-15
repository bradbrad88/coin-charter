import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_COIN_CHART } from "src/graphql/queries";
import ChartListItem from "../charts/ChartListItem";

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
    <div className="flex flex-col w-full h-full">
      <h1 className="text-lg font-bold">Top Rated Chart</h1>
      {!topRatedChart ? (
        <div className="h-full">
          No charts have been made yet. Submit one above to be the first!
        </div>
      ) : (
        <ChartListItem key={topRatedChart._id} chart={topRatedChart} />
      )}
    </div>
  );
};

export default TopCharts;
