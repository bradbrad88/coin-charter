const hardcode = [
  {
    name: "Ben",
    comment:
      "Great charting there, i really liked how you analysed everything so well it looks really good and i agree with everything ou said here and it hink it will happen exactly like the way you said it willthere, i really liked how you analysed everything so well it looks really good and i agree with everything ou said here and it hink it will happen exactly like the way you said it will",
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

import { useState, useEffect } from "react";
import { QUERY_CHART, ADD_CHART_COMMENT } from "src/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import Button from "src/components/common/Button";

const CreateComment = ({ chartId }: any) => {
  const [commentInput, setCommentInput] = useState<string>("");
  const [addChartComment, { error, data }] = useMutation(ADD_CHART_COMMENT);

  console.log(chartId);

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

const Comments = (chartInfo: any) => {
  const chartId = chartInfo?._id;
  const [commentsList, setCommentsList] = useState<any>();
  const { loading, error, data } = useQuery(QUERY_CHART, {
    variables: { chartId },
  });

  useEffect(() => {
    let chartData = data?.chart;
    if (chartData) {
      console.log(chartData);
    }
  }, [data]);

  console.log(chartId);
  return (
    <div className="w-full md:w-2/6 flex flex-col">
      <div className="flex gap-2">
        <h1 className="text-lg font-bold">Comments</h1>
        <i className="fa-regular fa-comments text-lg"></i>
      </div>

      <ul className="flex flex-col gap-1 overflow-y-scroll">
        {hardcode.map((info, index) => (
          <li
            key={info.name + index}
            className="border-black-50 border-solid border-2 flex gap-2 width-5/6 h-[92px]"
          >
            <div className="flex flex-col items-center w-1/6 gap-1 p-1">
              <img
                src={info.profilePic}
                className="h-[50px] w-[50px] rounded"
              />
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
              <h3 className="font-bold text-sm">{info.name}</h3>
              <p className="text-xs overflow-y-auto">{info.comment}</p>
            </div>
          </li>
        ))}
      </ul>
      <CreateComment chartId={chartId} />
    </div>
  );
};

export default Comments;
