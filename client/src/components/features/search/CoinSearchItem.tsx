import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COIN, GET_FAV_COINS, REMOVE_COIN } from "src/graphql/queries";
import useUserContext from "contexts/UserContext";
import Favourite from "common/Favourite";

import type { CoinApi } from "./CoinSearch";

interface Proptypes {
  coin: CoinApi;
  onCoinSelect: () => void;
}

interface Query {
  favCoins: FavCoin[];
}

const CoinSearch = ({ coin, onCoinSelect }: Proptypes) => {
  const { isLoggedIn } = useUserContext();
  const { data } = useQuery<Query>(GET_FAV_COINS);
  const favCoins = data?.favCoins || [];
  const [addCoin] = useMutation(ADD_COIN, {
    refetchQueries: [{ query: GET_FAV_COINS }],
  });
  const [removeCoin] = useMutation(REMOVE_COIN, {
    refetchQueries: [{ query: GET_FAV_COINS }],
  });
  const fav =
    favCoins.some((userCoin) => coin.id === userCoin.coin.coinId) || false;

  const onFavourite = async () => {
    if (fav) {
      await removeCoin({ variables: { coinId: coin.id } });
    } else {
      await addCoin({
        variables: {
          coinId: coin.id,
          coinName: coin.name,
          image: coin.thumb,
          symbol: coin.symbol,
        },
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
