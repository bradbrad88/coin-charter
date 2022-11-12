import { useState, useEffect } from "react";
import { QUERY_ALL_CHARTS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface ChartsDataTypes {
  _id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  chartTitle: string;
  chartDescription: string;
  username: string;
  userId: string;
  imageThumbnail: string;
  imageMedium: string;
  imageSmall: string;
  upVotes: number;
  downVotes: number;
  createdAt: number;
}

const TopRated = () => {
  const nav = useNavigate();
  const [topRated, setTopRated] = useState<any>();
  const { loading, error, data } = useQuery(QUERY_ALL_CHARTS);

  useEffect(() => {
    const info = data?.charts;
    if (info) {
      topRatedChart(info);
    }
  }, [data]);

  const topRatedChart = (info: ChartsDataTypes[]) => {
    const mostUpvotedChart = info.reduce(function (prev: any, current: any) {
      return prev.upVotes > current.upVotes ? prev : current;
    });
    setTopRated(mostUpvotedChart);
  };

  if (!topRated) {
    return <div>Loading...</div>;
  }

  const selectUser = () => {
    nav(`/profile/${topRated.userId}`);
  };

  const selectChart = () => {
    nav(`/chart/${topRated._id}`);
  };

  const selectCoin = () => {
    nav(`/coin/${topRated.coinId}`);
  };

  return (
    <div className="flex w-4/6 h-full">
      <div className="border-r pr-4 flex flex-col w-full h-full">
        <h1 className="text-lg font-bold">Top Rated Charts</h1>
        <div className="flex flex-col h-full">
          <h1
            className="text-lg font-bold hover:cursor-pointer"
            onClick={selectCoin}
          >
            {topRated.coinName}
          </h1>
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-md text-indigo-600">
              {topRated.chartTitle}
            </h1>
            <p
              className="italic font-bold text-sm text-slate-500 hover:cursor-pointer"
              onClick={selectUser}
            >
              By {topRated.username}
            </p>
            <div className="flex flex-col">
              <i className="fa-regular fa-thumbs-up text-[14px]"></i>
              <p className="text-[8px]">{topRated.upVotes}</p>
            </div>
            <div className="flex flex-col">
              <i className="fa-regular fa-thumbs-down text-[14px]"></i>
              <p className="text-[8px]">{topRated.downVotes}</p>
            </div>
          </div>
          <p>{topRated.chartDescription}</p>
          <img
            src={topRated.imageMedium}
            className="h-[95%] w-full xl:w-[95%] mt-2 hover:brightness-50 hover:cursor-pointer"
            onClick={selectChart}
          />
        </div>
      </div>
    </div>
  );
};

export default TopRated;
