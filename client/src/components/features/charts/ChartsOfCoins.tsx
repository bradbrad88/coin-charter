const coinOption = ["Top Rated", "Most Recent", "Oldest", "Least Rated"];

const ChartsOfCoins = () => {
  return (
    <div className="flex">
      <form>
        <h1 className="font-bold">
          View Charts For: <span className="italic">Bitcoin</span>
        </h1>
        <input
          type="text"
          value="Search Coin"
          className="border-black-50 border-2"
        />
        <select>
          {coinOption.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default ChartsOfCoins;
