import TopRated from "../components/features/charts/TopRated";
import MostRecent from "../components/features/charts/MostRecent";
import ChartsOfCoins from "../components/features/charts/ChartsOfCoins";

const Charts = () => {
  return (
    <div className="flex">
      <div className="flex rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[1050px] h-[600px]">
        <TopRated />
        <MostRecent />
      </div>
      <div className="flex flex-col rounded-sm gap-1 shadow-lg shadow-gray-400 m-4 p-5 w-[400px] h-screen">
        <ChartsOfCoins />
      </div>
    </div>
  );
};

export default Charts;
