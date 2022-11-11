import { QUERY_COIN_CHART } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopRated from "../charts/TopRated";

interface CoinId {
  coinId: string;
}

interface CoinData {
  reduce(arg0: (prev: any, current: any) => any): unknown;
  _id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  chartTitle?: string;
  chartDescription?: string;
  username?: string;
  imageThumbnail?: string;
  imageMedium: string;
  imageSmall: string;
  chartComments: string;
  upVotes?: number;
  downVotes?: number;
}

const TopCharts = ({ coinId }: CoinId) => {
  const nav = useNavigate();
  const chartId = coinId;
  const { loading, error, data } = useQuery(QUERY_COIN_CHART, {
    variables: { coinId },
  });
  const [topRatedChart, setTopRatedChart] = useState<any>();

  useEffect(() => {
    let coinData = data?.coin?.coinCharts;
    if (coinData) {
      topRated(coinData);
    }
  }, [data]);

  const topRated = (coinData: CoinData) => {
    const mostUpvotedChart = coinData.reduce(function (
      prev: any,
      current: any,
    ) {
      return prev.upVotes > current.upVotes ? prev : current;
    });
    setTopRatedChart(mostUpvotedChart);
  };

  const selectUser = () => {
    nav(`/profile/${topRatedChart.userId}`);
  };

  const selectChart = () => {
    nav(`/chart/${topRatedChart._id}`);
  };

  if (!topRatedChart) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-4/6 h-full">
      <div className="border-r pr-4 flex flex-col w-full h-full">
        <h1 className="text-lg font-bold">Top Rated Chart</h1>
        {/* HAVE THIS PART DYNAMIC COMPONENT FROM DATABASE*/}
        <div className="flex flex-col h-full">
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-md text-indigo-600">
              <p>{topRatedChart.chartTitle}</p>
            </h1>
            <p className="italic font-bold text-sm text-slate-500">
              By{" "}
              <span className="hover:cursor-pointer" onClick={selectUser}>
                {topRatedChart.username}
              </span>
            </p>
            <div className="flex flex-col">
              <i className="fa-regular fa-thumbs-up text-[14px]"></i>
              <p className="text-[8px]">{topRatedChart.upVotes}</p>
            </div>
            <div className="flex flex-col">
              <i className="fa-regular fa-thumbs-down text-[14px]"></i>
              <p className="text-[8px]">{topRatedChart.downVotes}</p>
            </div>
          </div>
          <p>{topRatedChart.chartDescription}</p>
          <img
            src={topRatedChart.imageThumbnail}
            className="h-[400px] w-full mt-2 hover:brightness-50 hover:cursor-pointer"
            onClick={selectChart}
          />
        </div>
      </div>
    </div>
  );
};

export default TopCharts;
