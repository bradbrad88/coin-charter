import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { GET_FAV_COINS, REMOVE_COIN } from "src/graphql/queries";
import useFetch, { Config } from "src/hooks/useFetch";
import { formatCurrency } from "src/utils/strings";

interface ApiResponse {
  symbol?: string;
  name?: string;
  image?: {
    thumb: string;
    small: string;
    large: string;
  };
  market_cap_rank?: number;
  market_data?: {
    current_price: {
      aud: number;
    };
    market_cap?: {
      aud: number;
    };
    total_volume?: {
      aud: number;
    };
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_14d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_60d?: number;
    price_change_percentage_200d?: number;
    price_change_percentage_1y?: number;
    market_cap_change_24h?: number;
    market_cap_change_percentage_24h?: number;
  };
}

interface Query {
  favCoins: FavCoin[];
}

const Coins = () => {
  const { data } = useQuery<Query>(GET_FAV_COINS);
  const favCoins = data?.favCoins || [];

  const renderCoins = () =>
    favCoins.map((favCoin) => (
      <Coin key={favCoin.coin._id} coin={favCoin.coin} />
    ));

  return (
    <ul className="flex flex-col gap-2 overflow-x-visible">{renderCoins()}</ul>
  );
};

export default Coins;

interface Coin {
  coinId: string;
  coinName: string;
  symbol: string;
  image: string;
}

const Coin = ({ coin }: { coin: Coin }) => {
  const [removeCoin] = useMutation(REMOVE_COIN, {
    refetchQueries: [{ query: GET_FAV_COINS }],
  });
  const [data, setData] = useState<ApiResponse>({});
  const { fetchJSON } = useFetch();

  useEffect(() => {
    const getCoinData = async () => {
      const params = new URLSearchParams();
      params.append("tickers", "false");
      const req: Config = {
        url: `https://api.coingecko.com/api/v3/coins/${coin.coinId}?${params}`,
      };
      const res = (await fetchJSON<ApiResponse>(req)) || {};
      setData(res);
    };
    getCoinData();
  }, []);

  const handleRemove: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    removeCoin({ variables: { coinId: coin.coinId } });
  };

  return (
    <li className="bg-white rounded-sm hover:bg-indigo-200 hover:translate-x-[2px] transition-all duration-200">
      <Link to={`/coin/${coin.coinId}`}>
        <div className="flex gap-3 p-2">
          <div className="w-8 h-8">
            <img className="block" src={coin.image} alt="" />
          </div>
          <div className="flex flex-col">
            <h2 className="leading-none text-primary">{coin.coinName}</h2>
            <h2 className="">{coin.symbol?.toUpperCase()}</h2>
          </div>
          <div className="flex flex-col">
            <div>
              <p className="text-primary leading-none">Market Cap</p>
            </div>
            <div>
              <p className="">
                {formatCurrency(data.market_data?.market_cap?.aud || 0)}
              </p>
            </div>
          </div>
          <div className="flex justify-center ml-auto">
            <button className="" onClick={handleRemove}>
              <AiOutlineCloseCircle
                size={24}
                className="fill-orange-500 hover:fill-orange-600 transition-all"
              />
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
};
