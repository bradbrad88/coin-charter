import { Link } from "react-router-dom";
import useUserContext from "contexts/UserContext";
import Favourite from "common/Favourite";
import type { CoinApi } from "./CoinSearch";

interface Proptypes {
  coin: CoinApi;
  onCoinSelect: () => void;
}

const CoinSearch = ({ coin, onCoinSelect }: Proptypes) => {
  const { isLoggedIn, user, addCoin, removeCoin } = useUserContext();

  const fav =
    user?.favCoins.some((userCoin) => coin.id === userCoin.coin.coinId) ||
    false;

  const onFavourite = () => {
    if (fav) {
      removeCoin(coin.id);
    } else {
      addCoin({
        coinId: coin.id,
        coinName: coin.name,
        image: coin.thumb,
        symbol: coin.symbol,
      });
    }
  };

  return (
    <Link
      to={`/coin/${coin.id}`}
      onClick={onCoinSelect}
      className="hover:bg-indigo-100 bg-gray-100"
    >
      <li>
        <div
          onClick={onCoinSelect}
          className="grid grid-cols-[min-content,_minmax(0,_1fr),_min-content] p-2 gap-2 w-full items-center"
        >
          <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden">
            <img className="" src={coin.thumb} alt="" />
          </div>
          <div className="w-full">
            <div className="">{coin.name}</div>
            <div className="w-full text-primary truncate">{coin.symbol}</div>
          </div>
          {isLoggedIn && <Favourite fav={fav} onClick={onFavourite} />}
        </div>
      </li>
    </Link>
  );
};

export default CoinSearch;
