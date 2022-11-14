import Container from "src/components/common/Container";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_COIN_CHARTS } from "src/graphql/queries";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import ChartListItem from "./ChartListItem";

interface Query {
  coin: Coin;
}

const ChartsOfCoins = () => {
  const nav = useNavigate();
  const coinOption = ["Most Recent", "Oldest", "Top Rated", "Least Rated"];
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("bitcoin");
  const [filter, setFilter] = useState<string>("Most Recent");
  const [chartList, setChartList] = useState<Chart[]>([]);
  const { loading, error, data } = useQuery<Query>(QUERY_ALL_COIN_CHARTS, {
    variables: { coinId: search },
  });

  //TODO need to make a failsafe for when a user enters a coin that is a real coin but it isnt in our database, currently search Ethereum and says it has no charts but search DogeCoin and says thats not a coin

  useEffect(() => {
    let chartData = data?.coin?.coinCharts;
    if (chartData) {
      checkFilter(chartData);
    }
  }, [filter, search, data]);

  const submitSearch = () => {
    const lowerSearch = searchInput.toLowerCase();
    setSearch(lowerSearch);
  };

  let checkFilter = (chartData: Chart[]) => {
    if (filter === "Most Recent") {
      let recent = chartData
        .slice(0)
        .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
      setChartList(recent);
    } else if (filter === "Oldest") {
      let oldest = chartData
        .slice(0)
        .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
      setChartList(oldest);
    } else if (filter === "Top Rated") {
      let topRated = chartData
        .slice(0)
        .sort((a, b) => (a.upVotes > b.upVotes ? -1 : 1));
      setChartList(topRated);
    } else if (filter === "Least Rated") {
      let leastRated = chartData
        .slice(0)
        .sort((a, b) => (a.upVotes < b.upVotes ? -1 : 1));
      setChartList(leastRated);
    }
  };

  const selectChart = (chartInfo: any) => {
    nav(`/chart/${chartInfo._id}`);
  };

  if (!chartList) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="flex flex-col w-full">
        <form className="p-5 sticky top-0 bg-white border-b lg:static">
          <h1 className="font-bold text-center ">
            View Charts For:{" "}
            <span className="italic font-semibold capitalize">{search}</span>
          </h1>
          <div className="flex flex-col justify-center p-5 gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Coin"
              className="border-black-50 border-[1px] rounded-full p-1 text-center"
            />
            <Button onClick={submitSearch}>Search</Button>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {coinOption.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </form>
        {error ? (
          <div>No Coins with that name, try again.</div>
        ) : chartList.length === 0 ? (
          <div>No charts for this coin yet.</div>
        ) : (
          <ul className="flex flex-col gap-1 h-full w-full overflow-y-scroll scrollbar hover:scrollbar-track-slate-200">
            {chartList.map((chart, index: number) => (
              <ChartListItem key={chart._id} chart={chart} imageHeight={120} />
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default ChartsOfCoins;
