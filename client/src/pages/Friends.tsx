import FriendsList from "../components/features/friends/FriendsList";
import FriendsActivity from "src/components/features/friends/FriendsActivity";

const Friends = () => {
  return (
    <div className="flex">
      <FriendsList />
      <FriendsActivity />
    </div>
  );
};

export default Friends;
