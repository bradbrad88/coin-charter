import TopRated from "../components/features/charts/TopRated";
import MostRecent from "../components/features/charts/MostRecent";

const Charts = () => {
  return (
    <div className="flex rounded-sm shadow-lg shadow-gray-400 p-5 m-5 w-[1050px] h-[600px]">
      <TopRated />
      <MostRecent />
    </div>
  );
};

export default Charts;
