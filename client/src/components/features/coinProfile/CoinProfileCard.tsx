import { useMutation } from "@apollo/client";
import { CoinType } from "pages/CoinProfile";
import sanitizeHtml from "sanitize-html";
import Button from "src/components/common/Button";
import Container from "src/components/common/Container";
import { ADD_COIN } from "src/graphql/queries";

interface PropTypes {
  coin: CoinType;
}

const CoinProfileCard = ({ coin }: PropTypes) => {
  const [addCoin] = useMutation(ADD_COIN);

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

  const addFavorite = () => {
    const variables = {
      coinId: coin.id,
      coinName: coin.name,
      symbol: coin.symbol,
      image: coin.image.small,
    };

    addCoin({
      variables,
    });
  };

  const priceDifference = (timeframe: string, data: number) => {
    const greenOrRed = data > 0 ? "green" : "red";

    if (timeframe === "24h") {
      return (
        <small className={`text-${greenOrRed}-500`}>
          24h: {data.toFixed(2)}%{" "}
        </small>
      );
    } else {
      return (
        <li className="flex justify-between" key={timeframe}>
          {timeframe} price change:{" "}
          <span className={`text-${greenOrRed}-500`}>{data.toFixed(2)}% </span>
        </li>
      );
    }
  };

  const descriptionClean = sanitizeHtml(coin.description.en, {
    allowedTags: [],
    allowedAttributes: {},
  });

  return (
    <Container>
      <div className="flex gap-5 p-5 w-full flex-col md:flex-row">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div className="flex">
              <div className="w-[40px] aspect-square">
                <img
                  className="w-full h-full object-contain"
                  src={`${coin.image.small}`}
                />
              </div>
              <small>#{coin.market_cap_rank}</small>
            </div>

            <h1 className="text-md md:text-4xl font-bold">
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
            {priceDifference(
              "24h",
              coin.market_data.price_change_percentage_24h,
            )}
          </div>

          <div className="flex flex-col">
            <ul className="flex flex-col gap-1 border-b">
              {dataTimeFrame.map((info) =>
                priceDifference(info.timeframe, info.data),
              )}
              <li className="flex justify-between">
                Current MarketCap:{" "}
                <span>${coin.market_data.market_cap.usd}</span>
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
            <div className="flex flex-row justify-between">
              <Button onClick={addFavorite}>Add To Favourites</Button>
              <p className="text-slate-500">9000 people have liked this</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold">Description</h3>
          <div className="max-h-[300px] overflow-y-scroll">
            <p className="h-full max-w-[500px] text-clip">{descriptionClean}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoinProfileCard;
