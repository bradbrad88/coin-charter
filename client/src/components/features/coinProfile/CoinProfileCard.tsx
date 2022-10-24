const CoinProfileCard = () => {
  return (
    <div className="flex flex-col rounded-sm gap-5 shadow-lg shadow-gray-400 m-5 p-5 w-[600px] h-[400px]">
      <div className="flex items-end justify-start gap-3">
        <img
          className="w-[40px]"
          src="https://seeklogo.com/images/C/cardano-ada-logo-4B6BADDB43-seeklogo.com.png"
        />
        <h1 className="text-4xl font-bold">Cardano (ADA)</h1>
        <h2 className="text-lg font-bold">USD $0.5598</h2>
        <small>24h: 3.4% (tick)</small>
      </div>

      <div className="flex flex-col gap-8">
        <ul className="flex flex-col gap-1 border-b pt-2 pb-5">
          <li>1h: 0.4% (tick)</li>
          <li>1w: 4.4% (tick)</li>
          <li>6m: 12.4% (tick)</li>
          <li>1y: 56.4% (tick)</li>
          <li>MarketCap: $234,545,232,234</li>
          <li>24h Trading Volume: $234,654,234</li>
          <li>Circulating Supply: 45,000,000,000</li>
        </ul>
        <div className="flex gap-5 items-center">
          <button className="border rounded-sm w-40 p-2 bg-opacity-80 bg-indigo-600 hover:bg-opacity-100 text-white transition-all duration-75">
            Add To Favourites
          </button>
          <p className="text-slate-500">9000 people have liked this</p>
        </div>
      </div>
    </div>
  );
};

export default CoinProfileCard;
