import { useQuery } from "@apollo/client";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import userUserContext from "contexts/UserContext";
import { USER_CHARTS } from "src/graphql/queries";
import { Link } from "react-router-dom";

interface Query {
  userCharts: Chart[];
}

const Charts = () => {
  const { user } = userUserContext();
  const { data } = useQuery<Query>(USER_CHARTS, {
    variables: { userId: user?._id },
  });

  const charts = data?.userCharts || [];

  const renderCharts = () =>
    charts.map((chart) => <ChartItem key={chart._id} chart={chart} />);

  return (
    <div>
      <ul className="flex flex-col gap-3">{renderCharts()}</ul>
    </div>
  );
};

const ChartItem = ({ chart }: { chart: Chart }) => {
  return (
    <li className="bg-white hover:bg-indigo-200 rounded-sm duration-200 transition-all hover:translate-x-1">
      <Link to={`/chart/${chart._id}`} className="">
        <div className="flex p-2">
          <div>
            <h2 className="font-bold">
              {chart.symbol.toUpperCase()} - {chart.chartTitle}
            </h2>
            <h3 className="text-primary">
              <time className="" dateTime={chart.createdAt}>
                {chart.createdAt}
              </time>
            </h3>
            <div className="flex gap-3">
              <div className="flex items-center">
                <AiOutlineArrowUp color="green" />
                {chart.upVoteCount}
              </div>
              <div className="flex items-center">
                <AiOutlineArrowDown color="red" />
                {chart.downVoteCount}
              </div>
            </div>
          </div>
          <div className="w-48 ml-auto">
            <img className="w-full h-full" src={chart.imageSmall} alt="chart" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Charts;
