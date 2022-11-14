import Container from "src/components/common/Container";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_COIN_CHARTS } from "src/graphql/queries";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";

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

const ChartsOfCoins = () => {
  const nav = useNavigate();
  const coinOption = ["Most Recent", "Oldest", "Top Rated", "Least Rated"];
  const [searchInput, setSearchInput] = useState<string>("");
  const [search, setSearch] = useState<string>("bitcoin");
  const [filter, setFilter] = useState<string>("Most Recent");
  const [chartList, setChartList] = useState<any>([]);
  const { loading, error, data } = useQuery(QUERY_ALL_COIN_CHARTS, {
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

  let checkFilter = (chartData: CoinDataTypes[]) => {
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

  console.log(chartList);

  const selectChart = (chartInfo: any) => {
    nav(`/chart/${chartInfo._id}`);
  };

  if (!chartList) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="flex flex-col h-[880px]">
        <form className="p-5 sticky top-0 bg-white border-b border-t lg:static">
          <h1 className="font-bold text-center ">
            View Charts For:{" "}
            <span className="italic font-semibold capitalize">{search}</span>
          </h1>
          <div className="flex justify-center gap-5 p-5">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Coin"
              className="border-black-50 border-2 rounded-full p-1 text-center"
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
            {chartList.map((info: any, index: number) => (
              <li
                className=" hover:bg-indigo-100 hover:border-indigo-100 hover:cursor-pointer flex flex-col p-2"
                key={info.username + index}
                onClick={() => selectChart(info)}
              >
                <div className="flex justify-between">
                  <div className="flex flex-col w-5/6 h-[50px] gap-1">
                    <h1 className="truncate font-bold text-md text-indigo-600">
                      {info.chartTitle}
                    </h1>
                    <div className="flex justify-between">
                      <p className="truncate italic font-bold text-xs text-slate-500 w-[110px]">
                        By {info.username}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Posted On: {info.createdAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <IoIosArrowRoundUp className="text-green-500" />
                    <p className="text-[8px]">{info.upVotes.length}</p>
                  </div>
                  <div className="flex flex-col">
                    <IoIosArrowRoundDown className="text-red-500" />
                    <p className="text-[8px]">{info.downVotes.length}</p>
                  </div>
                </div>
                <img
                  src={info.imageSmall}
                  className="w-full h-[120px] rounded-sm"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default ChartsOfCoins;
