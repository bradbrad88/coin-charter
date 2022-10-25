import { useCallback, useEffect, useState } from "react";
import useFetch, { Config } from "hooks/useFetch";
import { Sparklines, SparklinesLine } from "react-sparklines";
import Table, { HeaderObject } from "common/Table";
import Favourite from "src/components/common/Favourite";
import { formatCurrency, formatPercentage } from "src/utils/strings";
import NumberHighlight from "common/NumberHighlight";

interface CoinMarketType {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string;
  roi: { times: number; currency: string; percentage: number } | null;
  last_updated: string;
  sparkline_in_7d?: { price: number[] };
}

const CoinList = () => {
  const [data, setData] = useState<CoinMarketType[]>([]);
  const { fetchJSON, working } = useFetch();

  const getData = useCallback(async () => {
    const req: Config = {
      url: "https://api.coingecko.com/api/v3/coins/markets",
      params: {
        vs_currency: "aud",
        order: "market_cap_desc",
        per_page: "20",
        page: "3",
        sparkline: true,
      },
    };
    const data = await fetchJSON<CoinMarketType[]>(req);
    if (!data) return setData([]);
    setData(data);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const urlGetter = (item: CoinMarketType) => {
    return item.id;
  };

  const headers: HeaderObject<CoinMarketType>[] = [
    {
      title: "Fav",
      processor() {
        return <Favourite />;
      },
    },
    {
      title: "Name",
      processor(item) {
        return `${item.symbol.toUpperCase()}-${item.name}`;
      },
    },
    {
      title: "Price",
      processor(item) {
        return formatCurrency(item.current_price || 0);
      },
      alignRight: true,
    },
    {
      title: "Market Cap",
      processor(item) {
        return formatCurrency(item.market_cap || 0);
      },
      alignRight: true,
    },
    {
      title: "Circulating Supply",
      processor(item) {
        return formatCurrency(item.circulating_supply || 0);
      },
      alignRight: true,
    },
    {
      title: "7d Sparkline",
      processor(item) {
        return (
          <Sparklines data={item.sparkline_in_7d?.price || []}>
            <SparklinesLine color="green" style={{ fill: "none" }} />
          </Sparklines>
        );
      },
    },
    {
      title: "24hr",
      processor(item) {
        return (
          <NumberHighlight
            value={item.price_change_percentage_24h || 0}
            formatter={formatPercentage}
          />
        );
      },
      alignRight: true,
    },
  ];

  if (!data) return null;
  return (
    <Table
      data={data}
      headers={headers}
      urlGetter={urlGetter}
      working={working}
    />
  );
};

export default CoinList;
