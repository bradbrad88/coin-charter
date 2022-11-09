import { useCallback, useEffect, useState } from "react";
import useFetch, { Config } from "hooks/useFetch";
import { Sparklines, SparklinesLine } from "react-sparklines";
import useUserContext from "contexts/UserContext";
import Table, { HeaderObject } from "common/Table";
import Favourite from "src/components/common/Favourite";
import { formatCurrency, formatPercentage } from "src/utils/strings";
import NumberHighlight from "common/NumberHighlight";
import FieldSorter from "src/components/common/FieldSorter";
import { removeConnectionDirectiveFromDocument } from "@apollo/client/utilities";

export interface CoinMarketType {
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
  price_change_percentage_7d_in_currency: number | null;
}

type CoinMarketOrder =
  | "market_cap_desc"
  | "market_cap_asc"
  | "gecko_desc"
  | "gecko_asc"
  | "volume_desc"
  | "volume_asc"
  | "price_desc"
  | "price_asc"
  | "price_change_percentage_desc"
  | "price_change_percentage_asc";

const DEFAULT_ORDER = "gecko_desc";

const CoinList = () => {
  const { user, addCoin, removeCoin } = useUserContext();
  const [data, setData] = useState<CoinMarketType[]>([]);
  const [order, setOrder] = useState<CoinMarketOrder>(DEFAULT_ORDER);
  const { fetchJSON, working } = useFetch();

  const getData = useCallback(async (order: CoinMarketOrder) => {
    const req: Config = {
      url: "https://api.coingecko.com/api/v3/coins/markets",
      params: {
        vs_currency: "aud",
        order,
        per_page: "20",
        page: "1",
        sparkline: true,
        price_change_percentage: "7d",
      },
    };
    const data = await fetchJSON<CoinMarketType[]>(req);
    if (!data) return setData([]);
    setData(data);
  }, []);

  useEffect(() => {
    getData(order);
  }, [order]);

  const setSortOrder = (value: CoinMarketOrder | null) => {
    if (!value) return setOrder(DEFAULT_ORDER);
    setOrder(value);
  };

  const urlGetter = (item: CoinMarketType) => {
    return `/coin/${item.id}`;
  };

  const headers: HeaderObject<CoinMarketType>[] = [
    {
      title: "",
      processor(item) {
        const onClick = () => {
          if (user?.favCoins.includes(item.id)) {
            removeCoin(item.id);
          } else {
            addCoin(item.id);
          }
        };
        return (
          <Favourite
            fav={user?.favCoins.includes(item.id) || false}
            onClick={onClick}
          />
        );
      },
      width: 20,
      weight: 1,
    },
    {
      title: "",
      processor(item) {
        return (
          <div className="w-[20px]">
            <img className="w-full" src={item.image} />
          </div>
        );
      },

      width: 20,
    },
    {
      title: "Name",
      processor(item) {
        return `${item.symbol.toUpperCase()}-${item.name}`;
      },
      weight: 2.5,
    },
    {
      title: (
        <FieldSorter
          setOrder={setSortOrder}
          current={order}
          asc="price_asc"
          desc="price_desc"
        >
          Price
        </FieldSorter>
      ),
      processor(item) {
        return formatCurrency(item.current_price || 0);
      },
      alignRight: true,
      weight: 2.2,
    },
    {
      title: (
        <FieldSorter
          setOrder={setSortOrder}
          current={order}
          asc="market_cap_asc"
          desc="market_cap_desc"
        >
          Market Cap
        </FieldSorter>
      ),
      processor(item) {
        return formatCurrency(item.market_cap || 0);
      },
      alignRight: true,
      weight: 3.2,
    },
    {
      title: (
        <FieldSorter
          setOrder={setSortOrder}
          current={order}
          asc="volume_asc"
          desc="volume_desc"
        >
          Volume
        </FieldSorter>
      ),
      processor(item) {
        return formatCurrency(item.total_volume || 0);
      },
      alignRight: true,
      weight: 3.2,
    },
    {
      title: "7 Days",
      processor(item) {
        const colour =
          (item.price_change_percentage_7d_in_currency || 0) < 0
            ? "red"
            : "green";
        return (
          <div className="w-28">
            <Sparklines data={item.sparkline_in_7d?.price || []}>
              <SparklinesLine color={colour} style={{ fill: "none" }} />
            </Sparklines>
          </div>
        );
      },
      weight: 2,
    },
    {
      title: "7 Day %",
      processor(item) {
        return (
          <NumberHighlight
            value={item.price_change_percentage_7d_in_currency || 0}
            formatter={formatPercentage}
          />
        );
      },
      alignRight: true,
      weight: 2,
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
