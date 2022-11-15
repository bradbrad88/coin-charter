import { useMutation } from "@apollo/client";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Container from "src/components/common/Container";
import VoteWidget from "src/components/common/VoteWidget";
import { DOWNVOTE_CHART, QUERY_CHART, UPVOTE_CHART } from "src/graphql/queries";
import useUserContext from "contexts/UserContext";
interface Proptypes {
  chart: Chart;
}

const MainChart = ({ chart }: Proptypes) => {
  const { user } = useUserContext();
  const [upVoteChart] = useMutation(UPVOTE_CHART, {
    refetchQueries: [{ query: QUERY_CHART, variables: { chartId: chart._id } }],
  });
  const [downVoteChart] = useMutation(DOWNVOTE_CHART, {
    refetchQueries: [{ query: QUERY_CHART, variables: { chartId: chart._id } }],
  });

  if (!chart) {
    return <div>Loading...</div>;
  }

  const upVote = useMemo(() => {
    if (!user) return false;
    return chart.upVotes.some((vote) => vote._id === user._id);
  }, [chart.upVotes]);

  const downVote = useMemo(() => {
    if (!user) return false;
    return chart.downVotes.some((vote) => vote._id === user._id);
  }, [chart.downVotes]);

  const handleUpVote = (vote: boolean) => {
    upVoteChart({ variables: { id: chart._id, vote } });
  };
  const handleDownVote = (vote: boolean) => {
    downVoteChart({ variables: { id: chart._id, vote } });
  };

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
                  handleUpVote={handleUpVote}
                  handleDownVote={handleDownVote}
                  downVote={downVote}
                  upVote={upVote}
                  downVoteCount={chart.downVoteCount}
                  upVoteCount={chart.upVoteCount}
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
