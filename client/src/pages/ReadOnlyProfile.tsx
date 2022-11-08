import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserContext from "contexts/UserContext";
import ProfileCard from "features/profile/ProfileCard";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "src/graphql/queries";

const Profile = () => {
  const { user, isLoggedIn } = useUserContext();
  const nav = useNavigate();
  const { profileId } = useParams();
  const { data } = useQuery(QUERY_USER, {
    variables: { id: profileId },
  });

  // If the user is not logged in then navigate to main page
  useEffect(() => {
    if (!isLoggedIn) nav("/");
  }, [isLoggedIn]);

  if (!data || !user) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:p-5 gap-5 max-w-screen-2xl mx-auto">
      <ProfileCard {...data.getUser} />
    </div>
  );
};

export default Profile;
