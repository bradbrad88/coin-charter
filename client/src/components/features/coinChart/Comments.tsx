import { useState, useEffect } from "react";
import { QUERY_CHART_COMMENTS, ADD_CHART_COMMENT } from "src/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import Button from "src/components/common/Button";
import { Link } from "react-router-dom";
import Container from "src/components/common/Container";
import VoteWidget from "src/components/common/VoteWidget";
import { toast } from "react-toastify";

interface Proptypes {
  chart: Chart;
}

const CreateComment = ({ chart }: Proptypes) => {
  const chartId = chart?._id;
  const [commentInput, setCommentInput] = useState<string>("");
  const [addChartComment, { error }] = useMutation(ADD_CHART_COMMENT, {
    refetchQueries: [
      { query: QUERY_CHART_COMMENTS, variables: { chartId: chart._id } },
    ],
  });

  const submitComment = async () => {
    const variables = {
      commentText: commentInput,
      chartId,
    };

    const res = await addChartComment({ variables });
    if (!res) return toast.error("Couldn't upload your comment at this time");
    toast.success("Comment added");
    setCommentInput("");
  };

  if (error) {
    console.log(error);
  }

  return (
    <form className="flex flex-col">
      <label className="block">
        Add a comment
        <textarea
          className="w-full h-full border-[1px] border-gray-500 rounded-sm"
          placeholder="Add text here..."
          rows={3}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></textarea>
      </label>
      <Button disabled={!commentInput} onClick={submitComment}>
        Submit
      </Button>
    </form>
  );
};

const Comments = ({ chart }: Proptypes) => {
  const chartId = chart?._id;
  const [commentsList, setCommentsList] = useState<any>();
  const { data } = useQuery<{ chartComments: Chart }>(QUERY_CHART_COMMENTS, {
    variables: { chartId },
  });
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
    <Container>
      <div className="flex flex-col gap-3 px-5">
        <h1 className="text-xl font-semibold text-gray-500">Comments</h1>
        <CreateComment chart={chart} />
        <Container>
          <ul className="max-h-[80vh] overflow-y-auto">
            {commentsList.map((info: any, index: number) => (
              <li
                key={info.username + index}
                className="border-black-5000 flex flex-row justify-between gap-3 p-2"
              >
                <div className="flex gap-2 p-2 w-full bg-gray-200 rounded-lg">
                  <div className="flex flex-col w-full gap-2">
                    <div className="flex justify-between">
                      <div
                        className="
                    flex gap-2"
                      >
                        <div className="shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-white">
                          <img src={info.image} className="h-full w-full" />
                        </div>
                        <div className="">
                          <Link to={`/profile/${info.userId}`}>
                            <span className="font-semibold text-indigo-600">
                              {info.username}
                            </span>
                          </Link>
                          <p className="text-gray-500 text-sm leading-none">
                            {info.createdAt}
                          </p>
                        </div>
                      </div>
                      <VoteWidget
                        handleUpVote={(vote) => {}}
                        handleDownVote={(vote) => {}}
                        downVote={true}
                        upVote={true}
                        downVoteCount={1}
                        upVoteCount={2}
                      />
                    </div>
                    <div className="bg-white p-2 rounded-md">
                      <p className="">{info.commentText}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </Container>
  );
};

export default Comments;
