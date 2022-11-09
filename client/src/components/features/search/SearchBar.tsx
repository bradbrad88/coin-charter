import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { AiOutlineClose } from "react-icons/ai";
import { SEARCH_USERS } from "src/graphql/queries";
import { User } from "src/contexts/UserContext";
import useFetch, { Config } from "hooks/useFetch";

const DEBOUNCE = 700;

interface Coin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface Proptypes {
  closeSidebar: () => void;
}

const SearchBar = ({ closeSidebar }: Proptypes) => {
  // Current text in search bar
  const [query, setQuery] = useState("");
  // Provide ability to hide the search results even if query data exists
  const [hideSearch, setHideSearch] = useState(false);
  // Timeout for debouncing
  const timeoutRef = useRef<NodeJS.Timeout>();
  // Query users based on query state after debounce period
  const [getSearchResults, { data: userData, loading }] =
    useLazyQuery(SEARCH_USERS);
  // State for api response when searching coins
  const [coins, setCoins] = useState<Coin[]>([]);

  const { fetchJSON } = useFetch();

  // If user data changes in graphql query, ensure hideSearch is not enabled
  useEffect(() => {
    if (userData && hideSearch) {
      setHideSearch(false);
    }
  }, [userData]);

  //
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!query) return;
    timeoutRef.current = setTimeout(async () => {
      getSearchResults({ variables: { query } });
      const params = new URLSearchParams();
      params.append("query", query);
      const req: Config = {
        url: `https://api.coingecko.com/api/v3/search?${params.toString()}`,
      };
      const coins = await fetchJSON<{ coins: Coin[] }>(req);
      if (!coins) return setCoins([]);
      setCoins(coins.coins);
    }, DEBOUNCE);
  }, [query]);

  const closeSearch = () => {
    setHideSearch(true);
    setQuery("");
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setQuery(e.target.value);
    if (!e.target.value) {
      setHideSearch(true);
      return;
    }
  };

  return (
    <div className="relative w-full z-50">
      <input
        spellCheck={false}
        value={query}
        onChange={onChange}
        type="text"
        placeholder="Search..."
        className="rounded-full py-1 px-5 w-full bg-gray-100 outline-none focus-visible:border-primary border-[1px]"
      />
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2"
        onClick={closeSearch}
      >
        <AiOutlineClose
          className={`${
            query ? "text-primary cursor-pointer" : "text-gray-300"
          } transition-all`}
        />
      </div>
      {(userData?.searchUsers.length > 0 || coins.length > 0) && !hideSearch && (
        <div className="absolute block mt-2 top-full w-full left-0 max-h-[60vh] h-fit border-[1px] border-gray-200 bg-white rounded-md z-50 overflow-auto">
          {userData?.searchUsers.length > 0 && (
            <h2 className="bg-indigo-100 font-bold p-1">Users</h2>
          )}
          {userData?.searchUsers.map((user: User) => (
            <SearchUser
              key={user._id}
              user={user}
              close={closeSearch}
              closeSidebar={closeSidebar}
            />
          ))}
          {coins.length > 0 && (
            <h2 className="bg-indigo-100 font-bold p-1">Coins</h2>
          )}
          {coins.map((coin: Coin) => (
            <SearchCoin
              key={coin.id}
              coin={coin}
              close={closeSearch}
              closeSidebar={closeSidebar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface SearchUserProptypes {
  user: User;
  close: () => void;
  closeSidebar: () => void;
}

const SearchUser = ({ user, close, closeSidebar }: SearchUserProptypes) => {
  const nav = useNavigate();

  const onSelectUser = () => {
    nav(`/profile/${user._id}`);
    close();
    closeSidebar();
  };

  const onAddFriend: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    console.log("Add friend", user._id);
  };

  return (
    <div
      onClick={onSelectUser}
      className="grid grid-cols-[min-content,_minmax(0,_1fr),_min-content] p-2 gap-2 w-full items-center bg-gray-100 hover:bg-indigo-100"
    >
      <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden">
        <img className="" src={user.image} alt="" />
      </div>
      <div className="w-full">
        <div className="">{user.username}</div>
        <div className="w-full text-primary truncate">{user.subTitle}</div>
      </div>
      <button
        className="hover:text-primary transition-colors ml-auto shrink-0 whitespace-nowrap"
        onClick={onAddFriend}
      >
        Add friend
      </button>
    </div>
  );
};

interface SearchCoinProptypes {
  coin: Coin;
  close: () => void;
  closeSidebar: () => void;
}

const SearchCoin = ({ coin, close, closeSidebar }: SearchCoinProptypes) => {
  const nav = useNavigate();
  const onCoinSelect = () => {
    nav(`/coin/${coin.id}`);
    close();
    closeSidebar();
  };

  const onAddCoin: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    console.log("Favourite coin functionality here");
  };

  return (
    <div
      onClick={onCoinSelect}
      className="grid grid-cols-[min-content,_minmax(0,_1fr),_min-content] p-2 gap-2 w-full items-center bg-gray-100 hover:bg-indigo-100"
    >
      <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden">
        <img className="" src={coin.thumb} alt="" />
      </div>
      <div className="w-full">
        <div className="">{coin.name}</div>
        <div className="w-full text-primary truncate">{coin.symbol}</div>
      </div>
      <button
        className="hover:text-primary transition-colors ml-auto shrink-0 whitespace-nowrap"
        onClick={onAddCoin}
      >
        Fav Coin
      </button>
    </div>
  );
};

export default SearchBar;