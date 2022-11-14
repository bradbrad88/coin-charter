import { Link } from "react-router-dom";
import Container from "src/components/common/Container";
import VoteWidget from "src/components/common/VoteWidget";

interface Proptypes {
  chart: Chart;
}

const MainChart = ({ chart }: Proptypes) => {
  if (!chart) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="md:h-[600px] w-full md:w-4/6 flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">
              Chart for:{" "}
              <Link
                to={`/coin/${chart.coinId}`}
                className="hover:text-indigo-600"
              >
                <span className="text-indigo-600 hover:cursor-pointer leading-none">
                  {chart.coinName}
                </span>
              </Link>
            </h1>
            <h1 className="text-lg font-bold">
              Created by:{" "}
              <Link to={`/profile/${chart.userId}`}>
                <span className="text-indigo-600 hover:cursor-pointer">
                  {chart.username}
                </span>
              </Link>
            </h1>
            <h1 className="text-sm text-gray-500">Posted: {chart.createdAt}</h1>
            <div className="flex gap-5 pl-2">
              <VoteWidget
                handleUpVote={(vote) => {}}
                handleDownVote={(vote) => {}}
                downVote={true}
                upVote={true}
                downVoteCount={1}
                upVoteCount={2}
              />
            </div>
          </div>
          <p className="text-lg font-bold text-indigo-600">
            {chart.chartTitle}
          </p>
          <p className="text-sm max-h-16 overflow-y-scroll">
            {chart.chartDescription}
          </p>
        </div>

        <img className=" h-3/6 md:h-4/6" src={chart.imageThumbnail} />
      </div>
    </Container>
  );
};

export default MainChart;
