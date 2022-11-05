const MainChart = () => {
  return (
    <>
      <div className="border-2 border-black border-solid w-4/6 flex flex-col">
        <div className="flex justify-between items-center px-2">
          <h1 className="text-lg font-bold">Chart for: Binance</h1>
          <h1 className="text-lg font-bold">Created by: Ben Smerd</h1>
          <h1 className="text-sm text-gray-500">Posted: 02/11/2021</h1>
        </div>

        <div className="border-solid border-2 border-black h-full"></div>
      </div>
      <div className="border-2 border-solid border-black w-2/6">
        <h1 className="text-lg font-bold">Comments</h1>
      </div>
    </>
  );
};

export default MainChart;
