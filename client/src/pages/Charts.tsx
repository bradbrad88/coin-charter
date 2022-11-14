import TopCharts from "../components/features/charts/TopCharts";
import ChartsOfCoins from "../components/features/charts/ChartsOfCoins";

const Charts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:p-5 gap-5 max-w-screen-2xl mx-auto max-h-screen w-screen">
      <div className="lg:col-span-2">
        <TopCharts />
      </div>

      <ChartsOfCoins />
    </div>
  );
};

export default Charts;
