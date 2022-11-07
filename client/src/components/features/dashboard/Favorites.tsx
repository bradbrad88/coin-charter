import Comments from "./favoriteCards/Comments";
import Charts from "./favoriteCards/Charts";
import Coins from "./favoriteCards/Coins";
import Tabs from "common/Tabs";

const componentList = [
  { title: "Comments", component: <Comments /> },
  { title: "Charts", component: <Charts /> },
  { title: "Coins", component: <Coins /> },
];

const Favorites = () => {
  return (
    <div>
      <h1>Favorites</h1>
      <Tabs componentList={componentList} />
    </div>
  );
};

export default Favorites;
