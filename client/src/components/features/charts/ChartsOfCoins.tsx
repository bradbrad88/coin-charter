import Container from "src/components/common/Container";
import { IoIosArrowRoundUp } from "react-icons/Io";
import { IoIosArrowRoundDown } from "react-icons/Io";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_COIN_CHARTS } from "../../../graphql/queries";
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

const coinOption = ["Top Rated", "Most Recent", "Oldest", "Least Rated"];
const data = [
  {
    title: "This is what i see happening this month",
    name: "Ben Smerd",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "We are going UP!",
    name: "Brad Teague",
    upVotes: 3203,
    downVotes: 2,
    createdAt: "21/03/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "Going DOWN!",
    name: "Sam March",
    upVotes: 1022,
    downVotes: 1223,
    createdAt: "24/12/2020",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This i think will happen very soon in this market",
    name: "Sally Peterson",
    upVotes: 1230,
    downVotes: 122,
    createdAt: "04/05/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This is what i see happening this month",
    name: "Ben Smerdsssssssss",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
];

const coinOption = ["Top Rated", "Most Recent", "Oldest", "Least Rated"];
const data = [
  {
    title: "This is what i see happening this month",
    name: "Ben Smerd",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "We are going UP!",
    name: "Brad Teague",
    upVotes: 3203,
    downVotes: 2,
    createdAt: "21/03/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "Going DOWN!",
    name: "Sam March",
    upVotes: 1022,
    downVotes: 1223,
    createdAt: "24/12/2020",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This i think will happen very soon in this market",
    name: "Sally Peterson",
    upVotes: 1230,
    downVotes: 122,
    createdAt: "04/05/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
  {
    title: "This is what i see happening this month",
    name: "Ben Smerdsssssssss",
    upVotes: 1202,
    downVotes: 12,
    createdAt: "24/12/2022",
    chart: "https://source.unsplash.com/random/?person/",
  },
];

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
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            ></select>
            <select>
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
                    <p className="text-[8px]">{info.upVotes}</p>
                  </div>
                  <div className="flex flex-col">
                    <IoIosArrowRoundDown className="text-red-500" />
                    <p className="text-[8px]">{info.downVotes}</p>
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
