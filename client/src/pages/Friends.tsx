import FriendsList from "../components/features/friends/FriendsList";
import FriendsActivity from "src/components/features/friends/FriendsActivity";

const Friends = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <FriendsList />
      <FriendsActivity />
    </div>
  );
};

export default Friends;
