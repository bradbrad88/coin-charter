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
      <div className="p-5 flex flex-col gap-5">
        <div className="md:flex flex-col">
          <div className="flex justify-between">
            <div className="lg:flex lg:gap-5 gap-1 mt-auto lg:p-3">
              <h1 className="text-md font-semibold">
                Coin:{" "}
                <Link to={`/coin/${chart.coinId}`}>
                  <span className="text-indigo-600 hover:cursor-pointer hover:underline leading-none uppercase text-lg">
                    {chart.coinName}
                  </span>
                </Link>
              </h1>
              <h1 className="text-sm font-semibold">
                Created by:{" "}
                <Link to={`/profile/${chart.userId}`}>
                  <span className="text-indigo-600 hover:cursor-pointer hover:underline italic">
                    {chart.username}
                  </span>
                </Link>
              </h1>
            </div>
            <p className="lg:text-lg font-semibold text-black capitalize">
              {chart.chartTitle}
            </p>
            <div className="flex flex-col lg:flex-row lg:gap-5 lg:p-3">
              <div className="flex lg:gap-5 lg:pl-2">
                <VoteWidget
                  handleUpVote={(vote) => {}}
                  handleDownVote={(vote) => {}}
                  downVote={true}
                  upVote={true}
                  downVoteCount={1}
                  upVoteCount={2}
                />
              </div>
              <h1 className="text-sm text-gray-500 mt-auto">
                Posted: {chart.createdAt}
              </h1>
            </div>
          </div>
          <img className="h-full md:h-full" src={chart.imageThumbnail} />
        </div>
        <div>
          <p className="text-md max-h-16 truncate">
            {" "}
            <span className="font-semibold">Chart Info:</span> <br></br>
            {chart.chartDescription}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default MainChart;
