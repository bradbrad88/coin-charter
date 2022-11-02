const OtherCharts = () => {
  const filterOptions = ["Most Recent", "Top Rated", "Least Rated", "Oldest"];
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {/* will need to add in the state for the filter choice */}
        <h1 className="text-lg font-bold">Most Recent Charts</h1>
        <select value="most recent">
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OtherCharts;
