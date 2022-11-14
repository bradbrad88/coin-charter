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
      <div className="md:p-5 gap-5 max-h-screen w-screen">
        {chart && (
          <div>
            <MainChart chart={chart} />
            <Comments chart={chart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCoin;
