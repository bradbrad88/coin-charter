import { useLazyQuery, useQuery } from "@apollo/client";
import useUserContext from "contexts/UserContext";
import { useEffect, useMemo } from "react";
import {
  GET_FRIENDS,
  SEARCH_USERS,
  SEARCH_USER_QUERY,
} from "src/graphql/queries";
import UserSearchItem from "./UserSearchItem";

interface Proptypes {
  query: string;
  onUserSelect: () => void;
}

interface FriendQuery {
  friends: {
    friend: User;
  }[];
}

interface ProfileSearchQuery {
  searchUsers: User[];
  friends: { friend: User }[];
}

export type FriendsMap = { [key: string]: true };

const UserSearch = ({ query, onUserSelect }: Proptypes) => {
  const { user } = useUserContext();
  const {
    data: searchData,
    loading,
    refetch,
  } = useQuery<ProfileSearchQuery>(SEARCH_USER_QUERY, {
    variables: { query },
  });

  const friends = searchData?.friends || [];
  const profiles = searchData?.searchUsers || [];

  useEffect(() => {
    if (!query) return;
    refetch();
  }, [query, refetch]);

  const friendsMap = useMemo(() => {
    return friends.reduce((map, { friend }) => {
      map[friend._id] = true;
      return map;
    }, {} as FriendsMap);
  }, [friends]);

  const renderProfiles = (user: User) => {
    if (loading) return <li>Loading</li>;
    const noResults = <li>No results</li>;

    const filteredResults = profiles.filter(
      (profile) => profile._id !== user._id,
    );
    return filteredResults.length < 1
      ? noResults
      : filteredResults.map((profile) => (
          <UserSearchItem
            key={profile._id}
            profile={profile}
            friendsMap={friendsMap}
            onSelectUser={onUserSelect}
          />
        ));
  };

  if (!user) return null;

  return (
    <>
      <h2 className="bg-indigo-100 font-bold p-1">Users</h2>
      <ul>{renderProfiles(user)}</ul>
    </>
  );
};

export default UserSearch;
