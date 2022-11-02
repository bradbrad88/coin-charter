import { CoinType } from "pages/CoinProfile";

interface PropTypes {
  coin: CoinType;
}

const CoinProfileCard = ({ coin }: PropTypes) => {
  const dataTimeFrame = [
    {
      timeframe: "1h",
      data: coin.market_data.price_change_percentage_1h_in_currency.usd,
    },
    {
      timeframe: "1w",
      data: coin.market_data.price_change_percentage_7d,
    },
    {
      timeframe: "1m",
      data: coin.market_data.price_change_percentage_30d,
    },
    {
      timeframe: "1y",
      data: coin.market_data.price_change_percentage_1y,
    },
  ];

  const priceDifference = (timeframe: string, data: number) => {
    const greenOrRed = data > 0 ? "green" : "red";
    const upOrDown = data > 0 ? "up" : "down";

    if (timeframe === "24h") {
      return (
        <small className={`text-${greenOrRed}-500`}>
          24h: {data.toFixed(2)}%{" "}
          <i
            className={`fa-sharp fa-solid fa-arrow-${upOrDown} text-${greenOrRed}-500`}
          ></i>
        </small>
      );
    } else {
      return (
        <li className="flex justify-between" key={timeframe}>
          {timeframe} price change:{" "}
          <span className={`text-${greenOrRed}-500`}>
            {data.toFixed(2)}%{" "}
            <i
              className={`fa-sharp fa-solid fa-arrow-${upOrDown} text-${greenOrRed}-500`}
            ></i>
          </span>
        </li>
      );
    }
  };

  console.log(coin);
  return (
    <div className="flex rounded-sm gap-5 shadow-lg shadow-gray-400 p-5 m-5 w-[1050px] h-[400px]">
      <div className="flex flex-col ">
        <div className="flex items-start justify-start gap-3">
          <div className="flex flex-col justify-end items-center">
            <img className="w-[40px]" src={`${coin.image.small}`} />
            <small>#{coin.market_cap_rank}</small>
          </div>

          <h1 className="text-4xl font-bold">
            {coin.name} ({coin.symbol.toUpperCase()})
          </h1>

          <h2
            className={`text-lg font-bold ${
              coin.market_data.price_change_24h > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            USD ${coin.market_data.current_price.usd}
          </h2>
          {priceDifference("24h", coin.market_data.price_change_percentage_24h)}
        </div>

        <div className="flex flex-col gap-5">
          <ul className="flex flex-col gap-1 border-b pt-2 pb-5 w-[500px]">
            {dataTimeFrame.map((info) =>
              priceDifference(info.timeframe, info.data),
            )}
            <li className="flex justify-between">
              Current MarketCap: <span>${coin.market_data.market_cap.usd}</span>
            </li>
            <li className="flex justify-between">
              24h Trading Volume:{" "}
              <span>${coin.market_data.total_volume.usd}</span>
            </li>
            <li className="flex justify-between">
              Circulating Supply:{" "}
              <span>{coin.market_data.circulating_supply}</span>
            </li>
          </ul>
          <div className="flex gap-5 items-center">
            <button className="border rounded-sm w-40 p-2 bg-opacity-80 bg-indigo-600 hover:bg-opacity-100 text-white transition-all duration-75">
              Add To Favourites
            </button>
            <p className="text-slate-500">9000 people have liked this</p>
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="font-bold">Description</h3>
        <p className="overflow-y-scroll h-[340px] w-auto">
          {coin.description.en}
        </p>
      </div>
    </div>
  );
};

export default CoinProfileCard;
