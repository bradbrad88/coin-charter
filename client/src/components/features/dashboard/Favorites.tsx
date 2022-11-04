import Comments from "./favoriteCards/Comments";
import Charts from "./favoriteCards/Charts";
import Coins from "./favoriteCards/Coins";

const Favorites = () => {
  return (
    <div className=" p-5 rounded-sm gap-5 shadow-lg shadow-gray-400">
      <div>
        <h1 className="text-center">Favorites</h1>
      </div>
      <div className="flex flex-row justify-between">
        <Comments />
        <Charts />
        <Coins />
      </div>
    </div>
  );
};

export default Favorites;
