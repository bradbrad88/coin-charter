import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "src/graphql/queries";
import FriendsList from "../components/features/friends/FriendsList";
import FriendsActivity from "src/components/features/friends/FriendsActivity";

const Friends = () => {
  const { data } = useQuery(GET_FRIENDS);
  return (
    <div className="flex flex-col md:flex-row">
      {data && <FriendsList friends={data.friends} />}
      {data && <FriendsActivity friends={data.friends} />}
    </div>
  );
};

export default Friends;
