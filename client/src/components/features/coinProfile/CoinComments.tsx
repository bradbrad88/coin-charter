import Comments from "./Comments";
import { CoinType } from "src/pages/CoinProfile";

interface PropTypes {
  coin: CoinType;
}
const CoinComments = ({ coin }: PropTypes) => {
  const coinId = coin.id;
  const coinName = coin.name;

  return (
    <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-4 w-[95%] lg:w-[397px] h-[500px]">
      <div className="flex gap-3 items-center">
        <h1 className="text-lg font-bold">Comments</h1>
        <i className="fa-regular fa-comments text-lg"></i>
      </div>

      <Comments coinId={coinId} coinName={coinName} />
    </div>
  );
};

export default CoinComments;
