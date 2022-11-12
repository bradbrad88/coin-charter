const hardcode = [
  {
    name: "Ben",
    comment:
      "I really enjoy this coin because it is so good and i love it so much because it is so good and so good",
    upVotes: 1290,
    downVotes: 13,
    profilePic: "https://source.unsplash.com/random/?person/",
  },
  {
    name: "Brad",
    comment: "I LOVE THIS COIN SO MUCH",
    upVotes: 390,
    downVotes: 1123,
    profilePic: "https://source.unsplash.com/random/?person/",
  },
  {
    name: "Same",
    comment: "I am in love with this and and so good",
    upVotes: 3910,
    downVotes: 1332,
    profilePic: "https://source.unsplash.com/random/?person/",
  },
  {
    name: "Jamie",
    comment:
      "I rasd love it so much sooooo much THE BESTTTeally enjoy this coin because it is so good and i love it so much because it is so good and so good",
    upVotes: 390,
    downVotes: 13,
    profilePic: "https://source.unsplash.com/random/?person/",
  },
];

import Button from "src/components/common/Button";
import { useState, useEffect } from "react";
import { ADD_COIN_COMMENT, QUERY_COIN_COMMENTS } from "src/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";

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

const Comments = ({ coinName, coinId }: CoinInfo) => {
  const [commentsList, setCommentsList] = useState<any>([]);
  const { loading, error, data } = useQuery(QUERY_COIN_COMMENTS, {
    variables: { coinId },
  });

  useEffect(() => {
    let commentsData = data?.coin?.coinComments;
    if (commentsData) {
      setCommentsList(commentsData);
    }
  }, [data]);
  console.log(commentsList);

  if (error) {
    console.log(error);
  }

  if (!commentsList) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
                <h3 className="font-bold text-sm">{info.username}</h3>
                <p className="text-gray-500 text-xs">{info.createdAt}</p>
              </div>

              <p className="text-xs overflow-y-auto">{info.commentText}</p>
            </div>
          </li>
        ))}
      </ul>
      <CreateComment coinId={coinId} coinName={coinName} />
    </>
  );
};

export default Comments;
