import CoinProfileCard from "../components/features/coinProfile/CoinProfileCard";
import CoinComments from "../components/features/coinProfile/CoinComments";

const CoinProfile = () => {
  return (
    <div className="flex">
      <CoinProfileCard />
      <CoinComments />
    </div>
  );
};

export default CoinProfile;
