import { CoinType } from "pages/CoinProfile";

interface PropTypes {
  coin: CoinType;
}

const CoinProfileCard = ({ coin }: PropTypes) => {
  return (
    <div className="flex flex-col rounded-sm gap-5 shadow-lg shadow-gray-400 m-5 p-5 w-[600px] h-[400px]">
      <div className="flex items-end justify-start gap-3">
        <img
          className="w-[40px]"
          src="https://seeklogo.com/images/C/cardano-ada-logo-4B6BADDB43-seeklogo.com.png"
        />
        <h1 className="text-4xl font-bold">Cardano (ADA)</h1>
        <h2 className="text-lg font-bold text-green-500">USD $0.5598</h2>
        <small className="text-green-500">
          24h: 3.4%{" "}
          <i className="fa-sharp fa-solid fa-arrow-up text-green-500"></i>
        </small>
      </div>

      <div className="flex flex-col gap-8">
        <ul className="flex flex-col gap-1 border-b pt-2 pb-5 w-[500px]">
          <li className="flex justify-between">
            1h price change:{" "}
            <span className="text-green-500">
              0.4%{" "}
              <i className="fa-sharp fa-solid fa-arrow-up text-green-500"></i>
            </span>
          </li>
          <li className="flex justify-between">
            1w price change:{" "}
            <span className="text-red-500">
              4.4%{" "}
              <i className="fa-sharp fa-solid fa-arrow-down text-red-500"></i>
            </span>
          </li>
          <li className="flex justify-between">
            6m price change:{" "}
            <span className="text-red-500">
              12.4%{" "}
              <i className="fa-sharp fa-solid fa-arrow-down text-red-500"></i>
            </span>
          </li>
          <li className="flex justify-between">
            1y price change:{" "}
            <span className="text-red-500">
              56.4%{" "}
              <i className="fa-sharp fa-solid fa-arrow-down text-red-500"></i>
            </span>
          </li>
          <li className="flex justify-between">
            Current MarketCap: <span>$234,545,232,234</span>
          </li>
          <li className="flex justify-between">
            24h Trading Volume: <span>$234,654,234</span>
          </li>
          <li className="flex justify-between">
            Circulating Supply: <span>45,000,000,000</span>
          </li>
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
