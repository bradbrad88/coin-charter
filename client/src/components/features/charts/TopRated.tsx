import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_ALL_CHARTS } from "src/graphql/queries";

const TopRated = () => {
  const [topRated, setTopRated] = useState<any>();
  const { data } = useQuery(QUERY_ALL_CHARTS);

  useEffect(() => {
    const info = data?.charts;
    if (info) {
      topRatedChart(info);
    }
  }, [data]);

  const topRatedChart = (info: Chart[]) => {
    const mostUpvotedChart = info.reduce(function (prev: any, current: any) {
      return prev.upVotes > current.upVotes ? prev : current;
    });
    setTopRated(mostUpvotedChart);
  };

  if (!topRated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-4/6 h-full">
      <div className="border-r pr-4 flex flex-col w-full h-full">
        <h1 className="text-lg font-bold">Top Rated Charts</h1>
        <div className="flex flex-col h-full">
          <Link to={`/coin/${topRated.coinId}`}>
            <h1 className="text-lg font-bold hover:cursor-pointer">
              {topRated.coinName}
            </h1>
          </Link>
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-md text-indigo-600">
              {topRated.chartTitle}
            </h1>
            <Link to={`/profile/${topRated.userId}`}>
              <p className="italic font-bold text-sm text-slate-500 hover:cursor-pointer">
                By {topRated.username}
              </p>
            </Link>
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
          <Link to={`/chart/${topRated._id}`}>
            <img
              src={topRated.imageMedium}
              className="h-[95%] w-full xl:w-[95%] mt-2 hover:brightness-50 hover:cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
