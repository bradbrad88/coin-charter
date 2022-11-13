import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_CHART } from "../graphql/queries";
import MainChart from "src/components/features/coinChart/MainChart";
import Comments from "src/components/features/coinChart/Comments";

const ChartCoin = () => {
  const { chartId } = useParams();
  const { data, error } = useQuery<{ chart: Chart }>(QUERY_CHART, {
    variables: { chartId },
  });

  const chart = data?.chart;
  if (!chart) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[95%] md:h-[600px]">
        {chart && (
          <>
            <MainChart chart={chart} />
            <Comments chart={chart} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChartCoin;
