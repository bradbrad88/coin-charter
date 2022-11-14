import { useState, useEffect } from "react";
import { QUERY_CHART_COMMENTS, ADD_CHART_COMMENT } from "src/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import Button from "src/components/common/Button";
import { Link } from "react-router-dom";
import Container from "src/components/common/Container";
import VoteWidget from "src/components/common/VoteWidget";

interface Proptypes {
  chart: Chart;
}

const CreateComment = ({ chart }: Proptypes) => {
  const chartId = chart?._id;
  const [commentInput, setCommentInput] = useState<string>("");
  const [addChartComment, { error, data }] = useMutation(ADD_CHART_COMMENT);

  const submitComment = () => {
    const variables = {
      commentText: commentInput,
      chartId,
    };

    addChartComment({ variables });
  };

  if (error) {
    console.log(error);
  }

  return (
    <div className="p-5">
      <h1 className="text-center">Add Comment:</h1>
      <form>
        <textarea
          className="w-full text-sm border border-solid border-gray-300 rounded p-1"
          placeholder="Add text here..."
          rows={3}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></textarea>
        <Button onClick={submitComment}>Submit</Button>
      </form>
    </div>
  );
};

const Comments = ({ chart }: Proptypes) => {
  const chartId = chart?._id;
  const [commentsList, setCommentsList] = useState<any>();
  const { loading, error, data } = useQuery<{ chartComments: Chart }>(
    QUERY_CHART_COMMENTS,
    {
      variables: { chartId },
    },
  );
  useEffect(() => {
    let chartData = data?.chartComments;

    if (chartData) {
      setCommentsList(chartData);
    }
  }, [data]);

  console.log(commentsList);

  if (!commentsList) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-center">Comments</h1>
        <CreateComment chart={chart} />
        <ul>
          {commentsList.map((info: any, index: number) => (
            <li
              key={info.username + index}
              className="border-black-50 border-solid border-2 flex flex-row justify-between h-[92px] p-2"
            >
              <div className="flex">
                <div className="">
                  <img src={info.image} className="h-[50px] w-[50px] rounded" />
                  <div className="">
                    <Link to={`/profile/${info.userId}`}>
                      <span className="font-bold text-sm text-indigo-600">
                        {info.username}
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="text-xs p-5">{info.commentText}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between p-1">
                <VoteWidget
                  handleUpVote={(vote) => {}}
                  handleDownVote={(vote) => {}}
                  downVote={true}
                  upVote={true}
                  downVoteCount={1}
                  upVoteCount={2}
                />
                <p className="text-gray-500 text-xs ml-auto">
                  {info.createdAt}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Comments;
