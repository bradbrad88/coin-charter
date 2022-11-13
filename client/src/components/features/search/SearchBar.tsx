import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import UserSearch from "./UserSearch";
import CoinSearch from "./CoinSearch";

const DEBOUNCE = 700;

interface Proptypes {
  closeSidebar: () => void;
}

const SearchBar = ({ closeSidebar }: Proptypes) => {
  // Current text in search bar
  const [query, setQuery] = useState("");
  // Debounced query text
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // Timeout for debouncing
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Handle debouncing in searchbar input
  useEffect(() => {
    let immediate = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!query) immediate = true;
    timeoutRef.current = setTimeout(
      () => {
        setDebouncedQuery(query);
      },
      immediate ? 0 : DEBOUNCE,
    );
  }, [query]);

  // If user clicks away from the search bar, close it
  useEffect(() => {
    window.addEventListener("pointerdown", clearSearch);
    return () => window.removeEventListener("pointerdown", clearSearch);
  }, []);

  function clearSearch() {
    setQuery("");
    setDebouncedQuery("");
  }

  const handleSearchSelection = () => {
    clearSearch();
    closeSidebar();
  };

  return (
    <div
      className="relative w-full z-50"
      onPointerDown={(e) => e.stopPropagation()}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        spellCheck={false}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search..."
        className="rounded-full py-1 px-5 w-full bg-gray-100 outline-none focus-visible:border-primary border-[1px]"
      />
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2"
        onClick={clearSearch}
      >
        <AiOutlineClose
          className={`${
            query ? "text-primary cursor-pointer" : "text-gray-300"
          } transition-all`}
        />
      </div>
      {debouncedQuery && (
        <div className="absolute block mt-2 top-full w-full left-0 max-h-[60vh] h-fit border-[1px] border-gray-200 bg-white rounded-md z-50 overflow-auto">
          <UserSearch
            query={debouncedQuery}
            onUserSelect={handleSearchSelection}
          />

          <CoinSearch
            query={debouncedQuery}
            onCoinSelect={handleSearchSelection}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
