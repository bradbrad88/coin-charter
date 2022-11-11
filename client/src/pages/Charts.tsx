import MostRecent from "../components/features/charts/MostRecent";
import ChartsOfCoins from "../components/features/charts/ChartsOfCoins";

const Charts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 md:p-5 gap-5 max-w-screen-2xl mx-auto">
      <div className="space-y-5">
        <MostRecent />
      </div>
      <div className="">
        <ChartsOfCoins />
      </div>
    </div>
  );
};

export default Charts;
