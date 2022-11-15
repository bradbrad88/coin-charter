import { QUERY_ALL_COIN_CHARTS } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import ChartListItem from "../charts/ChartListItem";
import SideScrollReel from "src/components/common/SideScrollReel";

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

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex gap-2">
        {/* will need to add in the state for the filter choice */}
        <h1 className="text-xl font-semibold text-gray-500 mb-2">
          {filter} Charts
        </h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {!coinCharts ? (
        <div className="w-full">No charts have been made yet.</div>
      ) : (
        <SideScrollReel>
          {coinCharts.map((chart: Chart) => (
            <ChartListItem key={chart._id} chart={chart} width={300} />
          ))}
        </SideScrollReel>
      )}
    </div>
  );
};

export default OtherCharts;
