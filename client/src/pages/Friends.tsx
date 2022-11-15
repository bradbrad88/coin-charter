import { useQuery } from "@apollo/client";
import { GET_FRIENDS } from "src/graphql/queries";
import FriendsList from "../components/features/friends/FriendsList";
import FriendsActivity from "src/components/features/friends/FriendsActivity";

const Friends = () => {
  const { data } = useQuery(GET_FRIENDS);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr,1fr] w-full max-w-screen-xl mx-auto">
      {data && <FriendsList friends={data.friends} />}
      {data && <FriendsActivity />}
    </div>
  );
};

export default Friends;
