import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "contexts/UserContext";
import ProfileCard from "features/profile/ProfileCard";
import Favorites from "features/profile/Favorites";

const Profile = () => {
  const { user, isLoggedIn } = useUserContext();
  const nav = useNavigate();

  // If the user is not logged in then navigate to main page
  useEffect(() => {
    if (!isLoggedIn) nav("/");
  }, [isLoggedIn]);

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:p-5 gap-5 max-w-screen-2xl mx-auto">
      <ProfileCard {...user} edit={true} />
      <Favorites />
    </div>
  );
};

export default Profile;
