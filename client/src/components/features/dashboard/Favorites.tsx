import Comments from "./favoriteCards/Comments";
import Charts from "./favoriteCards/Charts";
import Coins from "./favoriteCards/Coins";
import Tabs from "common/Tabs";
import Container from "src/components/common/Container";

const componentList = [
  { title: "Comments", component: <Comments /> },
  { title: "Charts", component: <Charts /> },
  { title: "Coins", component: <Coins /> },
];

const Favorites = () => {
  return (
    <Container>
      <div>
        <h1>Favorites</h1>
        <Tabs componentList={componentList} />
      </div>
    </Container>
  );
};

export default Favorites;
