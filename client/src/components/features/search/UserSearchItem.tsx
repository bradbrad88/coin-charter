import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import useUserContext from "contexts/UserContext";
import { SEND_FRIEND_REQUEST } from "src/graphql/queries";

import type { FriendsMap } from "./UserSearch";

interface Proptypes {
  profile: User;
  friendsMap: FriendsMap;
  onSelectUser?: (userId: string) => void;
}

const UserSearchItem = ({
  profile,
  friendsMap,
  onSelectUser = () => {},
}: Proptypes) => {
  const { user } = useUserContext();
  const [sendRequest, { data: friendRequestSent }] =
    useMutation(SEND_FRIEND_REQUEST);

  useEffect(() => {
    if (!friendRequestSent) return;
    toast.success("Friend request sent!");
  }, [friendRequestSent]);

  const onAddFriend: React.PointerEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) return;
    sendRequest({
      variables: {
        friendId: profile._id,
        userId: user._id,
        username: user.username,
        image: user.image,
        bio: user.bio,
        subTitle: user.subTitle,
      },
    });
  };

  const isFriend = friendsMap[profile._id];

  return (
    <li>
      <Link
        to={`/profile/${profile._id}`}
        onClick={() => {
          console.log("whyyy");
          onSelectUser(profile._id);
        }}
        className="hover:bg-indigo-100 bg-gray-100"
      >
        <div className="grid grid-cols-[min-content,_minmax(0,_1fr),_min-content] p-2 gap-2 w-full items-center">
          <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden">
            <img className="" src={profile.image} alt="" />
          </div>
          <div className="w-full">
            <div className="">{profile.username}</div>
            <div className="w-full text-primary truncate">
              {profile.subTitle}
            </div>
          </div>
          {isFriend ? (
            <div className="italic ">Friend</div>
          ) : (
            <button
              className="ml-auto shrink-0 whitespace-nowrap border-primary border-[1px] hover:bg-primary hover:text-white transition-colors p-1 px-3 rounded-sm"
              onClick={onAddFriend}
            >
              Add friend
            </button>
          )}
        </div>
      </Link>
    </li>
  );
};

export default UserSearchItem;
