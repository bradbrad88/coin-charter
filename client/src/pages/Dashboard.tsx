import ProfileCard from "src/components/features/dashboard/ProfileCard";
import Favorites from "src/components/features/dashboard/Favorites";

const Dashboard = () => {
  return (
    <div className="flex">
      <ProfileCard />
      <Favorites />
    </div>
  );
};

export default Dashboard;
