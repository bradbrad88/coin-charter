import MainChart from "src/components/features/coinChart/MainChart";
import Comments from "src/components/features/coinChart/Comments";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CHART } from "../graphql/queries";

interface ChartId {
  chartId: string;
}

interface ChartInfoType {
  _id: string;
  coinId: string;
  coinName: string;
  symbol: string;
  chartTitle: string;
  chartDescription: string;
  username: string;
  imageThumbnail: string;
  imageMedium: string;
  imageSmall: string;
  chartComments: {
    _id: string;
    commentText: string;
    createdAt: number;
  };
  upVotes: number;
  downVotes: number;
  createdAt: number;
}

const ChartCoin = () => {
  const { chartId } = useParams();
  const [chartInfo, setChartInfo] = useState<ChartInfoType>();
  const { loading, error, data } = useQuery(QUERY_CHART, {
    variables: { chartId },
  });

  useEffect(() => {
    let chartData = data?.chart;
    if (chartData) {
      setChartInfo(chartData);
    }
  }, [data]);
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[95%] md:h-[600px]">
        <MainChart chartInfo={chartInfo} />
        <Comments chartInfo={chartInfo} />
      </div>
    </div>
  );
};

export default ChartCoin;
