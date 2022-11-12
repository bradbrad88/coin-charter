import useUserContext from "contexts/UserContext";
import { useEffect, useState } from "react";
import useFetch, { Config } from "src/hooks/useFetch";
import { formatCurrency, formatPercentage } from "src/utils/strings";

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

const Coins = () => {
  const { user } = useUserContext();

  const renderCoins = () =>
    user!.favCoins.map((favCoin) => (
      <Coin key={favCoin.coin.coinId} coin={favCoin.coin} />
    ));

  return (
    <div className="flex flex-col gap-2 rounded-md h-full overflow-auto max-h-[520px]">
      {user && renderCoins()}
    </div>
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
  const { removeCoin } = useUserContext();
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

  const handleRemove = () => {
    removeCoin(coin.coinId);
  };

  return (
    <div className="flex bg-white p-2 gap-3">
      <div className="w-8 h-8">
        <img className="block" src={coin.image} alt="" />
      </div>
      <div className="flex flex-col">
        <h2 className="leading-none text-primary">{coin.coinName}</h2>
        <h2 className="">{coin.symbol.toUpperCase()}</h2>
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
      <div className="ml-auto">
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};
