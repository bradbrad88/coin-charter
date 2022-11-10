import Comments from "./favoriteCards/Comments";
import Charts from "./favoriteCards/Charts";
import Coins from "./favoriteCards/Coins";
import Tabs from "common/Tabs";
import Container from "src/components/common/Container";

const componentList = [
  { title: "Coins", component: <Coins /> },
  { title: "Comments", component: <Comments /> },
  { title: "Charts", component: <Charts /> },
];

const Favorites = () => {
  return (
    <Container>
      <Tabs componentList={componentList} />
    </Container>
  );
};

export default Favorites;
