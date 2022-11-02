const TopCharts = () => {
  return (
    <div className="flex w-4/6 h-full">
      <div className="border-r pr-4 flex flex-col w-full h-full">
        <h1 className="text-lg font-bold">Top Rated Chart</h1>
        {/* HAVE THIS PART DYNAMIC COMPONENT FROM DATABASE*/}
        <div className="flex flex-col h-full">
          <div className="flex gap-3 items-center">
            <h1 className="font-bold text-md">Ethereum Is Going Down</h1>
            <p className="italic font-bold text-sm">By Ben Smerd</p>
            <div className="flex flex-col">
              <i className="fa-regular fa-thumbs-up text-[14px]"></i>
              <p className="text-[8px]">121230</p>
            </div>
            <div className="flex flex-col">
              <i className="fa-regular fa-thumbs-down text-[14px]"></i>
              <p className="text-[8px]">51230</p>
            </div>
          </div>
          <p>
            From my statistical analysis of the next 4 weeks combned with the
            price movement from the past 5 weeks i think that the price of
            ethereum will go down by 12% to this price point in red.
          </p>
          <img
            src="https://source.unsplash.com/random/?person/"
            className="h-[400px] w-full mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TopCharts;
