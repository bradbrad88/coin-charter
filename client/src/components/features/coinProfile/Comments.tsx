import Button from "src/components/common/Button";
import { useState, useEffect } from "react";
import { ADD_COIN_COMMENT, QUERY_COIN_COMMENTS } from "src/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

interface CoinInfo {
  coinName: string;
  coinId: string;
}

const CreateComment = ({ coinName, coinId }: CoinInfo) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [addCoinComment, { error }] = useMutation(ADD_COIN_COMMENT, {
    refetchQueries: [{ query: QUERY_COIN_COMMENTS, variables: { coinId } }],
  });

  const submitComment = () => {
    const variables = {
      commentText: commentInput,
      coinId,
      coinName,
    };
    addCoinComment({ variables });
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Add Comment</h1>
      <form className="flex flex-col gap-2">
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

const Comments = ({ coinName, coinId }: CoinInfo) => {
  const [commentsList, setCommentsList] = useState<any>([]);
  const { loading, error, data } = useQuery(QUERY_COIN_COMMENTS, {
    variables: { coinId },
  });

  useEffect(() => {
    let commentsData = data?.coinComments;
    if (commentsData) {
      setCommentsList(commentsData);
    }
  }, [data]);

  if (error) {
    console.log(error);
  }

  if (!commentsList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <CreateComment coinId={coinId} coinName={coinName} />
      {commentsList.length === 0 ? (
        <div className="">
          No comments made yet, would you like to be the first? Comment below...
        </div>
      ) : (
        <ul className="flex flex-col gap-1 overflow-y-scroll border-gray-500 border-[1px] p-2">
          {commentsList.map((info: any, index: number) => (
            <li
              key={info.username + index}
              className=" flex gap-2 width-full h-fit bg-gray-200 rounded-md p-2"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-white">
                <img src={info.image} className="h-full w-full" />
              </div>
              <div className=" flex flex-col">
                <div className="flex gap-2 items-center">
                  <Link to={`/profile/${info.userId}`}>
                    <span className="font-bold text-sm text-indigo-600">
                      {info.username}
                    </span>
                  </Link>
                  <p className="text-gray-500 text-xs">{info.createdAt}</p>
                </div>

                <p className="text-xs overflow-y-auto">{info.commentText}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
