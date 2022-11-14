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
  const [addCoinComment, { error, data }] = useMutation(ADD_COIN_COMMENT);

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
    <>
      {commentsList.length === 0 ? (
        <div className="h-4/6">
          No comments made yet, would you like to be the first? Comment below...
        </div>
      ) : (
        <ul className="flex flex-col gap-1 overflow-y-scroll h-4/6">
          {commentsList.map((info: any, index: number) => (
            <li
              key={info.username + index}
              className="border-black-50 border-solid border-2 flex gap-2 width-5/6 h-[85px]"
            >
              <div className="flex flex-col items-center w-1/6 gap-1 p-1">
                <img src={info.image} className="h-[50px] w-[50px] rounded" />
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <i className="fa-regular fa-thumbs-up text-[14px]"></i>
                    <p className="text-[8px]">{info.upVotes}</p>
                  </div>
                  <div className="flex flex-col">
                    <i className="fa-regular fa-thumbs-down text-[14px]"></i>
                    <p className="text-[8px]">{info.downVotes}</p>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col w-5/6 h-5/6">
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

      <CreateComment coinId={coinId} coinName={coinName} />
    </>
  );
};

export default Comments;
