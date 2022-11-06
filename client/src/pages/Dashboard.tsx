import ProfileCard from "src/components/features/dashboard/ProfileCard";
import Favorites from "src/components/features/dashboard/Favorites";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:p-5 gap-5 max-w-screen-2xl mx-auto">
      <ProfileCard />
      <Favorites />
    </div>
  );
};

export default Dashboard;
