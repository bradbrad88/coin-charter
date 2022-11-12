import { useMutation, useQuery } from "@apollo/client";
import {
  ACCEPT_FRIEND_REQUEST,
  DECLINE_FRIEND_REQEST,
  GET_FRIEND_REQUESTS,
} from "src/graphql/queries";

interface FriendRequest {
  userId: string;
  image: string;
  username: string;
  createdAt: string;
  subTitle: string;
}

interface Query {
  friendRequests: FriendRequest[];
}

const FriendRequests = () => {
  const { data, refetch } = useQuery<Query>(GET_FRIEND_REQUESTS);
  const [acceptRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  const [declineRequest] = useMutation(DECLINE_FRIEND_REQEST);
  const requests = data?.friendRequests || [];

  const handleAccept = async (friendId: string) => {
    await acceptRequest({ variables: { friendId } });
    refetch();
  };
  const handleDecline = async (friendId: string) => {
    await declineRequest({ variables: { friendId } });
    refetch();
  };

  return (
    <div className="h-full flex flex-col gap-3">
      {requests.map((friendReq) => (
        <div className="bg-white rounded-md p-2">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                className="w-full h-full text-xs"
                src={friendReq.image}
                alt="profile image"
              />
            </div>
            <div>
              <h1 className="font-semibold text-lg">{friendReq.username}</h1>
              <h2 className="leading-none text-primary">
                {friendReq.subTitle}
              </h2>
            </div>
            <div className="flex gap-3 ml-auto p-1">
              <button
                onClick={() => handleDecline(friendReq.userId)}
                className="border-[1px] border-orange-500 rounded-md hover:text-white hover:bg-orange-400 px-3 transition-colors active:bg-orange-600"
              >
                Decline
              </button>
              <button
                onClick={() => handleAccept(friendReq.userId)}
                className="border-[1px] border-lime-500 rounded-md hover:text-white hover:bg-lime-400 active:bg-lime-600 transition-colors px-3"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
