import Charts from "./favoriteCards/Charts";
import Coins from "./favoriteCards/Coins";
import Tabs from "common/Tabs";
import Container from "src/components/common/Container";
import FriendRequests from "../friends/FriendRequests";

const componentList = [
  { title: "Coins", component: <Coins /> },
  { title: "Charts", component: <Charts /> },
  { title: "Friend Requests", component: <FriendRequests /> },
];

const Favorites = () => {
  return (
    <Container>
      <Tabs componentList={componentList} />
    </Container>
  );
};

export default Favorites;
