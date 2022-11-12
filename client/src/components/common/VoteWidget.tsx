import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

interface Proptypes {
  handleUpVote: (vote: boolean) => void;
  handleDownVote: (vote: boolean) => void;
  upVote: boolean;
  downVote: boolean;
  upVoteCount: number;
  downVoteCount: number;
}

const VoteWidget = ({
  handleDownVote,
  handleUpVote,
  upVote,
  downVote,
  upVoteCount,
  downVoteCount,
}: Proptypes) => {
  return (
    <div className="relative flex flex-row gap-3 bg-gray-200 justify-between items-center p-1 px-3 rounded-full">
      <div
        onClick={() => handleUpVote(!upVote)}
        className="flex items-center gap-1"
      >
        {upVote ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}

        <p className="min-w-[16px] text-center">{upVoteCount}</p>
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l-[1px] border-gray-400"></div>
      <div
        onClick={() => handleDownVote(!downVote)}
        className="flex items-center gap-1"
      >
        {downVote ? (
          <AiFillDislike size={20} />
        ) : (
          <AiOutlineDislike size={20} />
        )}

        <p className="min-w-[16px] text-center">{downVoteCount}</p>
      </div>
    </div>
  );
};

export default VoteWidget;
