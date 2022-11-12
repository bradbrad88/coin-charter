import CoinProfileCard from "../components/features/coinProfile/CoinProfileCard";
import CoinComments from "../components/features/coinProfile/CoinComments";
import CoinCharts from "../components/features/coinProfile/CoinCharts";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Chart from "../components/common/Chart";
import useFetch, { Config } from "../hooks/useFetch";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

export interface CoinType {
  market_data: any;
  id: string;
  symbol: string;
  name: string;
  image: string;
  description: any;
  en: any;
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

const CoinProfile = () => {
  const [coin, setCoin] = useState<CoinType | null>(null);
  const { coinId } = useParams();
  const { fetchJSON, working } = useFetch();
  useEffect(() => {
    const getData = async () => {
      const req: Config = {
        url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
      };
      const data = await fetchJSON<CoinType>(req);
      setCoin(data);
    };
    getData();
  }, [coinId]);

  return (
    <div className="flex">
      {coin && (
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row">
            <CoinProfileCard coin={coin} />
            <CoinComments coin={coin} />
          </div>
          <Chart coin={coin} />
          <CoinCharts coin={coin} />
        </div>
      )}
      {working && (
        <div>
          <PropagateLoader
            size={12}
            color={"#0004"}
            cssOverride={{
              display: "block",
              textAlign: "center",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CoinProfile;
