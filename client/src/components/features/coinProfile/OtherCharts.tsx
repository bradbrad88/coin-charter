import { QUERY_ALL_COIN_CHARTS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CoinId {
  coinId: string;
}

interface CoinDataTypes {
  _id: string;
  chartTitle: string;
  downVotes: number;
  upVotes: number;
  username: string;
  userId: string;
  imageSmall: string;
  createdAt: number;
  coinId: string;
  coinName: string;
}

const OtherCharts = ({ coinId }: CoinId) => {
  const filterOptions = ["Most Recent", "Oldest", "Top Rated", "Least Rated"];
  const [coinCharts, setCoinCharts] = useState<any>();
  const [filter, setFilter] = useState<string>("Most Recent");
  const { data } = useQuery(QUERY_ALL_COIN_CHARTS, {
    variables: { coinId },
  });

  useEffect(() => {
    let chartData = data?.coin?.coinCharts;
    if (chartData) {
      checkFilter([...chartData]);
    }
  }, [filter, data]);

  let checkFilter = (chartData: CoinDataTypes[]) => {
    if (filter === "Most Recent") {
      let recent = chartData
        .slice(0)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      setCoinCharts(recent);
    } else if (filter === "Oldest") {
      let oldest = chartData
        .slice(0)
        .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
      setCoinCharts(oldest);
    } else if (filter === "Top Rated") {
      let topRated = chartData
        .slice(0)
        .sort((a, b) => (a.upVotes > b.upVotes ? -1 : 1));
      setCoinCharts(topRated);
    } else if (filter === "Least Rated") {
      let leastRated = chartData
        .slice(0)
        .sort((a, b) => (a.upVotes < b.upVotes ? -1 : 1));
      setCoinCharts(leastRated);
    }
  };

  if (!coinCharts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-2/6 h-full pl-2">
      <div className="flex gap-2">
        {/* will need to add in the state for the filter choice */}
        <h1 className="text-lg font-bold">{filter} Charts</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <ul className="flex flex-col gap-1 h-[510px] w-full overflow-y-scroll">
        {coinCharts.map((info: any, index: number) => (
          <li
            key={info.chartTitle + index}
            className="flex flex-col group transition-all hover:bg-indigo-100 hover:rounded-lg hover:border-2 hover:border-indigo-100 hover:cursor-pointer p-2"
          >
            <Link to={`/chart/${info._id}`}>
              <div className="flex justify-between">
                <div className="flex flex-col w-5/6 h-[40px]">
                  <h1 className="truncate font-bold text-md text-indigo-600">
                    {info.chartTitle}
                  </h1>
                  <div className="flex justify-between">
                    <p className="italic font-bold text-xs text-slate-500">
                      By {info.username}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Posted Ontoday: {info.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                  <p className="text-[8px]">{info.upVotes}</p>
                </div>
                <div className="flex flex-col justify-center">
                  <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                  <p className="text-[8px]">{info.downVotes}</p>
                </div>
              </div>
              <img
                src={info.imageSmall}
                className="w-full h-[120px] group-hover:brightness-75"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OtherCharts;
