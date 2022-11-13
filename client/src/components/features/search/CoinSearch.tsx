import { useEffect, useRef, useState } from "react";
import useFetch from "hooks/useFetch";
import CoinSearchItem from "./CoinSearchItem";

interface Proptypes {
  query: string;
  onCoinSelect: () => void;
}

export interface CoinApi {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

const CoinSearch = ({ query, onCoinSelect }: Proptypes) => {
  const [coins, setCoins] = useState<CoinApi[]>([]);
  const { fetchJSON, working } = useFetch();

  useEffect(() => {
    const getCoins = async () => {
      if (!query) return setCoins([]);
      const params = new URLSearchParams();
      params.append("query", query);
      const req: Config = {
        url: `https://api.coingecko.com/api/v3/search?${params.toString()}`,
      };
      const coins = await fetchJSON<{ coins: CoinApi[] }>(req);
      if (!coins) return setCoins([]);
      setCoins(coins.coins);
    };
    getCoins();
  }, [query]);

  const renderCoins = () => {
    if (working) return <li>Loading...</li>;
    const noResults = <li>No results</li>;
    if (!coins.length) return noResults;
    return coins.map((coin) => (
      <CoinSearchItem coin={coin} key={coin.id} onCoinSelect={onCoinSelect} />
    ));
  };

  return (
    <>
      <h2 className="bg-indigo-100 font-bold p-1">Coins</h2>
      <ul>{renderCoins()}</ul>
    </>
  );
};

export default CoinSearch;
