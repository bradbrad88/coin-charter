import { useState, useEffect } from "react";
import { QUERY_CHART_COMMENTS, ADD_CHART_COMMENT } from "src/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import Button from "src/components/common/Button";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Add Comment</h1>
      <form>
        <textarea
          className="w-full text-sm"
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

  if (!commentsList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full md:w-2/6 flex flex-col">
      <div className="flex gap-2">
        <h1 className="text-lg font-bold">Comments</h1>
        <i className="fa-regular fa-comments text-lg"></i>
      </div>

      <ul className="flex flex-col gap-1 overflow-y-scroll">
        {commentsList.map((info: any, index: number) => (
          <li
            key={info.username + index}
            className="border-black-50 border-solid border-2 flex gap-2 width-5/6 h-[92px]"
          >
            <div className="flex flex-col items-center w-1/6 gap-1 p-1">
              <img src={info.image} className="h-[50px] w-[50px] rounded" />
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                  <p className="text-[8px]">{info.upVotes.length}</p>
                </div>
                <div className="flex flex-col">
                  <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                  <p className="text-[8px]">{info.downVotes.length}</p>
                </div>
              </div>
            </div>
            <div className=" flex flex-col w-5/6 h-5/6">
              <Link to={`/profile/${info.userId}`}>
                <span className="font-bold text-sm text-indigo-600">
                  {info.username}
                </span>
              </Link>
              <p className="text-gray-500 text-xs">{info.createdAt}</p>
              <p className="text-xs overflow-y-auto">{info.commentText}</p>
            </div>
          </li>
        ))}
      </ul>
      <CreateComment chart={chart} />
    </div>
  );
};

export default Comments;
